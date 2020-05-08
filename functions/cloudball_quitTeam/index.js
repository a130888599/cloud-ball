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
    // 获取当前的成员数组
    const { data } = await db.collection('cloudball_team').doc(teamId).get()
    let members = data.members.filter(item => item._id !== userId)
    // 如果去除用户后，成员数组为空，则直接删除该组队
    if (members.length === 0) {
      await db.collection('cloudball_team').doc(teamId).remove()
      return { msg: '组队为空', successNum: 1 }
    }

    // 如果去除后成员数组不为空，则直接删除该成员即可
    await db.collection('cloudball_team').doc(teamId).update({
      data: { members: _.set(members) }
    })
    return { msg: '删除成员成功', successNum: 2 }
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