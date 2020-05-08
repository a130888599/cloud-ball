import Taro from '@tarojs/taro'
import { call, put, take, fork } from 'redux-saga/effects'

// call: 在saga函数中调用其他异步/同步函数，获取结果
// put: 类似dispatch，在saga函数中发起action
// take: 在saga函数中监听action，并获取对应action所携带的数据
// fork: 在saga函数中无阻塞的调用handleSaga，调用之后，不会阻塞后续的执行逻辑

import { LOGIN, SET_LOGIN_INFO, SET_MYTEAMID, SET_TEAM_ID } from '../constants'
import { userApi } from '../api'

function* login(userInfo) {
  try {
    const { avatarUrl, nickName } = userInfo

    //调用api，得到返回结果
    const user = yield call(userApi.login, { avatarUrl, nickName })

    // 将用户信息存储到本地
    yield Taro.setStorage({ key: 'userinfo', data: user })

    // 更新store的数据
    const isLogged = !!user
    yield put({ type: SET_LOGIN_INFO, payload: { ...user, isLogged } })

    // 提示登陆成功
    Taro.atMessage({ type: 'success', message: '登陆成功！' })
  } catch (error) {
    console.log('error :>> ', error);

    // 登陆失败
    //yield put({ type: LOGIN_ERROR })

    // 提示登陆失败信息
    Taro.atMessage({ type: 'error', message: '登陆失败！' })
  }
}

function* setTeamId(payload) {
  try {
    const { _id } = payload
    //修改store
    yield put({ type: SET_MYTEAMID, payload: { _id } })
    //修改本地信息
    let { data } = yield Taro.getStorage({ key: 'userinfo' })
    data.myTeamId = _id
    yield Taro.setStorage({ key: 'userinfo', data })
  } catch (error) {
    console.log('error :>> ', error);
  }
}


function* watchLogin() {
  while (true) {
    const { payload } = yield take(LOGIN) // 监听LOGIN，触发则更新
    yield fork(login, payload)
  }
}
function* watchSetTeamId() {
  while (true) {
    const { payload } = yield take(SET_TEAM_ID)
    yield fork(setTeamId, payload)
  }
}

export {
  watchLogin,
  watchSetTeamId
}