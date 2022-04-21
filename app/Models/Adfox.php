<?php

namespace App\Models;

//use App\Models\Traits\Translatable;
use Illuminate\Database\Eloquent\Model;

class Adfox extends Model
{
    //use Translatable;

    protected $fillable = ['name', 'creative', 'url', 'targeting_profile_id', 'bundle_id', 'cpm'];

    /*public function articles() {
        return $this->belongsToMany(Blog::class);
    }*/
}
