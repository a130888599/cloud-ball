import { SET_IS_LOGIN, SET_LOGIN_INFO, LOGIN } from '../constants'

const INITIAL_STATE = {
  avatarUrl: '',
  nickName: '',
  openid: '',
  myTeamId: '0001',
  isLogged: false
}

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_IS_LOGIN: {
      const { isLogin } = action.payload
      return { ...state, isLogin }
    }
    case SET_LOGIN_INFO: {
      const { avatarUrl, nickName, isLogged, openid, myTeamId } = action.payload
      return { ...state, avatarUrl, nickName, isLogged, openid, myTeamId }
    }
    default:
      return state
  }
}