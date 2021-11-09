<?php

namespace App\Http\Controllers\API;

use App\Models\Company;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class CompanyController extends BaseController
{
    public function index(Request $request)
    {
        $loggedInUser = request()->user();

        $companies = Company::filterSearch($request)
                        ->select(['id', 'company_name', 'phone_number', 'address']);

        $sort_by = 'company_name';
        if ($request->has('sort_by')) {
            $sort_by = $request->sort_by;
        }

        $sort_dir = 'asc';
        if ($request->has('sort_dir')) {
            $sort_dir = $request->sort_dir;
        }

        $companies = $companies->withCount([
                        'favoritedByUsers as is_favorited' => function($query) use ($loggedInUser)
                        {
                            $query->where('user_id', $loggedInUser->id);
                        }
                    ])
                    ->orderBy($sort_by, $sort_dir)
                    ->get();

        return $this->sendResponse('Companies retrieved successfully.', $companies);
    }
}
