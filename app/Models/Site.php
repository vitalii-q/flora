<?php

namespace App\Models;

//use App\Models\Traits\Translatable;
use Illuminate\Database\Eloquent\Model;

class Site extends Model
{
    //use Translatable;

    protected $fillable = ['name', 'description'];

    /*public function articles() {
        return $this->belongsToMany(Blog::class);
    }*/
}
