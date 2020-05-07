// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const { newMemberInfo, teamId } = event
  try {
    const _ = db.command
    await db.collection('cloudball_team').doc(teamId).update({
      data: { members: _.push(newMemberInfo) }
    })
    await db.collection('cloudball_user').doc(newMemberInfo._id).update({
      data: { myTeamId: _.set(teamId) }
    })
    return true
  } catch (error) {
    console.log('云函数-JoinTeam-Error :>> ', error);
    return false
  }
}