@extends('admin.layouts.admin_hf')

@section('title', 'Создание рекламодателя')

@section('content')
    <!-- Main Container -->
    <main id="main-container">
        <!-- Page Content -->
        <div class="content">
            <nav class="breadcrumb bg-white push">
                <span class="breadcrumb-item active"><strong>Меню</strong></span>
                <a class="breadcrumb-item" href="{{ route('adverts.index') }}">Рекламодатели</a>
                <span class="breadcrumb-item active">Создание</span>
            </nav>

            <div class="row">
                <div class="col-md-12">
                    <!-- Default Elements -->
                    <div class="block">
                        <div class="block-header block-header-default">
                            <h3 class="block-title">Создание рекламодателя</h3>
                            <div class="block-options">
                                <button type="button" class="btn-block-option">
                                    <i class="si si-wrench"></i>
                                </button>
                            </div>
                        </div>

                        <div class="block-content">
                            <form action="{{ route('adverts.store') }}" method="post" enctype="multipart/form-data">
                                @csrf

                                <div class="row">
                                    <div class="form-group col-md-6">
                                        <label for="name">Name</label>
                                        <div class="mb-16">
                                            <input type="text" class="form-control" id="name" name="name" placeholder="Name..">
                                        </div>
                                        @error('name')
                                        <div class="alert alert-danger">{{ $message }}</div>
                                        @enderror

                                        <label for="email">Email</label>
                                        <div class="mb-16">
                                            <input type="text" class="form-control" id="email" name="email" placeholder="Email..">
                                        </div>
                                        @error('email')
                                        <div class="alert alert-danger">{{ $message }}</div>
                                        @enderror
                                    </div>

                                    <div class="form-group col-md-6">
                                        <label for="pass">Пароль</label>
                                        <div class="mb-16">
                                            <input type="password" class="form-control" id="pass" name="pass" placeholder="Пароль..">
                                        </div>
                                        @error('pass')
                                        <div class="alert alert-danger">{{ $message }}</div>
                                        @enderror

                                        <label for="token">Token</label>
                                        <div class="mb-16">
                                            <input type="text" class="form-control" id="token" name="token" placeholder="Token..">
                                        </div>
                                        @error('token')
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
