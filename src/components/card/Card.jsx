import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'

import './Card.scss'

export default function Card(props) {
  let imgUrl = props.avatar
  return (
    <View className="card">
      <Image className="avatar" src={imgUrl} />
      <Text className="nickName">{props.nickName}</Text>
    </View>
  )
}