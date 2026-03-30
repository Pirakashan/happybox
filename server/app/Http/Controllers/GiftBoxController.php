<?php

namespace App\Http\Controllers;

use App\Models\GiftBox;
use App\Models\EventCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GiftBoxController extends Controller
{
    /**
     * Display a listing of the gift boxes.
     */
    public function index()
    {
        $giftBoxes = GiftBox::with('eventCategory')->orderBy('created_at', 'desc')->get();
        return response()->json($giftBoxes);
    }

    /**
     * Store a newly created gift box in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'event_category_id' => 'required|exists:event_categories,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'image' => 'nullable|image|max:10240', // 10MB max
            'is_featured' => 'nullable|boolean',
        ]);

        $data = $request->only(['event_category_id', 'name', 'description', 'price', 'is_featured']);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('gifts', 'public');
            $data['image_path'] = '/storage/' . $path;
        }

        $giftBox = GiftBox::create($data);

        return response()->json($giftBox->load('eventCategory'), 201);
    }

    /**
     * Display the specified gift box.
     */
    public function show($id)
    {
        $giftBox = GiftBox::with('eventCategory')->findOrFail($id);
        return response()->json($giftBox);
    }

    /**
     * Update the specified gift box in storage.
     */
    public function update(Request $request, $id)
    {
        $giftBox = GiftBox::findOrFail($id);

        $request->validate([
            'event_category_id' => 'sometimes|exists:event_categories,id',
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'price' => 'sometimes|numeric|min:0',
            'image' => 'nullable|image|max:10240',
            'is_featured' => 'nullable|boolean',
        ]);

        $data = $request->only(['event_category_id', 'name', 'description', 'price', 'is_featured']);

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($giftBox->image_path) {
                $oldPath = str_replace('/storage/', '', $giftBox->image_path);
                Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('image')->store('gifts', 'public');
            $data['image_path'] = '/storage/' . $path;
        }

        $giftBox->update($data);

        return response()->json($giftBox->load('eventCategory'));
    }

    /**
     * Remove the specified gift box from storage.
     */
    public function destroy($id)
    {
        $giftBox = GiftBox::findOrFail($id);

        if ($giftBox->image_path) {
            $oldPath = str_replace('/storage/', '', $giftBox->image_path);
            Storage::disk('public')->delete($oldPath);
        }

        $giftBox->delete();

        return response()->json(['message' => 'Gift box deleted successfully']);
    }
}
