<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

class BaseController extends Controller
{
    public function sendResponse($message, $data = null)
    {
        $response = [
            'success' => true,
            'message' => $message,
        ];

        if (isset($data)) {
            $response['data'] = $data;
        }

        return response()->json($response, 200);
    }

    public function sendError($message, $errors = [], $code = 404)
    {
        $response = [
            'success' => false,
            'message' => $message,
        ];

        if (!empty($errors)) {
            $response['errors'] = $errors;
        }

        return response()->json($response, $code);
    }
}
