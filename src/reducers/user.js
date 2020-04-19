import { SET_LOGIN_INFO } from '../constants'

const DEFAULT_STATE = {
  avatar: '',
  nickName: '',
  openid: '',
  myTeamId: ''
}

export default function user(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SET_LOGIN_INFO: {
      const { openid } = action.payload
      return { ...state, openid }
    }
    default:
      return state
  }
}