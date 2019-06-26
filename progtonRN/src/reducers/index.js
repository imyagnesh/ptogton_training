import { combineReducers } from 'redux';
import locale from './localeReducer';
import theme from './themeReducer';

export default combineReducers({
  locale,
  theme,
});
