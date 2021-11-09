import instance from '../../services/config';
import showConsoleError from '../../utils/showConsoleError';
import {
    GET_REF_SOURCES, UPDATE_ALERT, ERRORS
} from './shared.types';

export const getRefSources = () => async (dispatch) => {
    try {
        const res = await instance.get('/ref_sources');
        dispatch({
            type: GET_REF_SOURCES,
            payload: res.data.data
        });
    } catch (e) {
        dispatch({
            type: ERRORS,
            payload: showConsoleError(e)
        });
    }
};

export const updateAlert = (alert, timeout = 0) => async (dispatch) => {
    try {
        if (alert.show && timeout > 0) {
            setTimeout(() => {
                dispatch({
                    type: UPDATE_ALERT,
                    payload: { ...alert, show: false }
                });
            }, timeout);
        }
        dispatch({
            type: UPDATE_ALERT,
            payload: alert
        });
    } catch (e) {
        dispatch({
            type: ERRORS,
            payload: showConsoleError(e)
        });
    }
};
