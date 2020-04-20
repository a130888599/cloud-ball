import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtList, AtListItem } from "taro-ui";
import Header from "./component/Header/Header.jsx";
import WeappLoginButton from './component/WeappLoginButton/WeappLoginButton'

import "./mine.scss";
import { useSelector } from "@tarojs/redux";

export default function Mine() {

  const isLogged = useSelector(state => state.user.isLogged)

  function handleClick() {
    console.log("dasdsads");
  }

  return (
    <View className="container">
      <View className="main">
        <Header />
        <AtList>
          <AtListItem
            title="我的组队"
            arrow="right"
            onClick={() => handleClick}
          />
          <AtListItem title="我的球队" arrow="right" />
          <AtListItem title="使用帮助" arrow="right" />
        </AtList>
      </View>
      { !isLogged ? <WeappLoginButton /> : '' }
    </View>
  );
}
