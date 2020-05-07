import { SET_IS_LOGIN, SET_LOGIN_INFO, LOGIN, SET_MYTEAMID } from '../constants'

const INITIAL_STATE = {
  _id: '',
  avatarUrl: '',
  nickName: '',
  openid: '',
  myTeamId: '',
  isLogged: false
}

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_IS_LOGIN: {
      const { isLogin } = action.payload
      return { ...state, isLogin }
    }
    case SET_LOGIN_INFO: {
      const { avatarUrl, nickName, isLogged, openid, myTeamId, _id } = action.payload
      return { ...state, avatarUrl, nickName, isLogged, openid, myTeamId, _id }
    }
    case SET_MYTEAMID: {
      const { _id } = action.payload
      return { ...state, myTeamId: _id }
    }
    default:
      return state
  }
}

