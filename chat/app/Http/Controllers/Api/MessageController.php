<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Events\MessageCreated;
use App\Http\Controllers\Controller;
use App\Models\Channel;
use App\Models\Message;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{

    public function index($channelId)
    {
        $messages = Channel::findOrFail($channelId)->messages()->with('sender')->get();
        return response()->json($messages);
    }

    public function store(Request $request)
    {


        $request->validate([
            'channel_id' => 'required',
            'message' => 'required',
        ]);

        $message = Message::create([
            'channel_id' => $request->input('channel_id'),
            'receiver_id' => null, // No lo uso a falta de mensajes directos entre usuarios
            'sender_id' => Auth::id(),
            'message' => $request->input('message'),
        ]);


//        $request->validate([
//            'channel_id' => 'required',
//            'message' => 'required',
//        ]);
//
//        $message = Message::create([
//            'channel_id' => $request->input('channel_id'),
//            'receiver_id' => null, // No hay mensajes directos entre usuarios
//            'sender_id' => $request->input('sender_id'),
//            'message' => $request->input('message'),
//        ]);

        broadcast(new MessageCreated($message))->toOthers();

        return response()->json($message, 201);
    }



















//    public function index(string $receiver): JsonResponse
//    {
//        $messages = Message::query()
//            ->with('receiver', 'sender')
//            ->where(function (Builder $builder) use ($receiver) {
//                $builder->where('receiver_id', $receiver)
//                    ->where('sender_id', Auth::id());
//            })
//            ->orWhere(function (Builder $builder) use ($receiver) {
//                $builder->where('receiver_id', Auth::id())
//                    ->where('sender_id', $receiver);
//            })
//            ->orderBy('created_at')
//            ->get();
//
//        return response()->json($messages);
//    }
//
//    public function store(Request $request): JsonResponse
//    {
//        $data = $request->validate([
//            'message' => ['required'],
//            'room_id' => ['required'],
//        ]);
//
//        $message = Message::create([
//            'receiver_id' => $data['room_id'],
//            'sender_id' => Auth::id(),
//            'message' => $data['message'],
//        ]);
//
//        broadcast(new MessageCreated($message))->toOthers();
//
//        return response()->json($message);
//    }
}
