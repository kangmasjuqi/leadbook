import instance from '../../services/config';
import {
    ERRORS, GETCOMPANIES, GETMYFAVORITECOMPANIES, MARKASFAVORITE, UNMARKASFAVORITE
} from './leadbook.types';

export const getCompanies = (payload) => async (dispatch) => {
    const paramsObj = {};

    if (payload.search !== '') {
        Object.assign(paramsObj, { search: payload.search });
    }

    try {
        const res = await instance.get(`/companies`, { params: paramsObj });
        if (res.status === 200) {
            dispatch({
                type: GETCOMPANIES,
                payload: res.data.data
            });
        }
        return res;
    } catch (e) {
        dispatch({
            type: ERRORS,
            payload: e.response.data
        });
        return e.response;
    }
};

export const getMyFavoriteCompanies = () => async (dispatch) => {
    const paramsObj = {};

    try {
        const res = await instance.get(`/favorite-company/my-list`, { params: paramsObj });
        if (res.status === 200) {
            dispatch({
                type: GETMYFAVORITECOMPANIES,
                payload: res.data.data
            });
        }
        return res;
    } catch (e) {
        dispatch({
            type: ERRORS,
            payload: e.response.data
        });
        return e.response;
    }
};

export const markAsFavorite = (payload) => async (dispatch) => {
    try {
        const res = await instance.post(`/favorite-company`, payload);
        if (res.status === 200) {
            dispatch({
                type: MARKASFAVORITE
            });
        }
        return res;
    } catch (e) {
        dispatch({
            type: ERRORS,
            payload: e.response.data
        });
        return e.response;
    }
};

export const unmarkAsFavorite = (payload) => async (dispatch) => {
    dispatch({
        type: UNMARKASFAVORITE
    });
    try {
        const res = await instance.delete(`/favorite-company/${payload.company_id}`);
        if (res.status === 200) {
            dispatch({
                type: UNMARKASFAVORITE
            });
        }
        return res;
    } catch (e) {
        dispatch({
            type: ERRORS,
            payload: e.response.data
        });
        return e.response;
    }
};
