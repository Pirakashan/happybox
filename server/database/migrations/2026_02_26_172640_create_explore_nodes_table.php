<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('explore_nodes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('parent_id')->nullable()->constrained('explore_nodes')->onDelete('cascade');
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->longText('content')->nullable(); // For detailed rich text
            $table->string('image_path')->nullable();
            $table->string('type')->default('item'); // e.g., 'root', 'group', 'category', 'service'
            $table->json('metadata')->nullable(); // For WA number, etc.
            $table->integer('order_index')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('explore_nodes');
    }
};
