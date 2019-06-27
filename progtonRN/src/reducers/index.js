import { combineReducers } from 'redux';
import locale from './localeReducer';
import theme from './themeReducer';
import authors from './authorsReducer';
import courses from './coursesReducer';
import loading from './loadingReducer';
import error from './errorReducer';

export default combineReducers({
  locale,
  theme,
  authors,
  courses,
  loading,
  error,
});
