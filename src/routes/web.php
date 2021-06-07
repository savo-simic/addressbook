<?php

use App\Http\Controllers\AgencyController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\ProfessionController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController as APIAuthController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('register', [AuthController::class, 'index'])->middleware('guest')->name('register');
Route::get('login', [AuthController::class, 'index'])->middleware('guest')->name('login');
//Route::get('login-user', [APIAuthController::class, 'index'])->middleware('guest')->name('login-user');
Route::group(['middleware' => 'auth'], function() {
    Route::get('countries/index', [CountryController::class, 'index'])->name('countries.index');
    Route::get('cities/index', [CityController::class, 'index'])->name('cities.index');
    Route::get('agencies/index', [AgencyController::class, 'index'])->name('agencies.index');
    Route::get('contacts/index', [ContactController::class, 'index'])->name('contacts.index');
    Route::get('professions/index', [ProfessionController::class, 'index'])->name('professions.index');
});
