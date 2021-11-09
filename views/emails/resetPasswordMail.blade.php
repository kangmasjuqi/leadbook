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
<p>Hi {{ $details['name'] }},</p>
<p>
    You requested to reset the password for your
    {{ env('APP_NAME') }} account
    with the e-mail address (<a href="mailto:{{ $details['email'] }}" target="_blank">{{ $details['email'] }}</a>).
    Please click this link to reset your password.
</p>
<p>
    <a href="{{ $details['reset_link'] }}"
    style="color:#2b6dad;text-decoration:none;word-wrap:break-word !important;"
    target="_blank">{{ $details['reset_link']  }}</a>
</p>
<p>
    Thanks,<br/>
    {{ env('APP_NAME') }} Support
</p>
<div style="font-size:11px;color:#999;margin-top: 25px;">
    If you did not request a password reset, please feel free to ignore this message.
</div>
</body>
</html>
