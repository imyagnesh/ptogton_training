import { all, takeEvery, takeLatest, call, put } from 'redux-saga/effects';
import Config from 'react-native-config';
import * as types from '../constants/actionTypes';
import { API } from '../utils';

export function* loadCourses() {
  try {
    const courses = yield call(API, { url: `${Config.API_URL}courses` });
    yield put({ type: `${types.FETCH}_${types.COURSES}_${types.SUCCESS}`, payload: courses });
  } catch (error) {
    yield put({ type: `${types.FETCH}_${types.COURSES}_${types.FAILURE}`, payload: error });
  }
}

export function* saveCourse({ payload }) {
  try {
    const course = yield call(API, {
      url: `${Config.API_URL}courses`,
      method: 'POST',
      body: payload,
    });
    yield put({ type: `${types.SAVE}_${types.COURSES}_${types.SUCCESS}`, payload: course });
  } catch (error) {
    yield put({ type: `${types.SAVE}_${types.COURSES}_${types.FAILURE}`, payload: error });
  }
}

export function* updateCourse({ payload }) {
  try {
    const course = yield call(API, {
      url: `${Config.API_URL}courses/${payload.id}`,
      method: 'PUT',
      body: payload,
    });
    yield put({ type: `${types.UPDATE}_${types.COURSES}_${types.SUCCESS}`, payload: course });
  } catch (error) {
    yield put({ type: `${types.UPDATE}_${types.COURSES}_${types.FAILURE}`, payload: error });
  }
}

export function* loadCoursesRequest() {
  yield takeEvery(`${types.FETCH}_${types.COURSES}_${types.REQUEST}`, loadCourses);
}

export function* saveCourseRequest() {
  yield takeLatest(`${types.SAVE}_${types.COURSES}_${types.REQUEST}`, saveCourse);
}

export function* updateCourseRequest() {
  yield takeLatest(`${types.UPDATE}_${types.COURSES}_${types.REQUEST}`, updateCourse);
}

export default function* init() {
  yield all([loadCoursesRequest(), saveCourseRequest(), updateCourseRequest()]);
}
