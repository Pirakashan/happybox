<?php

namespace App\Http\Controllers;

use App\Models\ExploreNode;
use App\Models\ExploreNodeGallery;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ExploreUsController extends Controller
{
    /**
     * Get the 3 root sections
     */
    public function rootSections()
    {
        $nodes = ExploreNode::whereNull('parent_id')->orderBy('order_index')->get();
        return response()->json($nodes->toArray());
    }

    /**
     * Get a node with its children, gallery, and breadcrumb path
     */
    public function nodeDetails($slug)
    {
        $node = ExploreNode::with(['children.children', 'children.galleryImages', 'galleryImages'])->where('slug', $slug)->firstOrFail();

        // Build breadcrumb path
        $breadcrumbs = [];
        $current = $node;
        while ($current) {
            array_unshift($breadcrumbs, [
                'id' => $current->id,
                'title' => $current->title,
                'slug' => $current->slug,
            ]);
            $current = $current->parent;
        }

        $response = $node->toArray();
        $response['breadcrumbs'] = $breadcrumbs;

        return response()->json($response);
    }

    /**
     * Get children of a node (for admin tree drill-down)
     */
    public function getChildren($parentId)
    {
        $children = ExploreNode::where('parent_id', $parentId)->orderBy('order_index')->get();
        $parent = ExploreNode::find($parentId);

        // Build breadcrumbs for parent
        $breadcrumbs = [];
        $current = $parent;
        while ($current) {
            array_unshift($breadcrumbs, [
                'id' => $current->id,
                'title' => $current->title,
                'slug' => $current->slug,
            ]);
            $current = $current->parent;
        }

        return response()->json([
            'parent' => $parent,
            'children' => $children,
            'breadcrumbs' => $breadcrumbs,
        ]);
    }

    /**
     * Create a new node
     */
    public function storeNode(Request $request)
    {
        \Illuminate\Support\Facades\Log::info('storeNode request', $request->all());
        $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|string',
            'parent_id' => 'nullable|exists:explore_nodes,id',
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'image' => 'nullable|image|max:5120',
            'metadata' => 'nullable|json',
            'rating' => 'nullable|numeric|min:0|max:5',
        ]);

        // Prevent adding sub-items to leaf nodes
        if ($request->parent_id) {
            $parent = ExploreNode::find($request->parent_id);
            if ($parent && in_array($parent->type, ['service_item', 'gift_item', 'item', 'info_section', 'delivery_partner'])) {
                return response()->json(['message' => 'Cannot add sub-items to a leaf item (item/service/gift/partner). This is the final level.'], 422);
            }
        }

        $data = [
            'title' => $request->title,
            'slug' => Str::slug($request->title) . '-' . Str::random(5),
            'type' => $request->type,
            'parent_id' => $request->parent_id,
            'description' => $request->description,
            'content' => $request->content,
            'rating' => $request->rating,
            'metadata' => $request->metadata ? json_decode($request->metadata, true) : null,
            'order_index' => ExploreNode::where('parent_id', $request->parent_id)->count(),
        ];

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('explore', 'public');
            $data['image_path'] = '/storage/' . $path;
        }

        $node = ExploreNode::create($data);

        return response()->json($node, 201);
    }

    /**
     * Update a node
     */
    public function updateNode(Request $request, $id)
    {
        \Illuminate\Support\Facades\Log::info('updateNode request', ['id' => $id, 'data' => $request->all()]);
        $node = ExploreNode::findOrFail($id);

        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'slug' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'type' => 'sometimes|string',
            'image' => 'nullable|image|max:5120',
            'metadata' => 'nullable|json',
            'order_index' => 'nullable|integer',
            'rating' => 'nullable|numeric|min:0|max:5',
        ]);

        $data = $request->only(['title', 'slug', 'description', 'content', 'type', 'order_index', 'rating']);

        if ($request->has('metadata')) {
            $data['metadata'] = json_decode($request->metadata, true);
        }

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('explore', 'public');
            $data['image_path'] = '/storage/' . $path;
        }

        $node->update($data);

        return response()->json($node->fresh());
    }

    /**
     * Remove a metadata key from all children of a node
     */
    public function bulkMetadataCleanup(Request $request, $id)
    {
        $key = $request->key;
        $global = $request->global ?? false;

        if (!$key) {
            return response()->json(['message' => 'Key is required'], 400);
        }

        if ($global) {
            // 1. Remove the key from 'metadata' JSON in ALL nodes
            ExploreNode::whereNotNull('metadata')->get()->each(function ($node) use ($key) {
                $metadata = $node->metadata;
                
                // Remove the data key
                if (isset($metadata[$key])) {
                    unset($metadata[$key]);
                }
                
                // Also remove from column definitions if exists
                if (isset($metadata['columns']) && is_array($metadata['columns'])) {
                    $metadata['columns'] = array_values(array_filter($metadata['columns'], function($col) use ($key) {
                        return (is_array($col) ? $col['id'] : $col->id) !== $key;
                    }));
                }
                
                $node->metadata = $metadata;
                $node->save();
            });

            return response()->json(['message' => "Metadata key '{$key}' and column definition removed GLOBALLY from all nodes."]);
        } else {
            // Target only children of the specified ID
            $children = ExploreNode::where('parent_id', $id)->get();
            foreach ($children as $child) {
                if ($child->metadata && isset($child->metadata[$key])) {
                    $metadata = $child->metadata;
                    unset($metadata[$key]);
                    $child->metadata = $metadata;
                    $child->save();
                }
            }
            return response()->json(['message' => "Metadata key '{$key}' removed from all children of node ID: {$id}"]);
        }
    }

    /**
     * Sync column configuration to all sibling nodes
     */
    public function syncSiblingsColumns(Request $request, $id)
    {
        $node = ExploreNode::findOrFail($id);
        $columns = json_decode($request->columns, true);
        
        if (!$columns || !is_array($columns)) {
            return response()->json(['message' => 'Invalid columns data format'], 400);
        }

        // Apply columns to current node and all its siblings (nodes with same parent)
        $siblings = ExploreNode::where('parent_id', $node->parent_id)->get();
        
        foreach ($siblings as $sibling) {
            $metadata = $sibling->metadata ?? [];
            $metadata['columns'] = $columns;
            $sibling->metadata = $metadata;
            $sibling->save();
        }

        return response()->json(['message' => $siblings->count() . " categories synced."]);
    }

    /**
     * Delete a node (cascades to children)
     */
    public function deleteNode($id)
    {
        $node = ExploreNode::findOrFail($id);
        $node->delete();

        return response()->json(['message' => 'Node deleted successfully']);
    }

    /**
     * Upload gallery images for a node
     */
    public function uploadGallery(Request $request, $id)
    {
        $request->validate([
            'images' => 'required',
            'images.*' => 'image|max:5120',
        ]);

        $node = ExploreNode::findOrFail($id);
        $uploaded = [];

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('explore/gallery', 'public');
                $gallery = ExploreNodeGallery::create([
                    'explore_node_id' => $node->id,
                    'image_path' => '/storage/' . $path,
                ]);
                $uploaded[] = $gallery;
            }
        }

        return response()->json($uploaded, 201);
    }

    /**
     * Delete a gallery image
     */
    public function deleteGalleryImage($id)
    {
        $gallery = ExploreNodeGallery::findOrFail($id);
        $gallery->delete();

        return response()->json(['message' => 'Gallery image deleted']);
    }

    /**
     * Get all root nodes with full nested tree (for admin)
     */
    public function fullTree()
    {
        try {
            $roots = ExploreNode::whereNull('parent_id')
                ->with('allChildren')
                ->orderBy('order_index')
                ->get();

            return response()->json($roots);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Full tree loading failed: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to load full tree. This may be due to a circular reference.'], 500);
        }
    }
}
