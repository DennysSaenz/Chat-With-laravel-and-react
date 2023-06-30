<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Channel;
use App\Models\Message;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class ChannelController extends Controller
{
    public function index(): JsonResponse
    {
        $channels = Channel::all();

        return response()->json($channels);
    }
}
