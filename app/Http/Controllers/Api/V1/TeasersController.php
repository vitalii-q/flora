<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\TeaserStoreRequest;
use App\Http\Resources\TeasersResource;
use App\Models\Teaser;
use Illuminate\Http\Response;

class TeasersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return TeasersResource::collection(Teaser::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(TeaserStoreRequest $request)
    {
        $created_teaser = Teaser::create($request->validated()); // все провалидированные поля

        return new TeasersResource($created_teaser);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return new TeasersResource(Teaser::findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(TeaserStoreRequest $request, $id)
    {
        $teaser = Teaser::findOrFail($id);
        $teaser->update($request->validated());

        return new TeasersResource($teaser);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $teaser = Teaser::findOrFail($id);
        $teaser->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }
}
