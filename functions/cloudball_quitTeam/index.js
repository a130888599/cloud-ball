// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const { userId, teamId } = event
  try {
    const _ = db.command
    const { data } = await db.collection('cloudball_team').doc(teamId).get()
    let members = data.members.splice(data.members.findIndex((item) => item._id === userId), 1)
    await db.collection('cloudball_team').doc(teamId).update({
      data: {
        members: _.set(members)
      }
    })
    return true
  } catch (error) {
    console.log('error :>> ', error); 
    return false
  }
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}