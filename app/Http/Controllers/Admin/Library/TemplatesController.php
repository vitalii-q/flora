<?php

namespace App\Http\Controllers\Admin\Library;

use App\Models\Template;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TemplatesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $templates = Template::orderBy('created_at', 'desc')->paginate(20);
        return view('admin.library.templates.index', compact('templates'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.library.templates.create');
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
            'name' => 'required'
        ]);

        // создает новую запись в таблице
        Template::create([
            'name' => $request->name,
            'template' => $request->template,
            'style' => $request->style
        ]);

        session()->flash('info', 'Шаблон добавлен');
        return redirect()->route('templates.index');
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
        return view('admin.library.templates.edit', compact('teaser'));
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
        return redirect()->route('admin.templates.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $template = Template::where('id', $id)->first();

        // удаляем связи тега со статьями
        /*$connections = BlogTag::where('tag_id', $tag->id)->get();
        foreach ($connections as $connection) {
            $connection->delete();
        }*/

        // удаляем категорию
        $template->delete();

        session()->flash('info', 'Шаблон удален');
        return redirect()->route('templates.index');
    }
}
