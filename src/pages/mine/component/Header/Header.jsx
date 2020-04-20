import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { useSelector } from '@tarojs/redux'

import './Header.scss'

export default function Header() {
  const nickName = useSelector(state => state.user.nickName);
  const avatarUrl = useSelector(state => state.user.avatarUrl);
  const isLogged = useSelector(state => state.user.avatarUrl);;

  useEffect(() => {
    console.log('isLogged :', isLogged);
  }, [nickName])

  return (
    <View className="Header">
      {isLogged ? (
        <View className='left'>
          <Image className="avatar" src={avatarUrl} />
          <View className="nickName">{nickName}</View>
        </View>
      ) : (
        <View className='left'>
          <View className="nickName">请先登陆</View>
        </View>
      )}
      <View className="at-icon at-icon-chevron-right more"></View>
    </View>
  );
}