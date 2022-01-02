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
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
} from '../reducers/post';

function addPostAPI(data) {
  return axios.post('/api/post', data);
}

function* addPost(action) {
  try {
    // const result = yield call(addPostAPI, action.data); // 동기 함수 실행
    yield delay(1000);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      // dispatch 개념
      type: ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function addCommentAPI(data) {
  return axios.post(`/api/post/${data.postId}/comment`, data);
}

function* addComment(action) {
  try {
    // const result = yield call(addCommentAPI, action.data); // 동기 함수 실행
    yield delay(1000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      // dispatch 개념
      type: ADD_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSage() {
  yield all([fork(watchAddPost), fork(watchAddComment)]);
}
