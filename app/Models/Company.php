<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Company extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'company_name', 'phone_number', 'address'
    ];

    /**
     * Get the favoriteByUsers for the company.
     */
    public function favoritedByUsers()
    {
        return $this->hasMany(FavoriteCompany::class, 'company_id', 'id')
                    ->select(['id', 'user_id', 'company_id']);
    }

    /**
     * Scope a query to filter based on request parameters: search.
     *
     * @param Builder $query
     * @param $request
     * @return Builder
     */
    public function scopeFilterSearch($query, $request)
    {
        if ($request->has('search')) {
            $query = $query->where(function ($query) use ($request) {
                $query = $query->where('company_name', 'like', '%' . trim($request->search) . '%')
                    ->orWhere(
                        DB::raw("replace(replace(replace(replace(phone_number, '-' , ''), '+', ''), '(', ''), ')', '')"),
                        'like',
                        '%' . trim($request->search) . '%'
                    )
                    ->orWhere('address', 'like', '%' . trim($request->search) . '%');
            });
        }

        return $query;
    }
}
