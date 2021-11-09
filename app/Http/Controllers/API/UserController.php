<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends BaseController
{

    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'password' => ['required', 'string', 'min:6', 'max:100'],
            'email' => ['required', 'email', 'exists:users,email']
        ]);

        if ($validator->fails()) {
            return $this->sendError('The given data was invalid.', $validator->errors(), 422);
        }

        $user = User::where('email', $request->email)->first();

        $user->password = Hash::make($request->get('password'));
        $updated = $user->save();

        if ($updated) {
            return $this->sendResponse('Password of user with email ' . $request->email . ' is successfully updated');
        } else {
            return $this->sendError('Sorry, user\'s password could not be updated', [], 400);
        }
    }

    public function updatePassword(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'password' => ['required', 'string', 'min:6', 'max:100'],
            'old_password' => ['required', 'string', 'min:6', 'max:100'],
        ]);

        if ($validator->fails()) {
            return $this->sendError('The given data was invalid.', $validator->errors(), 422);
        }

        $user = User::find($id);

        if (!$user) {
            return $this->sendError('Sorry, user with id ' . $id . ' cannot be found');
        }

        if (!Hash::check($request->old_password, $user->password)) {
            return $this->sendError('Sorry, old password is wrong', [], 400);
        }

        $user->password = Hash::make($request->get('password'));
        $updated = $user->save();

        if ($updated) {
            return $this->sendResponse('Password of user with id ' . $id . ' is successfully updated');
        } else {
            return $this->sendError('Sorry, user password could not be updated', [], 400);
        }
    }

}
