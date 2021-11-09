import { combineReducers } from 'redux';
import sharedReducer from './shared/shared.reducer';
import leadbookReducer from './leadbook/leadbook.reducer';

const rootReducer = combineReducers({
    shared: sharedReducer,
    leadbooks: leadbookReducer
});

export default rootReducer;
