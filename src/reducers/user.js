import { SET_IS_LOGIN, SET_LOGIN_INFO, LOGIN } from '../constants'

const INITIAL_STATE = {
  avatarUrl: '',
  nickName: '',
  userId: '',
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
      const { openid } = action.payload
      return { ...state, openid }
    }
    case LOGIN: {
      const { avatarUrl, nickName } = action.payload
      const isLogged = !state.isLogged
      return { ...state, avatarUrl, nickName, isLogged }
    }
    default:
      return state
  }
}