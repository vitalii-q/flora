<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
//use App\Models\Blog;
//use App\Models\BlogComment;

class AdminController extends Controller
{
    public function index() {
        //$articles = Blog::get();
        //$comments = BlogComment::get();composer update
        return view('admin.index');
    }

    public function view() {
        if(session()->get('view.admin_panel') == 'sidebar') {
            session()->put('view.admin_panel', 'full');
        } elseif (session()->get('view.admin_panel') == 'full') {
            session()->put('view.admin_panel', 'sidebar');
        }
        return response(session()->get('view.admin_panel')); // ответ в js
    }
}
