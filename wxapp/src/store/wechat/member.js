/**
 * Created by ken on 2017/5/19.
 */
import {autorun, observable, computed, action} from 'utils/mobx'
import http from 'utils/http'
import aop from 'aop'
const LoginTimeOut = 604700 //  登陆过期时间 秒为单位 默认为 7天 ：604700
const MzMemberKey = 'member' // 登陆缓存key
const Api = {
  login: '/api/user/login'
}
export default class extends aop {
  sn = 'wechat member'
  @observable member = {}
  constructor(){
    console.log('wechat',this)
    autorun(()=>{
      console.log(JSON.stringify(this.member))
    })
  }
  @action
  async getMember() {
    let member = await wx.getStorage({key: MzMemberKey})
    member = member && member.data || {}

    /**
     * 7天时间 7天后退出登陆过
     * @type {number}
     */
    if (Object.keys(member).length > 0) {
      member.now = member.now || 0
      let nowTimeOut = Date.now() / 1000 - member.now
      if (nowTimeOut > LoginTimeOut) {
        await wx.removeStorage({key: MzMemberKey})
        member = {}
      }
    }
    /**
     * 7天后注销重新登录
     */

    if (Object.keys(member).length === 0) {
      let {code} = await wx.login()
      const user = await wx.getUserInfo()
      const {userInfo, iv, signature, encryptedData, encryptData, rawData} = user
      member = userInfo
      member.code = code
      /*let {object, code, message} = await http.post(Api.login, { code, rawData, iv, encryptedData})

       if (code === 1) {
       member = Object.assign(member, object)
       }
       await wx.setStorage({key: MzMemberKey, data: member}) // 微信异步set*/
      await wx.setStorage({key: MzMemberKey, data: member}) // debug
    }
    console.log('member',member)
    this.member = member
    //
    getApp().member = member// 约定token
    return this.member
  }
}
