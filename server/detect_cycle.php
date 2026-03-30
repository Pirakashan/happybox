<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\ExploreNode;

function checkCycle($node, &$visited) {
    if (in_array($node->id, $visited)) {
        return true; // Cycle detected
    }
    $visited[] = $node->id;
    if ($node->parent_id) {
        $parent = ExploreNode::find($node->parent_id);
        if ($parent) {
            return checkCycle($parent, $visited);
        }
    }
    return false;
}

try {
    $nodes = ExploreNode::all();
    echo "Total nodes: " . $nodes->count() . "\n";
    foreach ($nodes as $node) {
        $visited = [];
        if (checkCycle($node, $visited)) {
            echo "CYCLE DETECTED for node ID: " . $node->id . " (Title: " . $node->title . ")\n";
            echo "Path: " . implode(" -> ", $visited) . "\n";
        }
    }
    echo "Check complete.\n";
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
