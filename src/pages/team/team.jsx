import Taro, { useState, useEffect } from "@tarojs/taro";
import { useSelector, useDispatch } from "@tarojs/redux";
import { View, Button } from "@tarojs/components";
import { AtCard } from "taro-ui";
import Card from "../../components/card/Card";

import "./style.scss";
import { GET_TEAM_INFO } from "../../constants";

export default function Team() {
  const {
    leaderInfo,
    address,
    startTime,
    memberNum,
    members,
    teamName,
    isPublic
  } = useSelector(state => state.team);

  const _id = this.$router.params._id
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('_id :>> ', _id);
    // 根据id获取队伍详情
    dispatch({ type: GET_TEAM_INFO, payload: { _id } });
  }, [])

  // 是否已经加入了该队伍
  async function isInTeam() {
    let myTeamId = null;
    await Taro.getStorage({
      key: 'userinfo',
      success: ({ data }) => {
        myTeamId = data.myTeamId
      }
    })
    
    if (_id === myTeamId)
      return true
    return false
  }

  //邀请好友
  function inviteFriends() {
    // TODO:分享小程序给好友
    console.log('分享小程序给好友');
  }

  // 退出组队
  function leaveTeam() {
    // 发送请求
    // 跳转回主页面
    
  }

  return (
    <View className="team">
      <AtCard className="item" title="队名">
        {teamName}
      </AtCard>
      <AtCard className="item" title="地址">
        {address}
      </AtCard>
      <AtCard className="item" title="时间">
        {startTime}
      </AtCard>
      <AtCard className="item" title="队长">
        <Card nickName={leaderInfo.nickName} avatar={leaderInfo.avatarUrl} />
      </AtCard>
      <AtCard className="item" title="队员">
        {members.map((member, index) => (
          <Card
            key={index.toString()}
            nickName={member.nickName}
            avatar={member.avatarUrl}
          />
        ))}
      </AtCard>
      <View className="footer">
        <Button className="invite-friends btn" onClick={() => inviteFriends()}>
          邀请好友
        </Button>
        <Button className="leave-team btn" onClick={() => leaveTeam()}>
          退出组队
        </Button>
      </View>
    </View>
  );
}