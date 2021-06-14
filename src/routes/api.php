<?php

use Illuminate\Http\Request;
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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post(
    '/login-user',
    ['uses' => 'App\Http\Controllers\API\AuthController@login', 'as' => 'login-user']
);

// Api routes for Users
Route::middleware(['auth:api', 'roles:Administrator'])->get(
    '/users/index',
    ['uses' => 'App\Http\Controllers\API\UserController@index', 'as' => 'users.index']
);
Route::middleware(['auth:api', 'roles:Administrator,Contact'])->get(
    '/users/show/{id}',
    ['uses' => 'App\Http\Controllers\API\UserController@show', 'as' => 'users.show']
);
Route::middleware(['auth:api', 'roles:Administrator'])->post(
    '/users/create',
    ['uses' => 'App\Http\Controllers\API\UserController@create', 'as' => 'users.create']
);
Route::middleware(['auth:api', 'roles:Administrator,Contact'])->put(
    '/users/edit/{id}',
    ['uses' => 'App\Http\Controllers\API\UserController@update', 'as' => 'users.update']
);
Route::middleware(['auth:api', 'roles:Administrator'])->delete(
    '/users/delete/{id}',
    ['uses' => 'App\Http\Controllers\API\UserController@destroy', 'as' => 'users.delete']
);

// Api routes for countries
Route::middleware(['auth:api', 'roles:Administrator'])->get(
    '/countries/index',
    ['uses' => 'App\Http\Controllers\API\CountryController@index', 'as' => 'countries.index']
);

Route::middleware(['auth:api', 'roles:Administrator'])->get(
    '/countries/cities/{countryId}',
    ['uses' => 'App\Http\Controllers\API\CountryController@cities', 'as' => 'countries.cities']
);
Route::middleware(['auth:api', 'roles:Administrator'])->get(
    '/countries/show/{id}',
    ['uses' => 'App\Http\Controllers\API\CountryController@show', 'as' => 'countries.show']
);
Route::middleware(['auth:api', 'roles:Administrator'])->put(
    '/countries/edit/{id}',
    ['uses' => 'App\Http\Controllers\API\CountryController@update', 'as' => 'countries.update']
);
Route::middleware(['auth:api', 'roles:Administrator'])->post(
    '/countries/create',
    ['uses' => 'App\Http\Controllers\API\CountryController@create', 'as' => 'countries.create']
);
Route::middleware(['auth:api', 'roles:Administrator'])->delete(
    '/countries/delete/{id}',
    ['uses' => 'App\Http\Controllers\API\CountryController@destroy', 'as' => 'countries.delete']
);

// Api routes for cities
Route::middleware(['auth:api', 'roles:Administrator'])->get(
    '/cities/index',
    ['uses' => 'App\Http\Controllers\API\CityController@index', 'as' => 'cities.index']
);
Route::middleware(['auth:api', 'roles:Administrator'])->get(
    '/cities/show/{id}',
    ['uses' => 'App\Http\Controllers\API\CityController@show', 'as' => 'cities.show']
);
Route::middleware(['auth:api', 'roles:Administrator'])->post(
    '/cities/create',
    ['uses' => 'App\Http\Controllers\API\CityController@create', 'as' => 'cities.create']
);
Route::middleware(['auth:api', 'roles:Administrator'])->put(
    '/cities/edit/{id}',
    ['uses' => 'App\Http\Controllers\API\CityController@update', 'as' => 'cities.update']
);
Route::middleware(['auth:api', 'roles:Administrator'])->delete(
    '/cities/delete/{id}',
    ['uses' => 'App\Http\Controllers\API\CityController@destroy', 'as' => 'cities.delete']
);


// Api routes for professions
Route::middleware(['auth:api', 'roles:Administrator'])->get(
    '/professions/index',
    ['uses' => 'App\Http\Controllers\API\ProfessionController@index', 'as' => 'professions.index']
);
Route::middleware(['auth:api', 'roles:Administrator'])->get(
    '/professions/show/{id}',
    ['uses' => 'App\Http\Controllers\API\ProfessionController@show', 'as' => 'professions.show']
);
Route::middleware(['auth:api', 'roles:Administrator'])->post(
    '/professions/create',
    ['uses' => 'App\Http\Controllers\API\ProfessionController@create', 'as' => 'professions.create']
);
Route::middleware(['auth:api', 'roles:Administrator'])->put(
    '/professions/edit/{id}',
    ['uses' => 'App\Http\Controllers\API\ProfessionController@update', 'as' => 'professions.update']
);
Route::middleware(['auth:api', 'roles:Administrator'])->delete(
    '/professions/delete/{id}',
    ['uses' => 'App\Http\Controllers\API\ProfessionController@destroy', 'as' => 'professions.delete']
);

// Api routes for agencies
Route::middleware(['auth:api', 'roles:Administrator'])->get(
    '/agencies/index',
    ['uses' => 'App\Http\Controllers\API\AgencyController@index', 'as' => 'agencies.index']
);

Route::middleware(['auth:api', 'roles:Administrator'])->get(
    '/agencies/show/{id}',
    ['uses' => 'App\Http\Controllers\API\AgencyController@show', 'as' => 'agencies.show']
);
Route::middleware(['auth:api', 'roles:Administrator'])->post(
    '/agencies/create',
    ['uses' => 'App\Http\Controllers\API\AgencyController@create', 'as' => 'agencies.create']
);
Route::middleware(['auth:api', 'roles:Administrator'])->put(
    '/agencies/edit/{id}',
    ['uses' => 'App\Http\Controllers\API\AgencyController@update', 'as' => 'agencies.update']
);
Route::middleware(['auth:api', 'roles:Administrator'])->delete(
    '/agencies/delete/{id}',
    ['uses' => 'App\Http\Controllers\API\AgencyController@destroy', 'as' => 'agencies.delete']
);


// Api routes for contacts
Route::middleware(['auth:api', 'roles:Administrator'])->get(
    '/contacts/index',
    ['uses' => 'App\Http\Controllers\API\ContactController@index', 'as' => 'contacts.index']
);

Route::middleware(['auth:api', 'roles:Administrator'])->get(
    '/contacts/show/{id}',
    ['uses' => 'App\Http\Controllers\API\ContactController@show', 'as' => 'contacts.show']
);
Route::middleware(['auth:api', 'roles:Administrator'])->post(
    '/contacts/create',
    ['uses' => 'App\Http\Controllers\API\ContactController@create', 'as' => 'contacts.create']
);
Route::middleware(['auth:api', 'roles:Administrator'])->put(
    '/contacts/edit/{id}',
    ['uses' => 'App\Http\Controllers\API\ContactController@update', 'as' => 'contacts.update']
);
Route::middleware(['auth:api', 'roles:Administrator'])->get(
    '/contacts/search/{searchTerm}',
    ['uses' => 'App\Http\Controllers\API\ContactController@search', 'as' => 'contacts.search']
);
Route::middleware(['auth:api', 'roles:Administrator'])->delete(
    '/contacts/delete/{id}',
    ['uses' => 'App\Http\Controllers\API\ContactController@destroy', 'as' => 'contacts.delete']
);
