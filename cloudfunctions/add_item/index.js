const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_NEW,
    throwOnNotFound: false
})

const db = cloud.database()

exports.main = async(event, context) => {
    const wxContext = cloud.getWXContext()
    return db.collection('photos').add({ // db前面是不是需要加上一个await??  await db.collection('photos')
        data: {
            due: new Date(),
            _openid: wxContext.OPENID,
            type: event.type || '其他',
            fileID: event.fileID
        }
    })
}