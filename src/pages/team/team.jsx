import Taro, { useState, useEffect } from "@tarojs/taro";
import { useSelector } from "@tarojs/redux";
import { View, Text } from "@tarojs/components";
import { AtCard, AtAvatar } from "taro-ui";
import Card from "../../components/card/Card";

import "./style.scss";

export default function Team() {
  // mock
  const {
    leaderInfo,
    address,
    startTime,
    endTime,
    teamNum,
    members
  } = useSelector(state => state.team);
  const [teamId, setTeamId] = useState(this.$router.params.id);
  

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
    </View>
  );
}
