<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TaskController;
use Illuminate\Support\Facades\Route;

// 1. Route Publik (Bisa diakses tanpa login)
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// 2. Route Terproteksi (Harus login/pakai token)
Route::middleware('auth:sanctum')->group(function () {

    // Manajemen Task
    Route::get('/tasks', [TaskController::class, 'index']);
    Route::post('/tasks', [TaskController::class, 'store']);
    Route::delete('/tasks/{id}', [TaskController::class, 'destroy']);
    Route::put('/tasks/{id}', [TaskController::class, 'update']);
    // Logout
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::middleware('auth:sanctum')->group(function () {
    Route::put('/profile', [AuthController::class, 'updateProfile']);

    Route::put('/notification',[AuthController::class,'updateNotification']);

});

});
