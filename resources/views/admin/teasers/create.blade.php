@extends('admin.layouts.admin_hf')

@section('title', 'Создание тизера')

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
                <span class="breadcrumb-item active"><strong>Меню</strong></span>
                <a class="breadcrumb-item" href="{{ route('teasers.index') }}">Тизеры</a>
                <span class="breadcrumb-item active">Создание</span>
            </nav>

            <div class="row">
                <div class="col-md-12">
                    <!-- Default Elements -->
                    <div class="block">
                        <div class="block-header block-header-default">
                            <h3 class="block-title">Создание тизера</h3>
                            <div class="block-options">
                                <button type="button" class="btn-block-option">
                                    <i class="si si-wrench"></i>
                                </button>
                            </div>
                        </div>

                        <div class="block-content">
                            <form id="teaser_store_form" action="{{ route('teasers.store') }}" method="post" enctype="multipart/form-data">
                                @csrf

                                <div class="row">
                                    <div class="form-group col-md-6">
                                        <label for="name">Название</label>
                                        <div class="mb-16">
                                            <input type="text" class="form-control" id="name" name="name" placeholder="Название..">
                                        </div>
                                        @error('name')
                                            <div class="alert alert-danger">{{ $message }}</div>
                                        @enderror

                                        <label for="url">Url</label>
                                        <div class="mb-16">
                                            <input type="text" class="form-control" id="url" name="url" placeholder="Url..">
                                        </div>
                                        @error('url')
                                        <div class="alert alert-danger">{{ $message }}</div>
                                        @enderror

                                        <label for="cost_d">Стоимость</label>
                                        <div class="mb-16">
                                            <input type="number" class="form-control" id="cost_d" name="cost_d" placeholder="Стоимость..">
                                        </div>
                                        @error('cost_d')
                                        <div class="alert alert-danger">{{ $message }}</div>
                                        @enderror

                                        <div class="form-group row">
                                            <label class="col-12" for="advert_id">Рекламодатель</label>
                                            <div class="col-md-12">
                                                <select class="form-control" id="advert_id" name="advert_id">
                                                    <option value="0">Выберите рекламодателя</option>
                                                    @php($y=1) @foreach($adverts as $advert)
                                                        <option value="{{ $advert->id }}">{{ $advert->name }}</option>
                                                        @php($y++) @endforeach
                                                </select>
                                            </div>
                                        </div>
                                        @error('advert_id')
                                        <div class="alert alert-danger">{{ $message }}</div>
                                        @enderror

                                        <label for="api_id">Id api</label>
                                        <div class="mb-16">
                                            <input type="text" class="form-control" id="api_id" name="api_id" placeholder="Id api..">
                                        </div>
                                        @error('api_id')
                                        <div class="alert alert-danger">{{ $message }}</div>
                                        @enderror
                                    </div>

                                    <div class="form-group col-md-6">
                                        <label>Изображение</label>
                                        <div class="custom-file mb-43">
                                            <!-- Populating custom file input label with the selected filename (data-toggle="custom-file-input" is initialized in Helpers.coreBootstrapCustomFileInput()) -->
                                            <input onchange="adminShowImage(this)" type="file" class="custom-file-input js-custom-file-input-enabled" id="image_show_input" name="image" data-toggle="custom-file-input" accept="image/*">
                                            <label class="custom-file-label" for="image_show_input">Выбирите изображение</label>
                                        </div>
                                        @error('image')
                                        <br>
                                        <div class="alert alert-danger">{{ $message }}</div>
                                        @enderror

                                        <div class="col-md-12 animated fadeIn">
                                            <div class="options-container">
                                                <img id="imgShowElement" class="img-fluid options-item" src="{{ URL::asset('media/photos/photo1.jpg') }}" alt="">
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

                                    <div class="form-group col-md-12">
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

                                            <label for="text_just" hidden></label>
                                            <textarea id="text_just" name="preview" style="width: 100%; min-height: 250px;"></textarea>
                                        </div>
                                        @error('preview')
                                        <div class="alert alert-danger">{{ $message }}</div>
                                        @enderror
                                    <!-- END Summernote -->
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <div class="col-sm-6 col-xl-5">
                                        <div onclick="makeAd()" class="btn btn-primary min-width-125">Добавить из тизера рекламную компанию</div>
                                    </div>
                                    <script>
                                        function makeAd() {
                                            let form = document.getElementById('teaser_store_form');
                                            form.action = '{{ route('teaser_store_and_make_ad') }}';
                                            form.submit();
                                        }
                                    </script>

                                    <div class="col-sm-6 col-xl-5">
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
