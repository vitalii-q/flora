@extends('admin.layouts.admin_hf')

@section('title', 'Создание шаблона')

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
                <a class="breadcrumb-item" href="{{ route('templates.index') }}">Шаблоны</a>
                <span class="breadcrumb-item active">Создание</span>
            </nav>

            <div class="row">
                <div class="col-md-12">
                    <!-- Default Elements -->
                    <div class="block">
                        <div class="block-header block-header-default">
                            <h3 class="block-title">Создание шаблона</h3>
                            <div class="block-options">
                                <button type="button" class="btn-block-option">
                                    <i class="si si-wrench"></i>
                                </button>
                            </div>
                        </div>

                        <div class="block-content">
                            <form action="{{ route('templates.store') }}" method="post" enctype="multipart/form-data">
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
                                    </div>

                                    <div class="form-group col-md-6">

                                    </div>

                                    <div class="form-group col-md-12">
                                        <!-- Summernote (.js-summernote + .js-summernote-air classes are initialized in Helpers.summernote()) -->
                                        <!-- For more info and examples you can check out http://summernote.org/ -->
                                        <div class="block">
                                            <div class="block-header block-header-default">
                                                <h3 class="block-title">Шаблон</h3>
                                                <div class="block-options">
                                                    <button type="button" class="btn-block-option">
                                                        <i class="si si-wrench"></i>
                                                    </button>
                                                </div>
                                            </div>

                                            <label for="text_just" hidden></label>
                                            <textarea id="text_just" name="template" style="width: 100%; min-height: 250px;"></textarea>
                                        </div>
                                        @error('template')
                                        <div class="alert alert-danger">{{ $message }}</div>
                                        @enderror
                                        <!-- END Summernote -->

                                        <!-- Summernote (.js-summernote + .js-summernote-air classes are initialized in Helpers.summernote()) -->
                                        <!-- For more info and examples you can check out http://summernote.org/ -->
                                        <div class="block">
                                            <div class="block-header block-header-default">
                                                <h3 class="block-title">Стили</h3>
                                                <div class="block-options">
                                                    <button type="button" class="btn-block-option">
                                                        <i class="si si-wrench"></i>
                                                    </button>
                                                </div>
                                            </div>

                                            <label for="text_2_just" hidden></label>
                                            <textarea id="text_2_just" name="style" style="width: 100%; min-height: 250px;"></textarea>
                                        </div>
                                        @error('style')
                                        <div class="alert alert-danger">{{ $message }}</div>
                                        @enderror
                                    <!-- END Summernote -->
                                    </div>
                                </div>

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
