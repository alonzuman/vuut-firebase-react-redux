import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { hoursReducer } from './hours';
import { alertsReducer } from './alerts';
import { themeReducer } from './theme';

export default combineReducers({
  auth: authReducer,
  hours: hoursReducer,
  alerts: alertsReducer,
  theme: themeReducer
});
