<?php

namespace App\Http\Controllers\Admin;

use App\Models\Site;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SitesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $sites = Site::orderBy('created_at', 'desc')->paginate(20);
        return view('admin.sites.index', compact('sites'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.sites.create');
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
        ]);
        //dd('4');
        // создает новую запись в таблице
        Site::create([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        session()->flash('info', 'Сайт добавлен');
        return redirect()->route('sites.index');
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
        $site = Site::where('id', $id)->first();
        return view('admin.sites.edit', compact('site'));
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

        session()->flash('info', 'Тег обновлен');
        return redirect()->route('sites.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $site = Site::where('id', $id)->first();

        // удаляем связи тега со статьями
        /*$connections = BlogTag::where('tag_id', $tag->id)->get();
        foreach ($connections as $connection) {
            $connection->delete();
        }*/

        // удаляем категорию
        $site->delete();

        session()->flash('info', 'Сайт удален');
        return redirect()->route('sites.index');
    }
}
