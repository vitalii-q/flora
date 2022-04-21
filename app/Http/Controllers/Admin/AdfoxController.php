<?php

namespace App\Http\Controllers\Admin;

use App\Models\Ad;
use App\Models\Adfox;
use App\Models\Place;
use App\Models\Site;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AdfoxController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $adfoxes = Adfox::orderBy('created_at', 'desc')->paginate(20);
        return view('admin.adfox.index', compact('adfoxes'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.adfox.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([ // валидация
            'name' => 'required',
            'targeting_profile_id' => 'numeric|nullable',
            'bundle_id' => 'numeric|nullable'
        ]);
        //dd($request->ctr_d);
        //'name', 'creative', 'url', 'targeting_profile_id', 'bundle_id', 'cpm'

        // создает новую запись в таблице
        Adfox::create([
            'name' => $request->name,
            'site_id' => $request->site_id,
            'bundle_id' => $request->bundle_id,
            'ctr_d' => $request->ctr_d,
        ]);

        session()->flash('info', 'Adfox добавлено');
        return redirect()->route('adfox.index');
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
        $place = Place::where('id', $id)->first();
        return view('admin.places.edit', compact('place'));
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
        $place = Place::where('id', $id)->first();

        // обновляем элемент в таблице blog_category
        $place->update([
            'name' => $request->name,
            'name_en' => $request->name_en,
            'code' => $request->code,
        ]);

        session()->flash('info', 'Рекламная компания обновлена');
        return redirect()->route('admin.places.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $place = Adfox::where('id', $id)->first();

        // удаляем категорию
        $place->delete();

        session()->flash('info', 'Adfox удален');
        return redirect()->route('adfox.index');
    }
}
