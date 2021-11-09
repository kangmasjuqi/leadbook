<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // run this class:
        // php artisan db:seed --class=UserSeeder

        User::factory()->count(10)->create();
    }
}
