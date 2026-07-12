<?php

namespace App\Http\Controllers\Api;


use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);

        $user = User::where('email', $fields['email'])->first();

        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response(['message' => 'Kredensial salah'], 401);
        }

        $token = $user->createToken('myapptoken')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ], 200);
    }

    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();
        return response(['message' => 'Logged out'], 200);
    }

    public function register(Request $request) {
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string|confirmed'
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);

        return response(['user' => $user, 'token' => $user->createToken('token')->plainTextToken], 201);
    }

    public function updateProfile(Request $request) {
        $user = auth()->user();
        $user->update($request->validate(['name' => 'required|string']));
        return response()->json($user);
    }


    public function updateNotification(Request $request)
    {
        $request->validate([
            'email_notification'=>'required|boolean'
        ]);

        $user = auth()->user();

        $user->email_notification =
            $request->email_notification;

        $user->save();

        return response()->json($user);
    }
}
