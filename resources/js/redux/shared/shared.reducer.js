import { GET_REF_SOURCES, UPDATE_ALERT } from './shared.types';
import ALERT_TYPES from '../../constants/alertTypes';

const INITIAL_STATE = {
    refSources: [],
    alert: {
        show: false,
        title: '',
        text: '',
        type: ALERT_TYPES.success
    }
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_REF_SOURCES:
            return {
                ...state,
                refSources: action.payload
            };
        case UPDATE_ALERT: {
            const alertType = action.payload?.type || ALERT_TYPES.success;
            return {
                ...state,
                alert: {
                    ...action.payload,
                    title: action.payload?.title || alertType,
                    type: alertType
                }
            };
        }
        default: return state;
    }
};

export default reducer;
