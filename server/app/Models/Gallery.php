<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    protected $fillable = ['sub_category_id', 'image_path'];

    public function subCategory()
    {
        return $this->belongsTo(SubCategory::class);
    }
}
