<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExploreNodeGallery extends Model
{
    protected $fillable = ['explore_node_id', 'image_path'];

    protected $appends = ['full_image_url'];

    /**
     * Get the full image URL for API responses
     */
    public function getFullImageUrlAttribute()
    {
        return $this->image_path ? '/storage/' . $this->image_path : null;
    }
}
