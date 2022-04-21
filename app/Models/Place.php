<?php

namespace App\Models;

//use App\Models\Traits\Translatable;
use Illuminate\Database\Eloquent\Model;

class Place extends Model
{
    //use Translatable;

    protected $fillable = ['name', 'site_id', 'bundle_id', 'ctr_d'];

    /*public function articles() {
        return $this->belongsToMany(Blog::class);
    }*/
}
