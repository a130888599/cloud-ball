import Taro, { useEffect } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtList, AtListItem, AtMessage } from "taro-ui";
import Header from "./component/Header/Header.jsx";
import WeappLoginButton from './component/WeappLoginButton/WeappLoginButton'

import "./mine.scss";
import { useSelector, useDispatch } from "@tarojs/redux";
import { LOGIN, SET_LOGIN_INFO } from "../../constants/user.js";

export default function Mine() {

  const isLogged = useSelector(state => state.user.isLogged)
  const myTeamId = useSelector(state => state.user.myTeamId)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    getStorage()
  }, [])

  useEffect(() => {
    Taro.setStorage({
      key: 'userinfo', 
      data: user
    })
  }, [myTeamId])

  // 获取本地用户数据
  async function getStorage() {
    Taro.getStorage({
      key: 'userinfo',
      success: function ({ data }) {
        const { avatarUrl, nickName, openid, myTeamId, _id, isLogged  } = data
        dispatch({ type: SET_LOGIN_INFO, payload: { avatarUrl, nickName, openid, myTeamId, _id, isLogged } })
      }
    })
  }

  function handleClick() {
    // 跳转对应页面
    Taro.navigateTo({
      url: '/pages/team/team?_id=' + myTeamId
    })
  }

  return (
    <View className="container">
      <AtMessage />
      <View className="main">
        <Header />
        <AtList>
          <AtListItem
            title="我的组队"
            arrow="right"
            onClick={() => handleClick()}
          />
          <AtListItem title="使用帮助" arrow="right" />
        </AtList>
      </View>
      {!isLogged ? <WeappLoginButton /> : ""}
    </View>
  );
}
