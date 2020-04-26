import Taro, { useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem } from "taro-ui"
import MyTitle from '../../components/myTitle/MyTitle'
import './index.scss'

export default function Index() {

  const list = [
    '队伍1', '队伍2', '队伍3', '队伍4', '队伍5', '队伍6', '队伍7', '队伍8'
  ]

  useEffect(() => {
    const WeappEnv = Taro.getEnv() === Taro.ENV_TYPE.WEAPP
    if (WeappEnv) {
      Taro.cloud.init()
    }
  })

  function handleClick(item, index) {
    console.log(index);
    Taro.navigateTo({
      url: '/pages/team/team?id=' + index
    })
  }

  function newTeam() {
    Taro.navigateTo({
      url: `/pages/teamForm/teamForm`
    })
  }

  return (
    <View className='index'>
      <View className="Header">
        <View className="newTeam btn" onClick={newTeam}>
          发布组队
        </View>
        <View className="newGame btn">
          发布比赛
        </View>
      </View>
      <View className="main">
        <MyTitle title="推荐队伍" />
        <AtList>
          {list.map((item, index) => <AtListItem title={item} arrow='right' onClick={() => handleClick(item, index)} />)}
        </AtList>
      </View>
    </View>
  )
}
