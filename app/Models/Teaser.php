<?php

namespace App\Models;

//use App\Models\Traits\Translatable;
use Illuminate\Database\Eloquent\Model;

class Teaser extends Model
{
    //use Translatable;

    protected $fillable = ['advert_id', 'name', 'preview', 'image_id', 'api_id', 'url', 'cost_d'];

    public function ads() {
        return $this->hasMany(Ad::class);
    }

    public function advert() {
        return $this->belongsTo(Advert::class);
    }

    public function image() {
        return $this->belongsTo(Image::class);
    }
}
