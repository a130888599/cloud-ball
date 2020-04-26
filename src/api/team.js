import Taro from '@tarojs/taro'

async function addTeam(teamData) {
  const isWeapp = Taro.getEnv() === Taro.ENV_TYPE.WEAPP
  try {
    if (isWeapp) {
      const { result } = await Taro.cloud.callFunction({
        name: 'cloudball_addTeam',
        data: teamData
      })
      console.log('APIresult :>> ', result);
      return result
    }
  } catch (error) {
    console.log('TeamApi ERROR: ', error);
  }
}

const teamApi = { addTeam }

export default teamApi