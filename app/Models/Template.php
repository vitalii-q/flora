<?php

namespace App\Models;

//use App\Models\Traits\Translatable;
use Illuminate\Database\Eloquent\Model;

class Template extends Model
{
    //use Translatable;

    protected $fillable = ['name', 'template', 'style'];

    /*public function articles() {
        return $this->belongsToMany(Blog::class);
    }*/
}
