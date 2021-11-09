import {
    GETCOMPANIES, GETMYFAVORITECOMPANIES, MARKASFAVORITE, UNMARKASFAVORITE
} from './leadbook.types';

const INITIAL_STATE = {
    companies: [],
    myFavoriteCompanies: []
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GETCOMPANIES:
            return {
                ...state,
                companies: action.payload
            };
        case GETMYFAVORITECOMPANIES:
            return {
                ...state,
                myFavoriteCompanies: action.payload
            };
        case MARKASFAVORITE:
            return {
                ...state
            };
        case UNMARKASFAVORITE:
            return {
                ...state
            };
        default: return state;
    }
};

export default reducer;
