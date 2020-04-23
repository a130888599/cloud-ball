import Taro, { useEffect } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtList, AtListItem } from "taro-ui";
import Header from "./component/Header/Header.jsx";
import WeappLoginButton from './component/WeappLoginButton/WeappLoginButton'

import "./mine.scss";
import { useSelector, useDispatch } from "@tarojs/redux";
import { LOGIN } from "../../constants/user.js";

export default function Mine() {

  const isLogged = useSelector(state => state.user.isLogged)
  const dispatch = useDispatch()

  useEffect(() => {
    getStorage()
    console.log('isLogged :>> ', isLogged);
  }, [])

  function testCloud() {
    // 尝试：连接云函数，并返回openid
    Taro.cloud.callFunction({
      name: 'cloudball_login',
      data: {
        nickName: '张三'
      }
    }).then(({ result }) => {
      console.log(result);
    }).catch(err => {
      console.error(err);
    })
  }

  // 获取本地用户数据
  async function getStorage() {
    Taro.getStorage({
      key: 'userinfo',
      success: function ({ data }) {
        const { avatarUrl, nickName } = data
        dispatch({ type: LOGIN, payload: { avatarUrl, nickName, isLogged: true } })
      }
    })
  }

  function handleClick() {
    console.log('点击了');
  }

  return (
    <View className="container">
      <View className="main">
        <Header />
        <AtList>
          <AtListItem
            title="我的组队"
            arrow="right"
            onClick={() => handleClick()}
          />
          <AtListItem title="我的球队" arrow="right" />
          <AtListItem title="使用帮助" arrow="right" />
          <AtListItem title="测试云函数" arrow="right" onClick={() => testCloud()} />
        </AtList>
      </View>
      {!isLogged ? <WeappLoginButton /> : ""}
    </View>
  );
}
