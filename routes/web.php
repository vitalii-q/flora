<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\AdfoxController;
use App\Http\Controllers\Admin\TeasersController;
use App\Http\Controllers\Admin\SitesController;
use App\Http\Controllers\Admin\PlacesController;
use App\Http\Controllers\Admin\AdvertsController;
use App\Http\Controllers\Admin\AdsController;
use App\Http\Controllers\Admin\TargetsController;
use App\Http\Controllers\Admin\Library\ImagesController;
use App\Http\Controllers\Admin\Library\TemplatesController;

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

// админ панель
Route::get('/', [AdminController::class, 'index'])->name('admin');

Route::resource('adfox', AdfoxController::class);

Route::resource('teasers', TeasersController::class);
Route::post('/teasers/store_and_make_ad', [TeasersController::class, 'store_and_make_ad'])->name('teaser_store_and_make_ad'); // тизеры

Route::resource('sites', SitesController::class);
Route::resource('places', PlacesController::class);
Route::resource('adverts', AdvertsController::class);
Route::resource('targets', TargetsController::class);

Route::resource('ads', AdsController::class);
Route::post('/ads/ajax_template', [AdsController::class, 'ajax_template'])->name('ad_ajax_template'); // реклама ajax

Route::group(['prefix' => 'library'], function() {
    Route::resource('templates', TemplatesController::class);
    Route::resource('images', ImagesController::class);
});


Route::group([
    'middleware' => ['admin', 'AdminPanelView'], // доступ администрации
    'namespace' => 'Admin',
    'prefix' => 'admin',
], function () {
    //Route::get('/', 'AdminController@index')->name('admin');

    //Route::resource('sites', SitesController::class, ['as' => 'admin.blog']); // сайты
});

