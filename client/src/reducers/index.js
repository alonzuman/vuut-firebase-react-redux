import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { hoursReducer } from './hours';
import { alertsReducer } from './alerts';
import { themeReducer } from './theme';
import { adminReducer } from './admin';
import { localeReducer } from './locale';

export default combineReducers({
  auth: authReducer,
  hours: hoursReducer,
  alerts: alertsReducer,
  theme: themeReducer,
  admin: adminReducer,
  locale: localeReducer
});
