import Taro, { useState, useEffect } from '@tarojs/taro';
import { View, Picker } from '@tarojs/components';
import { AtButton, AtForm, AtInput, AtSlider, AtSwitch, AtModal } from "taro-ui";
import { useDispatch, useSelector } from '@tarojs/redux'

import './style.scss'
import { ADD_TEAM } from '../../constants';

export default function TeamForm() {

  const [teamName, setTeamName] = useState()
  const [address, setAddress] = useState()
  const [memberNum, setMemberNum] = useState(5)
  const [startDate, setStartDate] = useState()
  const [startTime, setStartTime] = useState()
  const [isPublic, setIsPublic] = useState(true)
  const { avatarUrl, nickName, _id } = useSelector(state => state.user)
  const [isOpened, setIsOpened] = useState(nickName === '' ? true : false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (_id === null || _id === '')
      console.log('请先登录');
  }, [])

  function onSubmit() {
    console.log("进行提交！");
    let time = `${startDate} ${startTime}`
    let members = [{avatarUrl, nickName, _id, isLeader: true}]
    dispatch({
      type: ADD_TEAM,
      payload: {
        teamName,
        address,
        memberNum,
        isPublic,
        startTime: time,
        members
      }
    });
    
  }
  function onReset() {
    setTeamName()
    setAddress()
    setMemberNum(5)
    setStartDate()
    setStartTime()
    setIsPublic(true)
  }

  function handleClose() {
    console.log('执行事件');
    Taro.switchTab({
      url: "/pages/index/index"
    });
  }
  function handleCancel() { 
    setIsOpened(!isOpened)
    Taro.switchTab({
      url: '/pages/index/index'
    })
  }
  function handleConfirm() {
    console.log('执行');
    Taro.switchTab({
      url: "/pages/mine/mine"
    });
  }

  return (
    <View className="TeamForm">
      <AtModal
        className="modal"
        isOpened={isOpened}
        title="注意"
        cancelText="取消"
        confirmText="登陆"
        onClose={handleClose}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        content="请先登陆再发布组队"
      />
      <AtForm onSubmit={onSubmit} onReset={onReset}>
        <View className="form-item">
          <AtInput
            name="teamName"
            title="队名"
            type="text"
            placeholder="请输入队名"
            value={teamName}
            onChange={e => setTeamName(e)}
          />
        </View>
        <View className="form-item">
          <AtInput
            name="address"
            title="地址"
            type="text"
            placeholder="请输入地址"
            value={address}
            onChange={e => setAddress(e)}
          />
        </View>
        <View className="form-item sliderBox">
          <Text>人数(1-10) : {memberNum}</Text>
          <AtSlider
            className="slider"
            min={1}
            max={10}
            value={memberNum}
            onChange={e => setMemberNum(e)}
            blockSize={15}
          ></AtSlider>
        </View>
        <View className="form-item">
          <Picker mode="date" onChange={e => setStartDate(e.detail.value)}>
            <View className="picker">
              <Text>请选择日期</Text>
              <Text>{startDate}</Text>
            </View>
          </Picker>
        </View>
        <View className="form-item">
          <Picker mode="time" onChange={e => setStartTime(e.detail.value)}>
            <View className="picker">
              <Text>请选择时间</Text>
              <Text>{startTime}</Text>
            </View>
          </Picker>
        </View>
        <View className="form-item">
          <AtSwitch
            title="是否公开"
            checked={isPublic}
            onChange={e => setIsPublic(e)}
          />
        </View>
        <View className="form-item"></View>
        <AtButton className="btn" formType="submit">
          提交
        </AtButton>
        <AtButton className="btn" formType="reset">
          重置
        </AtButton>
      </AtForm>
    </View>
  );
}

TeamForm.config = {
  navigationBarTitleText: '编辑组队'
};