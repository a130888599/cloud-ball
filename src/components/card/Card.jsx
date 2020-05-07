import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'

import './Card.scss'

export default function Card(props) {
  let imgUrl = props.avatar
  let isLeader = props.isLeader
  return (
    <View className="card">
      <View className="left">
        <Image className="avatar" src={imgUrl} />
        <Text className="nickName">{props.nickName}</Text>
      </View>
      <View className="right">
        {isLeader ? '队长' : '队员'}
      </View>
    </View>
  );
}