const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.ts('resources/js/index.js', 'public/js/app.js').react()
    .sass('resources/js/assets/css/global.scss', 'public/css')
    .sass('resources/sass/_variables.scss', 'public/css')
    .sass('resources/sass/app.scss', 'public/css')
    .setResourceRoot('../');

if (!process.env.MIX_DISABLE_BROWSERSYNC || process.env.MIX_DISABLE_BROWSERSYNC === '0' || process.env.MIX_DISABLE_BROWSERSYNC === 'false') {
    mix.browserSync({
        proxy: '127.0.0.1:8000'
    });
}
