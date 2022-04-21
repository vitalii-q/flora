@extends('admin.layouts.admin_hf')

@section('title', 'Создание сайта')

@section('content')
    <!-- Main Container -->
    <main id="main-container">
        <!-- Page Content -->
        <div class="content">
            <nav class="breadcrumb bg-white push">
                <span class="breadcrumb-item active"><strong>Меню</strong></span>
                <a class="breadcrumb-item" href="{{ route('sites.index') }}">Сайты</a>
                <span class="breadcrumb-item active">Создание</span>
            </nav>

            <div class="row">
                <div class="col-md-12">
                    <!-- Default Elements -->
                    <div class="block">
                        <div class="block-header block-header-default">
                            <h3 class="block-title">Создание сайта</h3>
                            <div class="block-options">
                                <button type="button" class="btn-block-option">
                                    <i class="si si-wrench"></i>
                                </button>
                            </div>
                        </div>

                        <div class="block-content">
                            <form action="{{ route('sites.store') }}" method="post" enctype="multipart/form-data">
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
                                                <textarea id="text" name="description" style="width: 100%; min-height: 150px;"></textarea>
                                            </div>
                                            @error('text')
                                            <div class="alert alert-danger">{{ $message }}</div>
                                            @enderror
                                        <!-- END Summernote -->
                                    </div>

                                    <div class="form-group col-md-6">

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
