import Taro from "@tarojs/taro"
import './style.scss'

export default function Title(props) {
  return(
    <View className="title">
      {props.title}
    </View>
  )
}