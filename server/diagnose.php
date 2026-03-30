<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

try {
    $count = \App\Models\ExploreNode::count();
    echo "ExploreNode count: " . $count . "\n";
    
    $roots = \App\Models\ExploreNode::whereNull('parent_id')->get();
    echo "Root nodes count: " . $roots->count() . "\n";
    foreach ($roots as $root) {
        echo " - " . $root->title . " (ID: " . $root->id . ")\n";
    }
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
