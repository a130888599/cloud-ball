import Taro from "@tarojs/taro"
import { View } from '@tarojs/components'
import './MyTitle.scss'

export default function Title(props) {
  return(
    <View className="title">
      {props.title}
    </View>
  )
}