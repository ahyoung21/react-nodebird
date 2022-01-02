import axios from 'axios';
import { all, fork } from 'redux-saga/effects';

import postSage from './post';
import userSage from './user';

export default function* rootSaga() {
  // all은 동시에 실행
  yield all([
    fork(postSage), // 비동기 함수 실행
    fork(userSage),
  ]);
}
