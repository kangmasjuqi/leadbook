<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{{ env('APP_NAME') }}</title>
        <link href="{{ asset('css/app.css?v=' . env('ASSET_VERSION')) }}" rel="stylesheet">
        <link href="{{ asset('css/global.css?v=' . env('ASSET_VERSION')) }}" rel="stylesheet">
    </head>
    <body>
        <div id="app"></div>
        <script src="{{ asset('js/app.js?v=' . env('ASSET_VERSION')) }}"></script>
    </body>
</html>
