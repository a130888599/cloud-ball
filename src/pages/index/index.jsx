import Taro, { useEffect } from '@tarojs/taro'
import { useDispatch, useSelector } from '@tarojs/redux'
import { View } from '@tarojs/components'
import { AtList, AtListItem } from "taro-ui"
import MyTitle from '../../components/myTitle/MyTitle'
import './index.scss'
import { GET_TEAM_LIST } from '../../constants'

export default function Index() {

  const teamList = useSelector(state => state.team.teamList)
  const dispatch = useDispatch()
  const list = [
    '队伍1', '队伍2', '队伍3', '队伍4', '队伍5', '队伍6', '队伍7', '队伍8'
  ]

  useEffect(() => {
    getTeamList()
  }, [])

  function handleClick(id) {
    Taro.navigateTo({
      url: '/pages/team/team?_id=' + id
    })
  }

  function newTeam() {
    Taro.navigateTo({
      url: `/pages/teamForm/teamForm`
    })
  }
  function getTeamList() {
    //首次加载，需要获取数据库组队列表
    dispatch({ type: GET_TEAM_LIST, payload: {} });
  }

  return (
    <View className='index'>
      <View className="Header">
        <View className="newTeam btn" onClick={newTeam}>
          发布组队
        </View>
        <View className="newGame btn" onClick={getTeamList}>
          发布比赛
        </View>
      </View>
      <View className="main">
        <MyTitle title="推荐队伍" />
        <AtList>
          {teamList.map((item) => <AtListItem title={item.teamName} arrow='right' onClick={() => handleClick(item._id)} />)}
        </AtList>
      </View>
    </View>
  )
}
