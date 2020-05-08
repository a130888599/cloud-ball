import Taro from '@tarojs/taro'
import { call, put, take, fork } from 'redux-saga/effects'

import { ADD_TEAM, SET_TEAM_INFO, GET_TEAM_LIST, SET_TEAM_LIST, GET_TEAM_INFO, SET_TEAM_ID, JOIN_TEAM, QUIT_TEAM } from '../constants'
import { teamApi } from '../api'

function* addTeam(payload) {
  const { teamData, userData } = payload
  const { userId, oldTeamId } = userData
  try {
    //将用户从旧队伍中删除
    if (oldTeamId !== "") {
      yield put({ type: QUIT_TEAM, payload: { userId, teamId: oldTeamId } })
    }

    //调用API，返回数据库增加成功的数据
    const result = yield call(teamApi.addTeam, teamData)
    const { _id } = result
    const team = { ...teamData, _id }

    //更新store的数据
    yield put({ type: SET_TEAM_INFO, payload: team })
    // 更新本地的teamId
    yield put({ type: SET_TEAM_ID, payload: { _id } })

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
  const { newMemberInfo, teamId, oldTeamId } = payload
  try {
    if (oldTeamId !== '') {
      // 先将用户从旧的队伍中退出
      yield put({ type: QUIT_TEAM, payload: { userId: newMemberInfo._id, teamId: oldTeamId } })
    }
    // 修改数据库，将其添加到新的队伍中
    const res = yield call(teamApi.joinTeam, { newMemberInfo, teamId })
    console.log('res :>> ', res);
    const { data } = yield call(teamApi.getTeamInfo, teamId)
    
    //更新store
    yield put({ type: SET_TEAM_INFO, payload: { ...data } })
    //更新用户的teamId
    yield put({ type: SET_TEAM_ID, payload: { _id: teamId } })
  } catch (error) {
    console.log('error :>> ', error);
  }
}

function* quitTeam(payload) {
  const { userId, teamId } = payload
  try {
    //发送退出组队请求
    const { successNum } = yield call(teamApi.quitTeam, { userId, teamId })
    switch (successNum) {
      case 1: { // 组队列表为空，直接删除该组队
        Taro.switchTab({ url: '/pages/index/index' })
        break
      }
      case 2: { // 组队列表还有人，返回更新后的组队信息
        //获取最新的组队数据
        const { data } = yield call(teamApi.getTeamInfo, teamId)
        yield put({ type: SET_TEAM_INFO, payload: { ...data } })
        break
      }
      default: {
        console.log('删除功能发生错误');
      }
    }
    //将个人组队修改为空
    yield put({ type: SET_TEAM_ID, payload: { _id: '' } })
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