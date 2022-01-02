import axios from 'axios';
import {
  all,
  fork,
  call,
  put,
  take,
  takeEvery, // 두번 누르면 두번 다 실행
  takeLatest, // 두번 누르면 마지막것만 실행(요청은 다 보내고 응답만)
  takeLeading, // 두번 누르면 젤 앞에것만 실행
  throttle, // 설정한 시간 안에는 요청을 한번만 보내도록 설정
  delay,
} from 'redux-saga/effects';

function logInAPI(data) {
  return axios.post('/api/login', data);
}

function* logIn(action) {
  try {
    console.log('saga login');
    // const result = yield call(logInAPI, action.data); // 동기 함수 실행
    yield delay(1000);
    yield put({
      type: 'LOG_IN_SUCCESS',
      data: action.data,
    });
  } catch (err) {
    yield put({
      // dispatch 개념
      type: 'LOG_IN_FAILURE',
      data: err.response.data,
    });
  }
}

function logOutAPI() {
  return axios.post('/api/logout');
}

function* logOut() {
  try {
    // const result = yield call(logOutAPI); // 동기 함수 실행
    yield delay(1000);
    yield put({
      type: 'LOG_OUT_SUCCESS',
      // data: result.data,
    });
  } catch (err) {
    yield put({
      // dispatch 개념
      type: 'LOG_OUT_FAILURE',
      data: err.response.data,
    });
  }
}

function* watchLogin() {
  // 로그인이란 액션이 실행될때까지 기다리겠다 take는 한번밖에 사용이 불가능(take)
  yield takeLatest('LOG_IN_REQUEST', logIn);
}

function* watchLogOut() {
  yield takeEvery('LOG_OUT_REQUEST', logOut);
}

export default function* userSage() {
  yield all([
    fork(watchLogin), // 비동기 함수 실행
    fork(watchLogOut),
  ]);
}