import Taro from '@tarojs/taro';
import { View, Button } from '@tarojs/components';

export default function ErrorPage() {
  function handleClick() {
    Taro.switchTab({ url: '/pages/index/index' })
  }
  return (
    <View>
      <View>对不起，您尚未加入组队</View>
      <View className="btn">
        <Button onClick={handleClick}>点击跳转</Button>
      </View>
    </View>
  )
}