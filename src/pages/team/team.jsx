import Taro, { useState, useEffect } from "@tarojs/taro";
import { useSelector } from "@tarojs/redux";
import { View, Text, Button } from "@tarojs/components";
import { AtCard, AtAvatar } from "taro-ui";
import Card from "../../components/card/Card";

import "./style.scss";

export default function Team() {
  // mock
  const {
    leaderInfo,
    address,
    startTime,
    memberNum,
    members,
    teamName,
    isPublic
  } = useSelector(state => state.team);
  
  const [teamData, setTeamData] = useState({})
  const teamId = this.$router.params._id

  // 获取数据库中的组队详情
  function getTeamData(teamId) {
    Taro.request({
      url: 'http://baidu.com',
      data: JSON.stringify({ teamId }),
      method: "GET",
      success: ({data}) => {
        console.log(data);
        setTeamData(data)
      }
    })
  }

  // 是否已经加入了该队伍
  async function isInTeam() {
    let myTeamId = null;
    await Taro.getStorage({
      key: 'userinfo',
      success: ({ data }) => {
        myTeamId = data.myTeamId
      }
    })
    
    if (teamId === myTeamId)
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

  useEffect(() => {
    //getTeamData(teamId)
  }, [teamId])

  return (
    <View className="team">
      <AtCard className="item" title="队长">
        <Card nickName={leaderInfo.nickName} avatar={leaderInfo.avatar} />
      </AtCard>
      <AtCard className="item" title="地址">
        {address}
      </AtCard>
      <AtCard className="item" title="时间">
        {startTime} 至 {endTime}
      </AtCard>
      <AtCard className="item" title="队员">
        {members.map((member, index) => (
          <Card
            key={index.toString()}
            nickName={member.nickName}
            avatar={member.avatar}
          />
        ))}
      </AtCard>
      <View className="footer">
          <Button className="invite-friends btn" onClick={() => inviteFriends()} >邀请好友</Button>
          <Button className="leave-team btn" onClick={() => leaveTeam()} >退出组队</Button>
      </View>
    </View>
  );
}