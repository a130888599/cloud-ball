import { fork, all } from 'redux-saga/effects';

import { watchLogin } from './user'

function* rootSaga() {
  yield all([
    fork(watchLogin)
  ])
}

export default rootSaga