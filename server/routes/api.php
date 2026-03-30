<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ExploreUsController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\GiftBoxController;

Route::group(['prefix' => 'gifts'], function () {
    // Categories management
    Route::get('/categories', [\App\Http\Controllers\EventCategoryController::class, 'index']);
    Route::post('/categories', [\App\Http\Controllers\EventCategoryController::class, 'store']);
    Route::put('/categories/{id}', [\App\Http\Controllers\EventCategoryController::class, 'update']);
    Route::delete('/categories/{id}', [\App\Http\Controllers\EventCategoryController::class, 'destroy']);

    // Gifts CRUD
    Route::get('/', [GiftBoxController::class, 'index']);
    Route::post('/', [GiftBoxController::class, 'store']);
    Route::get('/{id}', [GiftBoxController::class, 'show']);
    Route::post('/{id}', [GiftBoxController::class, 'update']); // Use POST (form-data) for updates too
    Route::delete('/{id}', [GiftBoxController::class, 'destroy']);
});

Route::group(['prefix' => 'explore'], function () {
    // Public routes
    Route::get('/root-sections', [ExploreUsController::class, 'rootSections']);
    Route::get('/node/{slug}', [ExploreUsController::class, 'nodeDetails']);

    // Admin routes (CRUD)
    Route::get('/tree', [ExploreUsController::class, 'fullTree']);
    Route::get('/children/{parentId}', [ExploreUsController::class, 'getChildren']);
    Route::post('/nodes', [ExploreUsController::class, 'storeNode']);
    Route::post('/nodes/{id}', [ExploreUsController::class, 'updateNode']);
    Route::delete('/nodes/{id}', [ExploreUsController::class, 'deleteNode']);
    Route::post('/nodes/{id}/bulk-metadata-cleanup', [ExploreUsController::class, 'bulkMetadataCleanup']);
    Route::post('/nodes/{id}/sync-columns', [ExploreUsController::class, 'syncSiblingsColumns']);
    Route::post('/nodes/{id}/update', [ExploreUsController::class, 'updateNode']); // Alternative update route
    Route::post('/nodes/{id}/gallery', [ExploreUsController::class, 'uploadGallery']);
    Route::delete('/nodes/gallery/{id}', [ExploreUsController::class, 'deleteGalleryImage']);
});

// Auth routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});
