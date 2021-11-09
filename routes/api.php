<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\CompanyController;
use App\Http\Controllers\API\FavoriteCompanyController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('v1')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/send-reset-email', [AuthController::class, 'sendResetEmail']);
    Route::patch('/users/pass-reset', [UserController::class, 'resetPassword']);
    
    Route::group(['middleware' => 'auth:sanctum'], function () {
        Route::patch('/users/{id}/pass', [UserController::class, 'updatePassword']);
        Route::get('/logout', [AuthController::class, 'logout']);

        Route::resource('/companies', CompanyController::class);
        Route::get('/favorite-company/my-list', [FavoriteCompanyController::class, 'myFavoriteCompanies']);
        Route::resource('/favorite-company', FavoriteCompanyController::class);

    });
});
