<?php

namespace App\Http\Controllers\Admin;

use App\Models\Ad;
use App\Models\Advert;
use App\Models\Image;
use App\Models\Teaser;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class TeasersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $teasers = Teaser::orderBy('created_at', 'desc')->paginate(20);
        return view('admin.teasers.index', compact('teasers'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $adverts = Advert::all();
        $images = Image::all();

        return view('admin.teasers.create', compact('adverts', 'images'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //dd($request);
        $request->validate([ // валидация
            'name' => 'required',
            //'cost_d' => 'required|numeric'
        ]);
        //dd('4');

        $existing_image = Image::where('name', $request->image->getClientOriginalName())->first();
        //dd(!isset($existing_image));

        if(!isset($existing_image->id)) {
            if (isset($request['image'])) {
                Storage::disk('public')->put('files/library/' . $request->image->getClientOriginalName(),
                    file_get_contents($request->image));
            }

            // добавляем изображение в бд
            $image = Image::create([
                'name' => $request->image ? $request->image->getClientOriginalName() : null,
                'image' => $request->image ? '/storage/files/library/' . $request->image->getClientOriginalName() : null,
                'src_webp' => $request->src_webp
            ]);
        }
        //dd($image->id);

        // создает новую запись в таблице
        Teaser::create([
            'advert_id' => $request->advert_id,
            'name' => $request->name,
            'preview' => $request->preview,
            'image_id' => $existing_image ? $existing_image->id : $image->id,
            'api_id' => $request->api_id,
            'url' => $request->url,
            'cost_d' => $request->cost_d,
        ]);

        session()->flash('info', 'Тизер добавлен');
        return redirect()->route('teasers.index');
    }

    public function store_and_make_ad(Request $request)
    {
        $request->validate([ // валидация
            'name' => 'required',
            'image' => 'required',
            'cost_d' => 'required|numeric'
        ]);

        $existing_image = Image::where('name', $request->image->getClientOriginalName())->first();

        if(!isset($existing_image->id)) {
            if (isset($request['image'])) {
                Storage::disk('public')->put('files/library/' . $request->image->getClientOriginalName(),
                    file_get_contents($request->image));
            }

            // добавляем изображение в бд
            $image = Image::create([
                'name' => $request->image ? $request->image->getClientOriginalName() : null,
                'image' => $request->image ? '/storage/files/library/' . $request->image->getClientOriginalName() : null,
                'src_webp' => $request->src_webp
            ]);
        }

        // создает новую запись в таблице
        $teaserId = Teaser::create([
            'advert_id' => $request->advert_id,
            'name' => $request->name,
            'preview' => $request->preview,
            'image_id' => $existing_image ? $existing_image->id : $image->id,
            'api_id' => $request->api_id,
            'url' => $request->url,
            'cost_d' => $request->cost_d,
        ]);

        session()->flash('info', 'Добавление рекламной компании из тизера');
        return redirect()->route('ads.create', $teaserId);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $teaser = Teaser::where('id', $id)->first();
        return view('admin.teasers.edit', compact('teaser'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([ // валидация
            'name' => 'required',
            'code' => 'required|unique:tags,id,'.$request->id,
        ]);

        // элемент который обновляем
        $tag = Tag::where('id', $id)->first();

        // обновляем элемент в таблице blog_category
        $tag->update([
            'name' => $request->name,
            'name_en' => $request->name_en,
            'code' => $request->code,
        ]);

        session()->flash('info', 'Тизер обновлен');
        return redirect()->route('admin.teasers.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $teaser = Teaser::where('id', $id)->first();

        // удаляем связи тега со статьями
        /*$connections = BlogTag::where('tag_id', $tag->id)->get();
        foreach ($connections as $connection) {
            $connection->delete();
        }*/

        // удаляем категорию
        $teaser->delete();

        session()->flash('info', 'Тизер удален');
        return redirect()->route('teasers.index');
    }
}
