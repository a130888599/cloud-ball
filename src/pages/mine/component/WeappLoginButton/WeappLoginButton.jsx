import Taro, { useState, useEffect } from '@tarojs/taro'
import { Button } from '@tarojs/components'
import { useDispatch } from '@tarojs/redux';

import './style.scss'
import { LOGIN } from '../../../../constants';

export default function LoginButton() {
  const [isLogin, setIsLogin] = useState(false) // 书否处于正在登陆状态
  const dispatch = useDispatch()

  async function onGetUserInfo(e) {
    setIsLogin(true)

    const { avatarUrl, nickName } = e.detail.userInfo
    dispatch({ type: LOGIN, payload: { avatarUrl, nickName, isLogged: true } });
    
    setIsLogin(false)
  }

  return (
    <Button
      openType="getUserInfo"
      onGetUserInfo={onGetUserInfo}
      type="primary"
      className="login-button"
      loading={isLogin}
    >
      微信登录
    </Button>
  )
}