import Taro from '@tarojs/taro'

const isWeapp = Taro.getEnv() === Taro.ENV_TYPE.WEAPP

async function addTeam(teamData) {
  try {
    if (isWeapp) {
      const { result } = await Taro.cloud.callFunction({
        name: 'cloudball_addTeam',
        data: teamData
      })
      return result
    }
  } catch (error) {
    console.log('TeamApi ERROR: ', error);
  }
}

async function getTeamList() {
  try {
    if (isWeapp) {
      const { result } = await Taro.cloud.callFunction({
        name: 'cloudball_getTeamList'
      })
      return result
    }
  } catch (error) {
    console.log('error :>> ', error);
  }
}

async function getTeamInfo(_id) {
  try {
    if (isWeapp) {
      const { result } = await Taro.cloud.callFunction({
        name: 'cloudball_getTeamInfo',
        data: { _id }
      })
      return result
    }
  } catch (error) {
    console.log('error :>> ', error);
  }
}

async function joinTeam(data) {
  try {
    if (isWeapp) {
      const { result } = await Taro.cloud.callFunction({
        name: 'cloudball_joinTeam',
        data: { ...data }
      })
      console.log('resValue :>> ', result);
      return result
    }
  } catch (error) {
    console.log('API-JoinTeam-Error :>> ', error);
  }
}

async function quitTeam({ userId, teamId }) {
  try {
    const { result } = await Taro.cloud.callFunction({
      name: 'cloudball_quitTeam',
      data: { userId, teamId }
    })
    console.log('result :>> ', result);
    return result
  } catch (error) {
    console.log('error :>> ', error);
  }
}

const teamApi = { addTeam, getTeamList, getTeamInfo, joinTeam, quitTeam }

export default teamApi