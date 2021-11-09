<?php

namespace App\Http\Controllers\API;

use App\Models\Company;
use App\Models\FavoriteCompany;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FavoriteCompanyController extends BaseController
{
    private function getLoggedInUserId()
    {
        $loggedInUser = request()->user();
        $loggedInUserId = $loggedInUser->id;
        return $loggedInUserId;
    }

    // list my favorite companies (based on logged in user)
    public function myFavoriteCompanies()
    {
        $favCompanies = Company::select([
                            'favorite_companies.id as favorite_company_id', 
                            'companies.id as company_id', 'company_name', 'phone_number', 'address'
                        ])
                        ->join('favorite_companies', 'companies.id', '=', 'favorite_companies.company_id')
                        ->where(['user_id' => $this->getLoggedInUserId()])
                        ->orderBy('company_name')
                        ->get();

        return $this->sendResponse('My favorite companies retrieved successfully.', $favCompanies);
    }

    // mark as favorite
    public function store(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'company_id' => ['numeric', 'exists:App\Models\Company,id']
        ]);

        $data = ['user_id' => $this->getLoggedInUserId(), 'company_id' => $input['company_id']];
        $isExist = FavoriteCompany::where($data)->first();

        if($isExist) {
            return $this->sendError('The company has already been marked as favorite.', 422);
        }

        if ($validator->fails()) {
            return $this->sendError('The given data was invalid.', $validator->errors(), 422);
        }

        $favCompany = FavoriteCompany::create($data);

        return $this->sendResponse('Company successfully marked as favorite.', $favCompany);
    }

    // unmark as favorite
    public function destroy($companyId)
    {

        $condition = ['user_id' => $this->getLoggedInUserId(), 'company_id' => $companyId];
        $favCompany = FavoriteCompany::where($condition)->first();

        if (!$favCompany) {
            return $this->sendError('Sorry, favorite company cannot be found');
        }

        if ($favCompany->delete()) {
            return $this->sendResponse(null, 'Favorite company is successfully unmarked as favorite');
        } else {
            return $this->sendError('Sorry, Favorite company could not be unmarked as favorite', [], 400);
        }
    }
}
