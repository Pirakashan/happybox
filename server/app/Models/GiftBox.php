<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GiftBox extends Model
{
    protected $fillable = [
        'event_category_id',
        'name',
        'description',
        'price',
        'image_path',
        'is_featured',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'price' => 'double',
    ];

    public function eventCategory()
    {
        return $this->belongsTo(EventCategory::class);
    }
}
