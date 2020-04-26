import Taro from '@tarojs/taro'
import { call, put, take, fork } from 'redux-saga/effects'

import { ADD_TEAM, SET_TEAM_INFO } from '../constants'
import { teamApi } from '../api'

function* addTeam(teamData) {
  try {
    const { teamName, address, memberNum, startTime, isPublic, leaderInfo } = teamData
    let team = {
      teamName,
      address,
      memberNum,
      startTime,
      isPublic,
      leaderInfo,
      members: [leaderInfo]
    }

    //调用API，返回数据库增加成功的数据
    const result = yield call(teamApi.addTeam, team)
    const { _id } = result

    team = { ...team, _id }
    console.log('team :>> ', team);

    //将队伍信息存入本地
    yield Taro.setStorage({ key: 'teaminfo', data: team })

    //更新store的数据
    yield put({
      type: SET_TEAM_INFO, payload: team })

    //跳转到组队详情页面
    
    Taro.navigateTo({ 
      url: `/pages/team/team?_id=${_id}`
     })

  } catch (error) {
    console.log('error :>> ', error);
  }
}

function* watchAddTeam() {
  while (true) {
    const { payload } = yield take(ADD_TEAM)
    yield fork(addTeam, payload)
  }
}

export { watchAddTeam }