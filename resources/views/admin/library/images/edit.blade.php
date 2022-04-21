@extends('admin.layouts.admin_hf')

@section('title', $product->name)

@section('css')
    <link rel="stylesheet" href="{{  URL::asset('js/plugins/summernote/summernote-bs4.css') }}">
    <link rel="stylesheet" href="{{  URL::asset('js/plugins/simplemde/simplemde.min.css') }}">
@endsection

@section('js')
    <script src="{{  URL::asset('js/plugins/summernote/summernote-bs4.min.js') }}"></script>
    <script src="{{ URL::asset('js/plugins/ckeditor/ckeditor.js') }}"></script>
    <script src="{{ URL::asset('js/plugins/simplemde/simplemde.min.js') }}"></script>
    <script>jQuery(function(){ Codebase.helpers(['summernote', 'ckeditor', 'simplemde']); });</script>
@endsection

@section('content')
    <!-- Main Container -->
    <main id="main-container">
        <!-- Page Content -->
        <div class="content">
            <nav class="breadcrumb bg-white push">
                <span class="breadcrumb-item active"><strong>Каталог</strong></span>
                <a class="breadcrumb-item" href="{{ route('admin.catalog.products.index') }}">Продукция</a>
                <span class="breadcrumb-item active">{{ $product->name }}</span>
            </nav>

            <div class="row">
                <div class="col-md-12">
                    <!-- Default Elements -->
                    <div class="block">
                        <div class="block-header block-header-default">
                            <h3 class="block-title">Создание товара</h3>
                            <div class="block-options">
                                <button type="button" class="btn-block-option">
                                    <i class="si si-wrench"></i>
                                </button>
                            </div>
                        </div>

                        <div class="block-content">
                            <form action="{{ route('admin.catalog.products.update', $product->id) }}" method="post" enctype="multipart/form-data">
                                @method('PUT')
                                @csrf

                                <div class="row">
                                    <div class="form-group col-md-6">
                                        <label for="name">Заголовок</label>
                                        <div class="mb-16">
                                            <input type="text" class="form-control" id="name" name="name" value="@isset($product->name){{ $product->name }}@endisset" placeholder="Заголовок..">
                                        </div>
                                        @error('name')
                                        <div class="alert alert-danger">{{ $message }}</div>
                                        @enderror

                                        <label for="name_en">Title</label>
                                        <div class="mb-16">
                                            <input type="text" class="form-control" id="name_en" name="name_en" value="@isset($product->name_en){{ $product->name_en }}@endisset" placeholder="Title..">
                                        </div>
                                        @error('name_en')
                                        <div class="alert alert-danger">{{ $message }}</div>
                                        @enderror

                                        <label for="price">Цена</label>
                                        <div class="mb-16">
                                            <input type="number" class="form-control" id="price" name="price" value="@isset($product->price){{ $product->price }}@endisset" placeholder="Цена..">
                                        </div>
                                        @error('price')
                                        <div class="alert alert-danger">{{ $message }}</div>
                                        @enderror

                                        <div class="form-group row">
                                            <label class="col-12" for="category_id">Категория</label>
                                            <div class="col-md-12">
                                                <select class="form-control" id="category_id" name="category_id">
                                                    <option value=" ">Выбирите категорию</option>
                                                    @dump($categories)
                                                    @foreach($categories as $category)
                                                        <option value="{{ $category->id }}" @if($category->id == $product->category_id) selected @endisset>{{ $category->name }}</option>
                                                    @endforeach
                                                </select>
                                            </div>
                                        </div>
                                        @error('category_id')
                                        <div class="alert alert-danger">{{ $message }}</div>
                                        @enderror

                                        <div class="form-group row">
                                            <label class="col-12" for="brand_id">Бренд</label>
                                            <div class="col-md-12">
                                                <select class="form-control" id="brand_id" name="brand_id">
                                                    <option value="">Выбирите бренд</option>
                                                    @foreach($brands as $brand)
                                                        <option value="{{ $brand->id }}" @if($brand->id == $product->category_id) selected @endisset>{{ $brand->name }}</option>
                                                    @endforeach
                                                </select>
                                            </div>
                                        </div>
                                        @error('brand_id')
                                        <div class="alert alert-danger">{{ $message }}</div>
                                        @enderror

                                        <div class="form-group row">
                                            <label class="col-12" for="example-multiple-select">Свойства</label>
                                            <div class="col-md-12">
                                                <select class="form-control" id="attributes" name="attr[]" size="5" multiple="">
                                                    @foreach($attributes as $attribute)
                                                        <option value="{{ $attribute->id }}"
                                                                @isset($product)
                                                                    @if($product->attributes->contains($attribute->id))
                                                                    selected
                                                                    @endif
                                                                @endisset
                                                                >
                                                            {{ $attribute->name }}
                                                        </option>
                                                    @endforeach
                                                </select>
                                            </div>
                                        </div>
                                        @error('attributes')
                                        <div class="alert alert-danger">{{ $message }}</div>
                                        @enderror

                                        <div class="form-group row">
                                            <label class="col-12">Стикеры</label>
                                            <div class="col-12">
                                                <div class="custom-control custom-checkbox custom-control-inline mb-5">
                                                    <input class="custom-control-input" type="checkbox" name="new" id="new" value="1" @if($product->new == 1) checked="" @endif>
                                                    <label class="custom-control-label" for="new">Новинка</label>
                                                </div>
                                                <div class="custom-control custom-checkbox custom-control-inline mb-5">
                                                    <input class="custom-control-input" type="checkbox" name="sale" id="sale" value="1" @if($product->sale == 1) checked="" @endif>
                                                    <label class="custom-control-label" for="sale">Скидка</label>
                                                </div>
                                                <div class="custom-control custom-checkbox custom-control-inline mb-5">
                                                    <input class="custom-control-input" type="checkbox" name="bestseller" id="bestseller" value="1" @if($product->bestseller == 1) checked="" @endif>
                                                    <label class="custom-control-label" for="bestseller">Бестселлер</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group col-md-6">
                                        <label for="code">Код товара</label>
                                        <div class="mb-16">
                                            <input type="code" class="form-control" id="code" name="code" placeholder="Code.." value="@isset($product->code){{ $product->code }}@endisset">
                                        </div>
                                        @error('code')
                                        <div class="alert alert-danger">{{ $message }}</div>
                                        @enderror

                                        <label>Изображение</label>
                                        <div class="custom-file mb-43">
                                            <!-- Populating custom file input label with the selected filename (data-toggle="custom-file-input" is initialized in Helpers.coreBootstrapCustomFileInput()) -->
                                            <input id="delete_image" type="text" name="delete_image" value="no" placeholder="delete_image" hidden>
                                            <input onchange="adminShowImage(this)" type="file" class="custom-file-input js-custom-file-input-enabled" id="image_show_input" name="image" value="@isset($product->image_1){{ $product->image_1 }}@endisset" data-toggle="custom-file-input" accept="image/*">
                                            <label class="custom-file-label" for="image_show_input">Выбирите изображение</label>
                                        </div>
                                        @error('image')
                                        <br>
                                        <div class="alert alert-danger">{{ $message }}</div>
                                        @enderror

                                        <div class="col-md-12 animated fadeIn">
                                            <div class="options-container">
                                                <img id="imgShowElement" class="img-fluid options-item" src="@isset($product->image_1){{ URL::asset($product->image_1) }}@else {{ URL::asset('media/photos/photo1.jpg') }} @endisset" alt="">
                                                <div class="options-overlay bg-black-op-75">
                                                    <div class="options-overlay-content">
                                                        <h3 class="h4 text-white mb-5">Изображение</h3>
                                                        {{--<h4 class="h6 text-white-op mb-15">More Details</h4>--}}
                                                        <a onclick="adminEditImg()" class="btn btn-sm btn-rounded btn-alt-primary min-width-75">
                                                            <i class="fa fa-pencil"></i> Редактировать
                                                        </a>
                                                        <a onclick="adminDeleteImg()" class="btn btn-sm btn-rounded btn-alt-danger min-width-75">
                                                            <i class="fa fa-times"></i> Удалить
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Summernote (.js-summernote + .js-summernote-air classes are initialized in Helpers.summernote()) -->
                                <!-- For more info and examples you can check out http://summernote.org/ -->
                                <div class="block">
                                    <div class="block-header block-header-default">
                                        <h3 class="block-title">Описание</h3>
                                        <div class="block-options">
                                            <button type="button" class="btn-block-option">
                                                <i class="si si-wrench"></i>
                                            </button>
                                        </div>
                                    </div>

                                    <label for="text" hidden></label>
                                    <textarea id="text" name="description">@isset($product->description){{ $product->description }}@endisset</textarea>
                                </div>
                                @error('text')
                                <div class="alert alert-danger">{{ $message }}</div>
                                @enderror
                                <!-- END Summernote -->

                                <!-- Summernote (.js-summernote + .js-summernote-air classes are initialized in Helpers.summernote()) -->
                                <!-- For more info and examples you can check out http://summernote.org/ -->
                                <div class="block">
                                    <div class="block-header block-header-default">
                                        <h3 class="block-title">Описание En</h3>
                                        <div class="block-options">
                                            <button type="button" class="btn-block-option">
                                                <i class="si si-wrench"></i>
                                            </button>
                                        </div>
                                    </div>

                                    <label for="text_en" hidden></label>
                                    <textarea id="text_en" name="description_en">@isset($product->description_en){{ $product->description_en }}@endisset</textarea>
                                </div>
                                @error('text_en')
                                <div class="alert alert-danger">{{ $message }}</div>
                                @enderror
                                <!-- END Summernote -->

                                <!-- Summernote (.js-summernote + .js-summernote-air classes are initialized in Helpers.summernote()) -->
                                <!-- For more info and examples you can check out http://summernote.org/ -->
                                <div class="block">
                                    <div class="block-header block-header-default">
                                        <h3 class="block-title">Описание таб</h3>
                                        <div class="block-options">
                                            <button type="button" class="btn-block-option">
                                                <i class="si si-wrench"></i>
                                            </button>
                                        </div>
                                    </div>

                                    <label for="description" hidden></label>
                                    <textarea id="description" name="description_bottom">@isset($product->description_bottom){{ $product->description_bottom }}@endisset</textarea>
                                </div>
                                @error('description')
                                <div class="alert alert-danger">{{ $message }}</div>
                                @enderror
                                <!-- END Summernote -->

                                <!-- Summernote (.js-summernote + .js-summernote-air classes are initialized in Helpers.summernote()) -->
                                <!-- For more info and examples you can check out http://summernote.org/ -->
                                <div class="block">
                                    <div class="block-header block-header-default">
                                        <h3 class="block-title">Описание таб En</h3>
                                        <div class="block-options">
                                            <button type="button" class="btn-block-option">
                                                <i class="si si-wrench"></i>
                                            </button>
                                        </div>
                                    </div>

                                    <label for="description_en" hidden></label>
                                    <textarea id="description_en" name="description_bottom_en">@isset($product->description_bottom_en){{ $product->description_bottom_en }}@endisset</textarea>
                                </div>
                                @error('description_en')
                                <div class="alert alert-danger">{{ $message }}</div>
                                @enderror
                                <!-- END Summernote -->

                                <!-- Summernote (.js-summernote + .js-summernote-air classes are initialized in Helpers.summernote()) -->
                                <!-- For more info and examples you can check out http://summernote.org/ -->
                                <div class="block">
                                    <div class="block-header block-header-default">
                                        <h3 class="block-title">Информация таб</h3>
                                        <div class="block-options">
                                            <button type="button" class="btn-block-option">
                                                <i class="si si-wrench"></i>
                                            </button>
                                        </div>
                                    </div>

                                    <label for="information" hidden></label>
                                    <textarea id="information" name="information">@isset($product->information){{ $product->information }}@endisset</textarea>
                                </div>
                                @error('information')
                                <div class="alert alert-danger">{{ $message }}</div>
                                @enderror
                                <!-- END Summernote -->

                                <!-- Summernote (.js-summernote + .js-summernote-air classes are initialized in Helpers.summernote()) -->
                                <!-- For more info and examples you can check out http://summernote.org/ -->
                                <div class="block">
                                    <div class="block-header block-header-default">
                                        <h3 class="block-title">Информация таб En</h3>
                                        <div class="block-options">
                                            <button type="button" class="btn-block-option">
                                                <i class="si si-wrench"></i>
                                            </button>
                                        </div>
                                    </div>

                                    <label for="information_en" hidden></label>
                                    <textarea id="information_en" name="information_en">@isset($product->information_en){{ $product->information_en }}@endisset</textarea>
                                </div>
                                @error('information_en')
                                <div class="alert alert-danger">{{ $message }}</div>
                                @enderror
                                <!-- END Summernote -->

                                <div class="form-group row">
                                    <div class="col-sm-6 col-xl-4">
                                        <button type="submit" class="btn btn-primary min-width-125">Сохранить</button>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                    <!-- END Default Elements -->
                </div>
            </div>


        </div>
        <!-- END Page Content -->
    </main>
    <!-- END Main Container -->
@endsection