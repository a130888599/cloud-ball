import { SET_TEAM_INFO, SET_TEAM_LIST } from '../constants'

const imgUrl = {
  avatar1: 'https://pic1.zhimg.com/80/v2-286b615ef914eda26e78cd343449b063_720w.jpg',
  avatar2: 'https://pic2.zhimg.com/80/v2-8df0e1ada7af09d3c62f2ba5ec4e4266_720w.jpg',
  avatar3: 'https://pic1.zhimg.com/80/v2-b3972560b6f5b7ecfac44b3ceb78d134_720w.jpg',
  avatar4: 'https://pic4.zhimg.com/80/v2-5b59a66778496948e13b429f17666be8_720w.jpg'
}

const INITIAL_STATE = {
  _id: 'asdxczsaa',
  teamName: '说什么都队',
  address: '广工篮球场B区',
  startTime: '星期一',
  isPublic: true,
  memberNum: '5',
  members: [
    {
      openid: 'sdasa',
      nickName: '纯黑',
      avatarUrl: imgUrl.avatar2,
      isLeader: true
    },
    {
      openid: '213124141',
      nickName: '松羊夫人',
      avatarUrl: imgUrl.avatar3,
      isLeader: false
    }
  ],
  teamList: []
}

export default function team(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_TEAM_INFO: {
      const payload = action.payload
      return { ...state, ...payload }
    }
    case SET_TEAM_LIST: {
      const { teamList } = action.payload
      return { ...state, teamList }
    }
    default:
      return state
  }
}

