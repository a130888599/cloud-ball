// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const { teamName, address, startTime, isPublic, members, memberNum } = event
  try {
    const dbRes = await db.collection('cloudball_team').add({
      data: {
        teamName, 
        address, 
        startTime, 
        isPublic, 
        members, 
        memberNum
      }
    })
    await db.collection('cloudball_user').doc(members[0]._id).update({
      data: { myTeamId: dbRes._id }
    })
    return { _id: dbRes._id }
  } catch (error) {
    console.log('addTeam error :>> ', error);
  }
  return {
    data: { event }
  }
}