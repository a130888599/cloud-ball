import Taro from '@tarojs/taro'
import { call, put, take, fork } from 'redux-saga/effects'

// call: 在saga函数中调用其他异步/同步函数，获取结果
// put: 类似dispatch，在saga函数中发起action
// take: 在saga函数中监听action，并获取对应action所携带的数据
// fork: 在saga函数中无阻塞的调用handleSaga，调用之后，不会阻塞后续的执行逻辑

import { LOGIN, SET_LOGIN_INFO } from '../constants'
import { userApi } from '../api'

function* login(userInfo) {
  try {
    
  } catch (error) {
    const user = yield call(userApi.login, userInfo)
  }
}