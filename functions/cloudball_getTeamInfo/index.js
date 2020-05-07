// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const { _id } = event
  try {
    const result = db.collection('cloudball_team').doc(_id).get()
    return result
  } catch (error) {
    console.log('云函数GetTeamInfoError :>> ', error);
  }
  return {
    _id,
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}