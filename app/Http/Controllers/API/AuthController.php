<?php

namespace App\Http\Controllers\API;

use App\Mail\ActivationMail;
use App\Mail\ResetPasswordMail;
use App\Models\User;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use stdClass;

class AuthController extends BaseController
{

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:50'],
            'email' => ['required', 'string', 'email', 'max:100', 'unique:users'],
            'phone_number' => ['nullable', 'string', 'max:20']
        ]);

        if ($validator->fails()) {
            return $this->sendError('The given data was invalid.', $validator->errors(), 422);
        }

        $new_user = new User();
        $new_user->name = $request->get('name');
        $new_user->email = $request->get('email');
        $new_user->phone_number = $request->get('phone_number');
        $new_user->password = 'not_set';
        $new_user->save();

        $token = $new_user->createToken($new_user->email, [])->plainTextToken;

        $activation_link = env('APP_URL') . '/reset-password?token=' . urlencode($token) .
        '&email=' . urlencode($new_user->email);
        $details = [
            'name' => $new_user->name,
            'email' => $new_user->email,
            'activation_link' => $activation_link
        ];

        // try {
        //     Mail::to($new_user->email)->send(new ActivationMail($details));

        //     if (count(Mail::failures()) > 0) {
        //         throw new Exception(Mail::failures());
        //     }
        // } catch (Exception $e) {
        //     Log::error('Failed to send Activation Email to ' . $new_user->email .
        //         ' with error : ' . $e->getMessage());
        //     return $this->sendError(
        //         'Failed to send Activation Email to ' . $new_user->email,
        //         [$e->getMessage()],
        //         500
        //     );
        // }

        return $this->sendResponse('User created. Activation Email sent to ' 
            . $new_user->email, $details);

    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'email', 'exists:users,email'],
            'password' => ['required', 'min:6', 'max:100']
        ]);

        if ($validator->fails()) {
            return $this->sendError('The given data was invalid.', $validator->errors(), 422);
        }

        $user = User::where('email', $request->email)->first();
        if (!Hash::check($request->password, $user->password)) {
            $errors = new stdClass();
            $errors->password[] = 'Wrong password';

            return $this->sendError('The given data was invalid.', $errors, 403);
        }

        $abilities = [];

        $user->token = $user->createToken($request->email, $abilities)->plainTextToken;

        return $this->sendResponse('User logged in successfully.', $user);
    }

    public function logout()
    {
        $user = request()->user();

        if (request()->token_id) {
            $user->tokens()->where('id', request()->token_id)->delete();
            return $this->sendResponse('User logged out successfully.');
        }

        $user->tokens()->delete();
        return $this->sendResponse('User logged out successfully.');
    }

    public function sendResetEmail(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'email', 'exists:users,email']
        ]);

        if ($validator->fails()) {
            return $this->sendError('The given data was invalid.', $validator->errors(), 422);
        }

        $user = User::where('email', $request->email)->first();

        $token = $user->createToken($user->email, [])->plainTextToken;

        $reset_link = env('APP_URL') . '/reset-password?token=' . urlencode($token) .
        '&email=' . urlencode($request->email);
        $details = [
            'name' => $user->name,
            'email' => $request->email,
            'reset_link' => $reset_link
        ];

        // try {
        //     Mail::to($request->email)->send(new ResetPasswordMail($details));

        //     if (count(Mail::failures()) > 0) {
        //         throw new Exception(Mail::failures());
        //     }
        // } catch (Exception $e) {
        //     Log::error('Failed to send Reset Password Email to ' . $request->email .
        //         ' with error : ' . $e->getMessage());
        //     return $this->sendError(
        //         'Failed to send Reset Password Email to ' . $request->email,
        //         [$e->getMessage()],
        //         500
        //     );
        // }

        return $this->sendResponse('Email sent! Please check your inbox.', $details);
    }
}
