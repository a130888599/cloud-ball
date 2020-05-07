import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useSelector } from '@tarojs/redux'
import Card from '../card/Card'

//import './style.scss'

export default function MemberList() {
  const { members, memberNum } = useSelector(state => state.team)
  return (
    <View>
      {members.map((member, index) => (
        <Card
          key={index.toString()}
          nickName={member.nickName}
          avatar={member.avatarUrl}
          isLeader={member.isLeader}
        />
      ))}
    </View>
  );
}