/**
 * Created by ken on 2017/5/21.
 */
const {Store} = wx.vco
const LoginTimeOut = 604700 //  登陆过期时间 秒为单位 默认为 7天 ：604700
const MzMemberKey = 'member' // 登陆缓存key
const Api = {
  login: '/api/user/login'
}
module.exports = class extends Store {
  state () {
    return {
      member: {},
      ns: 'wechat/member',
      get toMember () {
        return JSON.stringify(this.member)
      }
    }
  }

  getMember () {
    let member = wx.getStorageSync(MzMemberKey)
    member = member && member.data || {}
    /**
     * 7天时间 7天后退出登陆过
     * @type {number}
     */
    if (Object.keys(member).length > 0) {
      member.now = member.now || 0
      let nowTimeOut = Date.now() / 1000 - member.now
      if (nowTimeOut > LoginTimeOut) {
        wx.removeStorageSync(MzMemberKey)
        member = {}
      }
    }
    /**
     * 7天后注销重新登录
     */

    if (Object.keys(member).length === 0) {
      wx.login().then(({code}) => {
        wx.getUserInfo().then((user) => {
          const {userInfo, iv, signature, encryptedData, encryptData, rawData} = user
          member = userInfo
          member.code = code
          wx.setStorageSync(MzMemberKey, member)
          this.member = member
        })
      })

    } else {
      this.member = member
    }

  }
}
