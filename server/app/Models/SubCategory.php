<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubCategory extends Model
{
    protected $fillable = ['main_category_id', 'name', 'slug', 'description', 'image_path'];

    public function mainCategory()
    {
        return $this->belongsTo(MainCategory::class);
    }

    public function gallery()
    {
        return $this->hasMany(Gallery::class);
    }
}
