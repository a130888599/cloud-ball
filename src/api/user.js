import Taro from '@tarojs/taro';

async function login(userInfo) {
  const isWeapp = Taro.getEnv() === Taro.ENV_TYPE.WEAPP // 判断当前环境是否为微信
  try {
    if (isWeapp) {
      const { result } = await Taro.cloud.callFunction({
        name: 'cloudball_login',
        data: userInfo
      })
      return result.data
    }
  } catch (error) {
    console.log('UserApi ERROR :', error);
  }
}

const userApi = { login }

export default userApi