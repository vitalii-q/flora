@extends('admin.layouts.admin_hf')

@section('title', 'Изображения')

@section('content')
    <!-- Main Container -->
    <main id="main-container">
        <!-- Page Content -->
        <div class="content">
            <nav class="breadcrumb bg-white push">
                <span class="breadcrumb-item active"><strong>Библиотека</strong></span>
                {{--<a class="breadcrumb-item" href="">Generic</a>--}}
                <span class="breadcrumb-item active">Изображения</span>
            </nav>

            @if(session()->has('info')) <!-- если уведовление или ошибка -->
                <p class="alert alert-info">{{ session()->get('info') }}</p> <!-- выводим сообщение -->
            @endif

            <!-- Image Default -->
            <h2 class="content-heading d-flex">
                Изображения
                <a href="{{ route('images.create') }}" type="button" class="btn btn-sm btn-primary ml-auto">Добавить</a>
            </h2>

            <div class="row items-push">
                @php($i = 1) @foreach($images as $image)
                    <div class="col-md-4 animated fadeIn">
                        <div class="options-container">
                            <img class="img-fluid options-item" src="{{ $image->image }}" alt="">
                            <div class="options-overlay bg-black-op-75">
                                <div class="options-overlay-content">
                                    <h3 class="h4 text-white mb-5">id: {{ $image->id }}</h3>
                                    <h4 class="h6 text-white-op mb-15">{{ $image->name }}</h4>

                                    <div class="m0-auto d-flex" style="width: 220px;">
                                        <a class="btn btn-sm btn-rounded btn-alt-primary min-width-75" href="{{ route('images.edit', $image->id) }}" style="height: 28px; margin-right: 5px;">
                                            <i class="fa fa-pencil"></i> Редактировать
                                        </a>
                                        <form onclick="clickElem('submit{{$i}}')" action="{{ route('images.destroy', $image->id) }}" method="post" class="">
                                            @csrf
                                            @method('DELETE')

                                            <input id="submit{{$i}}" type="submit" value="Delete" hidden>
                                            <label for="submit{{$i}}" class="btn btn-sm btn-rounded btn-alt-danger min-width-75" data-toggle="tooltip" title="Delete">
                                                <i class="fa fa-times"></i> Удалить
                                            </label>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    @php($i++)
                @endforeach
            </div>
            <!-- END Image Default -->

        </div>
        <!-- END Page Content -->
    </main>
    <!-- END Main Container -->
@endsection
