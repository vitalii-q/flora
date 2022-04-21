<?php

namespace App\Models;

//use App\Models\Traits\Translatable;
use Illuminate\Database\Eloquent\Model;

class Target extends Model
{
    //use Translatable;

    protected $fillable = ['name', 'targeting_profile_id'];

    /*public function articles() {
        return $this->belongsToMany(Blog::class);
    }*/
}
