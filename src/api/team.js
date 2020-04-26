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

const teamApi = { addTeam, getTeamList, getTeamInfo }

export default teamApi