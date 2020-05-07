import Taro from '@tarojs/taro'
import { call, put, take, fork } from 'redux-saga/effects'

import { ADD_TEAM, SET_TEAM_INFO, GET_TEAM_LIST, SET_TEAM_LIST, GET_TEAM_INFO, SET_MYTEAMID, JOIN_TEAM, QUIT_TEAM } from '../constants'
import { teamApi } from '../api'

function* addTeam(teamData) {
  try {
    const { teamName, address, memberNum, startTime, isPublic, members } = teamData
    let team = {
      teamName,
      address,
      memberNum,
      startTime,
      isPublic,
      members
    }

    //调用API，返回数据库增加成功的数据
    const result = yield call(teamApi.addTeam, team)
    const { _id } = result
    team = { ...team, _id }

    //将队伍信息存入本地
    yield Taro.setStorage({ key: 'teaminfo', data: team })

    //更新store的数据
    yield put({ type: SET_TEAM_INFO, payload: team })
    // 更新本地的teamId
    yield put({ type: SET_MYTEAMID, payload: { _id } })

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
    // 根据id返回队伍详情
    const { data } = yield call(teamApi.getTeamInfo, _id)
    // 存入store
    yield put({ type: SET_TEAM_INFO, payload: { ...data } })
  } catch (error) {
    console.log('GetTeamInfoError :>> ', error);
  }
}

function* joinTeam(payload) {
  const { newMemberInfo, teamId } = payload
  try {
    // 修改数据库
    const res = yield call(teamApi.joinTeam, { newMemberInfo, teamId })
    console.log('res :>> ', res);
    // yield call(teamApi.quitTeam, newMemberInfo._id)
    const { data } = yield call(teamApi.getTeamInfo, teamId)
    
    //更新store
    yield put({ type: SET_TEAM_INFO, payload: { ...data } })
    //更新用户的teamId
    yield put({ type: SET_MYTEAMID, payload: { _id: teamId } })
  } catch (error) {
    console.log('error :>> ', error);
  }
}

function* quitTeam(payload) {
  const { userId, teamId } = payload
  try {
    //发送退出组队请求
    yield call(teamApi.quitTeam, { userId, teamId })
    //获取最新的组队数据
    const { data } = yield call(teamApi.getTeamInfo, teamId)
    //更新组队的store
    yield put({ type: SET_TEAM_INFO, payload: { ...data } })
    //将个人组队修改为空
    yield put({ type: SET_MYTEAMID, payload: { _id: '' } })
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
function* watchJoinTeam() {
  while (true) {
    const { payload } = yield take(JOIN_TEAM)
    yield fork(joinTeam, payload)
  }
}
function* watchQuitTeam() {
  while (true) {
    const { payload } = yield take(QUIT_TEAM)
    yield fork(quitTeam, payload)
  }
}

export {
  watchAddTeam,
  watchGetTeamList,
  watchGetTeamInfo,
  watchJoinTeam,
  watchQuitTeam
}