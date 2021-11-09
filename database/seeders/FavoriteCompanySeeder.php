<?php

namespace Database\Seeders;

use App\Models\FavoriteCompany;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FavoriteCompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // run this class:
        // php artisan db:seed --class=FavoriteCompany

        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        FavoriteCompany::truncate();

        for ($ii=1; $ii <= 50 ;$ii++) {
            $check_n_data   = false;
            $arr_data       = [];
            do {
                $arr_data   = ['user_id' => rand(1, 10), 'company_id' => rand(1, 20)];
                $check_n_data      = FavoriteCompany::where($arr_data)->count();
            } while($check_n_data > 0);
            FavoriteCompany::create($arr_data);
        }

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
