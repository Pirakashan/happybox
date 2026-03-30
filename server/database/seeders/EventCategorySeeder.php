<?php

namespace Database\Seeders;

use App\Models\EventCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class EventCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Birthday',
            'Wedding',
            'Valentine\'s Day',
            'Graduation',
            'Anniversary',
            'Mother\'s Day',
            'Father\'s Day',
        ];

        foreach ($categories as $category) {
            EventCategory::create([
                'name' => $category,
                'slug' => Str::slug($category),
                'description' => "Explore our beautiful range of {$category} gifts.",
            ]);
        }
    }
}
