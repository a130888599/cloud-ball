// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const { avatarUrl, nickName } = event
  try {
    const { data } = await db
      .collection('cloudball_user')
      .where({ openid: event.userInfo.openId })
      .get()
    
    // 数据库中是否存在这个用户
    if (data.length > 0) {
      return { data: data[0] }
    }
    else {
      await db.collection('cloudball_user')
        .add({
          data: {
            avatarUrl: avatarUrl,
            nickName: nickName,
            myTeamId: null,
            openid: wxContext.OPENID
          }
        })
        .then(res => {
          return { res }
        })
        .catch(error => {
          return { error }
        })
    }

  } catch (error) {
    console.log('登陆云函数错误 :>> ', error);
  }
}