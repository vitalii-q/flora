@extends('admin.layouts.admin_hf')

@section('title', 'Создание рекламного места')

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
                <a class="breadcrumb-item" href="{{ route('places.index') }}">Рекламные места</a>
                <span class="breadcrumb-item active">Создание</span>
            </nav>

            <div class="row">
                <div class="col-md-12">
                    <!-- Default Elements -->
                    <div class="block">
                        <div class="block-header block-header-default">
                            <h3 class="block-title">Создание рекламного места</h3>
                            <div class="block-options">
                                <button type="button" class="btn-block-option">
                                    <i class="si si-wrench"></i>
                                </button>
                            </div>
                        </div>

                        <div class="block-content">
                            <form action="{{ route('places.store') }}" method="post" enctype="multipart/form-data">
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

                                        <label for="ctr_d">Ctr</label>
                                        <div class="mb-16">
                                            <input type="number" class="form-control" id="ctr_d" name="ctr_d" step=".01" placeholder="Ctr..">
                                        </div>
                                        @error('ctr_d')
                                        <div class="alert alert-danger">{{ $message }}</div>
                                        @enderror
                                    </div>

                                    <div class="form-group col-md-6">
                                        <div class="form-group row">
                                            <label class="col-12" for="site_id">Сайт</label>
                                            <div class="col-md-12">
                                                <select class="form-control" id="site_id" name="site_id">
                                                    <option value="0">Выберите сайт</option>
                                                    @php($y=1) @foreach($sites as $site)
                                                        <option value="{{ $site->id }}">{{ $site->name }}</option>
                                                        @php($y++) @endforeach
                                                </select>
                                            </div>
                                        </div>
                                        @error('site_id')
                                        <div class="alert alert-danger">{{ $message }}</div>
                                        @enderror

                                        <label for="bundle_id">Id bundle</label>
                                        <div class="mb-16">
                                            <input type="number" class="form-control" id="bundle_id" name="bundle_id" placeholder="Id bundle..">
                                        </div>
                                        @error('bundle_id')
                                        <div class="alert alert-danger">{{ $message }}</div>
                                        @enderror
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
