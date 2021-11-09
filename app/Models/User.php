<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use Notifiable;
    use HasApiTokens;
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'phone_number'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        // 'email_verified_at' => 'datetime', //this column is dropped because unused
    ];

    /**
     * Get the favoriteCompanies for the user.
     */
    public function favoriteCompanies()
    {
        return $this->hasMany(FavoriteCompany::class, 'user_id', 'id');
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
                $query = $query->where('name', 'like', '%' . trim($request->search) . '%') //case insensitive
                    ->orWhere('email', 'like', '%' . trim($request->search) . '%') //case insensitive
                    ->orWhere(
                        DB::raw("replace(replace(replace(replace(phone_number, '-' , ''), '+', ''), '(', ''), ')', '')"),
                        'like',
                        '%' . trim($request->search) . '%'
                    );
            });
        }

        return $query;
    }
}
