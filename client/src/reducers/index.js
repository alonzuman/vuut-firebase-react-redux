import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { hoursReducer } from './hours';

export default combineReducers({
  auth: authReducer,
  hours: hoursReducer
});
