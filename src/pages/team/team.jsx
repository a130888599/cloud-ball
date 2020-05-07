import Taro, { useState, useEffect } from "@tarojs/taro";
import { useSelector, useDispatch } from "@tarojs/redux";
import { View } from "@tarojs/components";
import { AtCard } from "taro-ui";

import "./style.scss";
import { GET_TEAM_INFO } from "../../constants";
import MemberList from "../../components/memberList/MemberList";
import FooterBtn from "../../components/footerBtn/FooterBtn";

export default function Team() {
  const {
    address,
    startTime,
    memberNum,
    teamName,
    isPublic
  } = useSelector(state => state.team);
  const { myTeamId } = useSelector(state => state.user)
  const [isInTeam, setIsInTeam] = useState(false)
  const _id = this.$router.params._id
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('_id :>> ', _id);
    // 根据id获取队伍详情
    dispatch({ type: GET_TEAM_INFO, payload: { _id } });
    // 是否是队长
  }, [])

  useEffect(() => {
    console.log('更新了teamId');
    if (_id === myTeamId) setIsInTeam(true)
    else setIsInTeam(false)
  }, [myTeamId])


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
      <AtCard className="item" title="成员" extra={`上限${memberNum}人`}>
        <MemberList/>
      </AtCard>
      <View className="footer">
        <FooterBtn isInTeam={isInTeam} teamId={_id} />
      </View>
    </View>
  );
}