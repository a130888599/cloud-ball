import Taro from '@tarojs/taro'
import { call, put, take, fork } from 'redux-saga/effects'

import { ADD_TEAM, SET_TEAM_INFO, GET_TEAM_LIST, SET_TEAM_LIST, GET_TEAM_INFO } from '../constants'
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

    //将队伍信息存入本地
    yield Taro.setStorage({ key: 'teaminfo', data: team })

    //更新store的数据
    yield put({ type: SET_TEAM_INFO, payload: team })

    //跳转到组队详情页面
    
    Taro.navigateTo({ 
      url: `/pages/team/team?_id=${_id}`
     })

  } catch (error) {
    console.log('error :>> ', error);
  }
}

function* getTeamList() {
  try {
    // 获取组队列表
    const result = yield call(teamApi.getTeamList, {})
    // 存入store
    yield put({ type: SET_TEAM_LIST, payload: { teamList: result.data } })
  } catch (error) {
    console.log('error :>> ', error);
  }
}

function* getTeamInfo(payload) {
  const { _id } = payload
  try {
    const result = yield call(teamApi.getTeamInfo, _id)
    const { data } = result
    // 存入store
    yield put({ type: SET_TEAM_INFO, payload: { ...data } })
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
function* watchGetTeamList() {
  while (true) {
    const { payload } = yield take(GET_TEAM_LIST)
    yield fork(getTeamList, payload)
  }
}
function* watchGetTeamInfo() {
  while (true) {
    const { payload } = yield take(GET_TEAM_INFO)
    yield fork(getTeamInfo, payload)
  }
}

export { watchAddTeam, watchGetTeamList, watchGetTeamInfo }