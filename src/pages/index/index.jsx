import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem } from "taro-ui"
import MyTitle from '../../components/myTitle/MyTitle'
import './index.scss'

export default function Index() {

  const list = [
    '队伍1', '队伍2', '队伍3', '队伍4', '队伍5', '队伍6', '队伍7', '队伍8'
  ]

  return (
    <View className='index'>
      <View className="Header">
        <View className="newTeam btn">
          发布组队
        </View>
        <View className="newGame btn">
          发布比赛
        </View>
      </View>
      <View className="main">
        <MyTitle title="推荐队伍" />
        <AtList>
          {list.map(item => <AtListItem title={item} arrow='right' onClick={this.handleClick} />)}
          <AtListItem title='队伍1' arrow='right' onClick={this.handleClick} />
          <AtListItem title='队伍2' arrow='right' />
          <AtListItem title='队伍3' arrow='right' />
          <AtListItem title='队伍4' arrow='right' />
          <AtListItem title='队伍5' arrow='right' />
          <AtListItem title='队伍6' arrow='right' />
        </AtList>
      </View>
    </View>
  )
}
