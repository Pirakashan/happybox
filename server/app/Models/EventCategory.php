<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EventCategory extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'image_path',
    ];

    public function giftBoxes()
    {
        return $this->hasMany(GiftBox::class);
    }
}
