<!DOCTYPE html>
<html lang="en">
<head>
    <title>{{ env('APP_NAME') }}</title>
    <style>
        * {
            font-family: Arial, serif;
            font-size:12px;
            line-height: 1.7;
        }
    </style>
</head>
<body style="padding:16px;width:80%;">
<p style="font-size:16px;font-weight: bold;">Welcome to {{ env('APP_NAME') }}</p>
<p>Hi {{ $details['name'] }},</p>
<p>
Please click this link to verify and set your password.</p>
<p>
    <a href="{{ $details['activation_link'] }}"
    style="color:#2b6dad;text-decoration:none;word-wrap:break-word !important;"
    target="_blank">{{ $details['activation_link']  }}</a>
</p>
<p>
    Thanks,<br/>
    {{ env('APP_NAME') }} Support
</p>
</body>
</html>
