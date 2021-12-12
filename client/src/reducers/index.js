import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { textReducer } from './textReducer';

export default combineReducers({
  auth: authReducer,
  text: textReducer,
});
