import { all, takeEvery, call, put, race, delay } from 'redux-saga/effects';
import Config from 'react-native-config';
import { API } from '../utils';
import * as types from '../constants/actionTypes';

export function* loadAuthors() {
  try {
    const { authors, timeout } = yield race({
      authors: call(API, { url: `${Config.API_URL}authors` }),
      timeout: delay(3 * 1000),
    });
    if (timeout) {
      yield put({
        type: `${types.FETCH}_${types.AUTHORS}_${types.FAILURE}`,
        payload: new Error('Timeout'),
      });
    } else {
      yield put({ type: `${types.FETCH}_${types.AUTHORS}_${types.SUCCESS}`, payload: authors });
    }
  } catch (error) {
    yield put({ type: `${types.FETCH}_${types.AUTHORS}_${types.FAILURE}`, payload: error });
  }
}

export function* loadAuthorsRequest() {
  yield takeEvery(`${types.FETCH}_${types.AUTHORS}_${types.REQUEST}`, loadAuthors);
}

export default function* init() {
  yield all([loadAuthorsRequest()]);
}
