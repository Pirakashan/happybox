<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExploreNode extends Model
{
    protected $fillable = [
        'parent_id',
        'title',
        'slug',
        'description',
        'content',
        'image_path',
        'type',
        'metadata',
        'order_index',
        'rating'
    ];

    protected $casts = [
        'metadata' => 'array',
    ];

    public function parent()
    {
        return $this->belongsTo(ExploreNode::class, 'parent_id');
    }

    /**
     * Get children ordered by order_index
     */
    public function children()
    {
        return $this->hasMany(ExploreNode::class, 'parent_id')->orderBy('order_index');
    }

    /**
     * Recursive children for full tree loading (limited depth for safety)
     */
    public function allChildren()
    {
        return $this->children()->with('allChildren');
    }

    public function galleryImages()
    {
        return $this->hasMany(ExploreNodeGallery::class);
    }
}
