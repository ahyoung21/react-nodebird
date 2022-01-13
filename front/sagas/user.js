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
import {
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} from '../reducers/user';

function followAPI(data) {
  return axios.post('/api/login', data);
}

function* follow(action) {
  try {
    // const result = yield call(followAPI, action.data); // 동기 함수 실행
    yield delay(1000);
    yield put({
      type: FOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      // dispatch 개념
      type: FOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function unfollowAPI(data) {
  return axios.post('/api/login', data);
}

function* unfollow(action) {
  try {
    // const result = yield call(unfollowAPI, action.data); // 동기 함수 실행
    yield delay(1000);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      // dispatch 개념
      type: UNFOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function logInAPI(data) {
  return axios.post('/api/login', data);
}

function* logIn(action) {
  try {
    console.log('saga login');
    // const result = yield call(logInAPI, action.data); // 동기 함수 실행
    yield delay(1000);
    yield put({
      type: LOG_IN_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      // dispatch 개념
      type: LOG_IN_FAILURE,
      error: err.response.data,
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
      type: LOG_OUT_SUCCESS,
      // data: result.data,
    });
  } catch (err) {
    yield put({
      // dispatch 개념
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

function signUpAPI() {
  return axios.post('/api/signUp');
}

function* signUp() {
  try {
    // const result = yield call(signUpAPI); // 동기 함수 실행
    yield delay(1000);
    yield put({
      type: SIGN_UP_SUCCESS,
      // data: result.data,
    });
  } catch (err) {
    yield put({
      // dispatch 개념
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnFollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

function* watchLogin() {
  // 로그인이란 액션이 실행될때까지 기다리겠다 take는 한번밖에 사용이 불가능(take)
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
  yield takeEvery(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}

export default function* userSage() {
  yield all([
    fork(watchFollow), // 비동기 함수 실행
    fork(watchUnFollow),
    fork(watchLogin),
    fork(watchLogOut),
    fork(watchSignUp),
  ]);
}
