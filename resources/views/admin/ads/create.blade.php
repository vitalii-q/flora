@extends('admin.layouts.admin_hf')

@section('title', 'Создание рекламы')

@section('content')
    <!-- Main Container -->
    <main id="main-container">
        <!-- Page Content -->
        <div class="content">
            <nav class="breadcrumb bg-white push">
                <span class="breadcrumb-item active"><strong>Меню</strong></span>
                <a class="breadcrumb-item" href="{{ route('ads.index') }}">Реклама</a>
                <span class="breadcrumb-item active">Создание</span>
            </nav>

            <div class="row">
                <div class="col-md-12">
                    <!-- Default Elements -->
                    <div class="block">
                        <div class="block-header block-header-default">
                            <h3 class="block-title">Создание рекламы</h3>
                            <div class="block-options">
                                <button type="button" class="btn-block-option">
                                    <i class="si si-wrench"></i>
                                </button>
                            </div>
                        </div>

                        <div class="block-content">
                            <form action="{{ route('ads.store') }}" method="post" enctype="multipart/form-data">
                                @csrf

                                <div class="row">
                                    <div class="form-group col-md-6">
                                        @php($teaserId = str_replace('?', '', stristr($_SERVER['REQUEST_URI'], '?')))
                                        <div class="form-group row">
                                            <label class="col-12" for="teaser_id">Тизер</label>
                                            <div class="col-md-12">
                                                <select class="form-control" id="teaser_id" name="teaser_id">
                                                    <option value="0">Выберите тизер</option>
                                                    @php($y=1) @foreach($teasers as $teaser)
                                                        <option value="{{ $teaser->id }}" <? if($teaserId != ''):?> <?if($teaser->id == $teaserId) {echo 'selected';}?> <?endif;?>>{{ $teaser->name }}</option>
                                                        @php($y++) @endforeach
                                                </select>
                                            </div>
                                        </div>
                                        @error('teaser_id')
                                        <div class="alert alert-danger">{{ $message }}</div>
                                        @enderror

                                        <div class="form-group row">
                                            <label class="col-12" for="template_id">Шаблон</label>
                                            <div class="col-md-12">
                                                <select onchange="ajaxTag($(this).val())" class="form-control" id="template_id" name="template_id">
                                                    <option value="0">Выберите шаблон</option>
                                                    @php($y=1) @foreach($templates as $template)
                                                        <option value="{{ $template->id }}">{{ $template->name }}</option>
                                                    @php($y++) @endforeach
                                                </select>
                                            </div>
                                        </div>
                                        @error('template_id')
                                        <div class="alert alert-danger">{{ $message }}</div>
                                        @enderror
                                        <div id="ajax_template_block" class="" style="max-width: 100%; overflow: hidden;"></div>
                                        <? //dump(\App\Models\Template::where('id', 2)->first()); ?>
                                    </div>

                                    <div class="form-group col-md-6">
                                        <label for="cpm">Cpm</label>
                                        <div class="mb-16">
                                            <input type="text" class="form-control" id="cpm" name="cpm" placeholder="Cpm..">
                                        </div>
                                        @error('cpm')
                                        <div class="alert alert-danger">{{ $message }}</div>
                                        @enderror

                                        <div class="form-group row">
                                            <label class="col-12" for="campaign_id">Компания</label>
                                            <div class="col-md-12">
                                                <select class="form-control" id="campaign_id" name="campaign_id">
                                                    <option value="0">Выберите компанию</option>
                                                    @php($y=1) @foreach($campaigns as $campaign)
                                                        <option value="{{ $campaign->id }}">{{ $campaign->name }}</option>
                                                        @php($y++) @endforeach
                                                </select>
                                            </div>
                                        </div>
                                        @error('campaign_id')
                                        <div class="alert alert-danger">{{ $message }}</div>
                                        @enderror

                                        <label class="col-12">Сайты</label>
                                        <div class="col-12 mb-16">
                                            @php($y=1) @foreach($sites as $site)
                                                <div class="custom-control custom-checkbox mb-5">
                                                    <input class="custom-control-input" type="checkbox" name="example-checkbox{{$y}}" id="example-checkbox{{$y}}" value="option1">
                                                    <label class="custom-control-label" for="example-checkbox{{$y}}">{{ $site->name }}</label>
                                                </div>
                                            @php($y++) @endforeach
                                        </div>

                                        <label class="col-12">Рекламные места</label>
                                        <div class="col-12 mb-16">
                                            @php($y=1) @foreach($places as $place)
                                                <div class="custom-control custom-checkbox mb-5">
                                                    <input class="custom-control-input" type="checkbox" name="example-checkbox{{$y}}" id="example-checkbox{{$y}}" value="option1">
                                                    <label class="custom-control-label" for="example-checkbox{{$y}}">{{ $place->name }}</label>
                                                </div>
                                            @php($y++) @endforeach
                                        </div>

                                        <label class="col-12">Цели</label>
                                        <div class="col-12 mb-16">
                                            @php($y=1) @foreach($targets as $target)
                                                <div class="custom-control custom-checkbox mb-5">
                                                    <input class="custom-control-input" type="checkbox" name="example-checkbox{{$y}}" id="example-checkbox{{$y}}" value="option1">
                                                    <label class="custom-control-label" for="example-checkbox{{$y}}">{{ $target->name }}</label>
                                                </div>
                                            @php($y++) @endforeach
                                        </div>
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
