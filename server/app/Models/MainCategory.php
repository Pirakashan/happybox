<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MainCategory extends Model
{
    protected $fillable = ['name', 'slug', 'description', 'image_path'];

    public function subCategories()
    {
        return $this->hasMany(SubCategory::class);
    }
}
