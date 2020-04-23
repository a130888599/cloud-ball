// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const { userInfo } = event

  try {
    const { data } = await db
      .collection('cloudball_user')
      .where({ nickName: '张三' })
      .get()
    
    if (data.length > 0) {
      return { data }
    }
  } catch (error) {
    console.log('登陆云函数错误 :>> ', error);
  }

  return {
    userInfo,
    openid: wxContext.OPENID,
  }
}