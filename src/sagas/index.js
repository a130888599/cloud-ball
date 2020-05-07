import { fork, all } from 'redux-saga/effects';

import { watchLogin } from './user'
import { watchAddTeam, watchGetTeamList, watchGetTeamInfo, watchJoinTeam, watchQuitTeam } from './team'

export default function* rootSaga() {
  yield all([
    fork(watchLogin),
    fork(watchAddTeam),
    fork(watchGetTeamList),
    fork(watchGetTeamInfo),
    fork(watchJoinTeam),
    fork(watchQuitTeam)
  ])
}