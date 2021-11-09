<?php

namespace Database\Seeders;

use App\Models\Company;
use Illuminate\Database\Seeder;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // run this class:
        // php artisan db:seed --class=CompanySeeder

        Company::factory()->count(20)->create();
    }
}
