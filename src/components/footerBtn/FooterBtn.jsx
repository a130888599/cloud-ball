import Taro, { useEffect, useState } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { useSelector, useDispatch } from '@tarojs/redux';
import { JOIN_TEAM, QUIT_TEAM } from '../../constants'
import './style.scss'

export default function FooterBtn(props) {
  const { isInTeam, teamId } = props;
  const { _id, avatarUrl, nickName } = useSelector(state => state.user)
  const newMemberInfo = { _id, avatarUrl, nickName }
  const dispatch = useDispatch()
    //邀请好友
  function inviteFriends() {
    // TODO:分享小程序给好友
    console.log('分享小程序给好友');
  }
  // 退出组队
  function leaveTeam() {
    // 发送请求
    dispatch({ type: QUIT_TEAM, payload: { teamId, userId: _id } })
    // 跳转回主页面
    // Taro.switchTab({ url: '/pages/index/index' })
  }
  // 加入队伍
  function joinTeam() {
    console.log('欢迎加入!');
    // TODO:提示用户是否退出自己当前组队
    dispatch({ type: JOIN_TEAM, payload: { newMemberInfo, teamId } });
  }

  return (
    <View className="footer-btn">
      {isInTeam ? (
        <View>
          <Button
            className="invite-friends btn"
            openType="share"
            onClick={() => inviteFriends()}
          >
            邀请好友
          </Button>
          <Button className="leave-team btn" onClick={() => leaveTeam()}>
            退出组队
          </Button>
        </View>
      ) : (
        <View>
          <Button className="join-team btn" onClick={() => joinTeam()}>
            加入队伍
          </Button>
        </View>
      )}
    </View>
  );
}