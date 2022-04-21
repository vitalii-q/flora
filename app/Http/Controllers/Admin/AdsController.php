<?php

namespace App\Http\Controllers\Admin;

use App\Models\Ad;
use App\Models\Advert;
use App\Models\Attribute;
use App\Models\AttributeProduct;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Image;
use App\Models\Place;
use App\Models\Site;
use App\Models\Sku;
use App\Models\Target;
use App\Models\Teaser;
use App\Models\Template;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class AdsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $ads = Ad::orderBy('created_at', 'desc')->paginate(20);

        return view('admin.ads.index', compact('ads'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $ads = Ad::all();

        $campaigns = [];
        $teasers = Teaser::all();
        $templates = Template::all();
        $sites = Site::all();
        $places = Place::all();
        $targets = Target::all();

        return view('admin.ads.create', compact('ads', 'campaigns','teasers','templates','sites','places', 'targets'));
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
            'cpm' => 'required',
        ]);

        // создает новую запись в таблице
        $ad = Ad::create([
            'campaign_id' => $request->campaign_id,
            'teaser_id' => $request->teaser_id,
            'template_id' => $request->template_id,
            'site_id' => $request->site_id,
            'place_id' => $request->place_id,
            'target_id' => $request->target_id,
            'cpm' => $request->cpm
        ]);

        session()->flash('info', 'Реклама добавлена');
        return redirect()->route('ads.index');
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
        $categories = Category::get();
        $brands = Brand::get();
        $product = Product::where('id', $id)->first();
        $attributes = Attribute::get();
        return view('admin.catalog.products.edit', compact('categories','brands', 'product', 'attributes'));
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
            'price' => 'required',
            'category_id' => 'required',
            'code' => 'required|unique:blog,id,'.$request->id,
        ]);

        // элемент который обновляем
        $product = Product::where('id', $id)->first();

        // (если убрали или загрузили новое) удаляем старое изображение
        if($request->delete_image === 'yes' or isset($request->image)) {
            $imagePathExp = explode('/', $product->image_1);
            $image = end($imagePathExp); // получаем название изображения
            Storage::disk('public')->delete('files/catalog/'.$image);

            $product->update([ // удаляем путь к файлу в бд или записываем новый путь к изображению
                'image_1' => $request->image ? 'storage/files/catalog/'.$request->image->getClientOriginalName() : null,
            ]);
        }

        // кладем файл в файловую систему
        if(isset($request->image)) {
            Storage::disk('public')->put('files/catalog/'.$request->image->getClientOriginalName(), file_get_contents($request->image));
        }

        // обновляем элемент
        $product->update([
            'name' => $request->name,
            'name_en' => $request->name_en,
            'price' => $request->price,
            'description' => $request->description,
            'description_en' => $request->description_en,
            'description_bottom' => $request->description_bottom,
            'description_bottom_en' => $request->description_bottom_en,
            'information' => $request->information,
            'information_en' => $request->information_en,

            'code' => $request->code,
            'category_id' => $request->category_id,
            'brand_id' => $request->brand_id,

            'new' => $request->new ? 1 : 0,
            'sale' => $request->sale ? 1 : 0,
            'bestseller' => $request->bestseller ? 1 : 0,
        ]);

        $product->attributes()->sync($request->attr); // синхронизируем продукт с аттрибутами

        session()->flash('info', 'Продукт обновлен');
        return redirect()->route('admin.catalog.products.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $ad = Ad::where('id', $id)->first();

        // удаляем изображение
        $ad->delete();

        session()->flash('info', 'Реклама удалена');
        return redirect()->route('ads.index');
    }

    public function ajax_template(Request $request) {
        $template = Template::where('id', $request->templateId)->first();
        $teaser = Teaser::where('id', $request->teaserId)->first();

        return response(view('ajax.ad_ajax_template', compact('template', 'teaser')));
    }

}
