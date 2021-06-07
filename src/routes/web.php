<?php

use App\Http\Controllers\AgencyController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\ProfessionController;
use Illuminate\Support\Facades\Route;

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
Route::get('/countries', function () {
    return view('countries.index');
});
Route::get('/register', function () {
    return view('home');
});

Route::get('countries/index', [CountryController::class, 'index'])->name('countries.index');
Route::get('agencies/index', [AgencyController::class, 'index'])->name('agencies.index');
Route::get('contacts/index', [ContactController::class, 'index'])->name('contacts.index');
Route::get('professions/index', [ProfessionController::class, 'index'])->name('professions.index');

//Route::get('countries/create', [CountryController::class, 'create'])->name('countries.create');
//Route::get('countries/store', [CountryController::class, 'store'])->name('countries.store');

Route::get('cities/index', [CityController::class, 'index'])->name('cities.index');
Route::get('cities/create', [CityController::class, 'create'])->name('cities.create');
