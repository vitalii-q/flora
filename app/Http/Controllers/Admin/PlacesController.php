<?php

namespace App\Http\Controllers\Admin;

use App\Models\Place;
use App\Models\Site;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PlacesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $places = Place::orderBy('created_at', 'desc')->paginate(20);
        return view('admin.places.index', compact('places'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $sites = Site::all();

        return view('admin.places.create', compact('sites'));
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
            'site_id' => 'numeric|nullable',
            'bundle_id' => 'numeric|nullable'
        ]);
        //dd($request->ctr_d);

        // создает новую запись в таблице
        Place::create([
            'name' => $request->name,
            'site_id' => $request->site_id,
            'bundle_id' => $request->bundle_id,
            'ctr_d' => $request->ctr_d,
        ]);

        session()->flash('info', 'Рекламное место добавлено');
        return redirect()->route('places.index');
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
        $place = Place::where('id', $id)->first();

        // удаляем категорию
        $place->delete();

        session()->flash('info', 'Рекламное место удалено');
        return redirect()->route('places.index');
    }
}
