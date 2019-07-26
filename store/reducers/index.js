import { combineReducers } from 'redux';
import authReducer from './authReducer';
import groupReducer from './groupReducer';
import listUserReducer from './listUserReducer';

const rootReducer = combineReducers({
  authReducer,
  groupReducer,
  listUserReducer,
});

export default rootReducer;
