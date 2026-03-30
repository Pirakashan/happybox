<?php

namespace App\Http\Controllers;

use App\Models\EventCategory;
use Illuminate\Http\Request;

class EventCategoryController extends Controller
{
    public function index()
    {
        return response()->json(EventCategory::withCount('giftBoxes')->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:event_categories,name',
        ]);

        $category = EventCategory::create([
            'name' => $request->name,
        ]);

        return response()->json($category, 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:event_categories,name,' . $id,
        ]);

        $category = EventCategory::findOrFail($id);
        $category->update(['name' => $request->name]);

        return response()->json($category);
    }

    public function destroy($id)
    {
        $category = EventCategory::findOrFail($id);
        
        // Prevent deletion if it has gifts (optional but safer)
        if ($category->giftBoxes()->count() > 0) {
            return response()->json([
                'message' => 'Cannot delete category that has gift items. Please move or delete the gifts first.'
            ], 422);
        }

        $category->delete();
        return response()->json(['message' => 'Category deleted successfully']);
    }
}
