import Taro, { useDidShow, useEffect } from "@tarojs/taro";
import { useDispatch, useSelector } from "@tarojs/redux";
import { View } from "@tarojs/components";
import { AtList, AtListItem } from "taro-ui";
import MyTitle from "../../components/myTitle/MyTitle";
import "./index.scss";
import { GET_TEAM_LIST, SET_LOGIN_INFO } from "../../constants";

export default function Index() {
  const teamList = useSelector(state => state.team.teamList);
  const dispatch = useDispatch();

  // 相当于componentDidShow
  useDidShow(() => {
    console.log('刷新了');
    getTeamList()
  })

  useEffect(() => {
    // 首次进入，先读取用户信息
    Taro.getStorage({
      key: "userinfo",
      success: function ({ data }) {
        dispatch({ type: SET_LOGIN_INFO, payload: { ...data } })
      }
    });
  }, [])

  function handleClick(id) {
    Taro.navigateTo({
      url: "/pages/team/team?_id=" + id
    });
  }

  function newTeam() {
    Taro.navigateTo({
      url: `/pages/teamForm/teamForm`
    });
  }
  function getTeamList() {
    //首次加载，需要获取数据库组队列表
    dispatch({ type: GET_TEAM_LIST, payload: {} });
  }

  return (
    <View className="index">
      <View className="Header">
        <View className="newTeam btn" onClick={newTeam}>
          发布组队
        </View>
        <View className="newGame btn" onClick={getTeamList}>
          加入组队
        </View>
      </View>
      <View className="main">
        <MyTitle title="推荐队伍" />
        <AtList>
          {teamList.map(item => (
            <AtListItem
              title={item.teamName}
              arrow="right"
              onClick={() => handleClick(item._id)}
            />
          ))}
        </AtList>
      </View>
    </View>
  );
}
Index.config = {
  navigationBarTitleText: "广场"
};
