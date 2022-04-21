@extends('admin.layouts.admin_hf')

@section('title', $tag->name)

@section('content')
    <!-- Main Container -->
    <main id="main-container">
        <!-- Page Content -->
        <div class="content">
            <nav class="breadcrumb bg-white push">
                <span class="breadcrumb-item active"><strong>Блог</strong></span>
                <a class="breadcrumb-item" href="{{ route('admin.blog.tags.index') }}">Теги</a>
                <span class="breadcrumb-item active">{{ $tag->name }}</span>
            </nav>

            <div class="row">
                <div class="col-md-12">
                    <!-- Default Elements -->
                    <div class="block">
                        <div class="block-header block-header-default">
                            <h3 class="block-title">Редактирование тега</h3>
                            <div class="block-options">
                                <button type="button" class="btn-block-option">
                                    <i class="si si-wrench"></i>
                                </button>
                            </div>
                        </div>

                        <div class="block-content">
                            <form action="{{ route('admin.blog.tags.update', $tag->id) }}" method="post" enctype="multipart/form-data">
                                @method('PUT')
                                @csrf

                                <div class="row">
                                    <div class="form-group col-md-6">
                                        <label for="name">Заголовок</label>
                                        <div class="mb-16">
                                            <input type="text" class="form-control" id="name" name="name" value="@isset($tag->name){{ $tag->name }}@endisset" placeholder="Заголовок..">
                                        </div>
                                        @error('name')
                                        <div class="alert alert-danger">{{ $message }}</div>
                                        @enderror

                                        <label for="name_en">Title</label>
                                        <div class="mb-16">
                                            <input type="text" class="form-control" id="name_en" name="name_en" value="@isset($tag->name_en){{ $tag->name_en }}@endisset" placeholder="Title..">
                                        </div>
                                        @error('name_en')
                                        <div class="alert alert-danger">{{ $message }}</div>
                                        @enderror
                                    </div>

                                    <div class="form-group col-md-6">
                                        <label for="code">Код категории</label>
                                        <div class="mb-16">
                                            <input type="code" class="form-control" id="code" name="code" value="@isset($tag->code){{ $tag->code }}@endisset" placeholder="Code..">
                                        </div>
                                        @error('code')
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