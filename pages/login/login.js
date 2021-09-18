// pages/login/login.js
import { $myRequest } from "../../utils/request" // 引入ajax工具
Page({
  data: {
    modalName: false, // 用于控制弹出获取手机号的按钮
    // 用于储存第一个接口为新用户的凭证信息
    sessionKey: "",
    openid: "",
    // getuserprofile获取的用户信息
    userInfo: null
  },

  // 微信快捷登录
  loginWx() {
   
    let p1 = this.wxSilentLogin() // 调用login接口请求code
    let p2 = this.wxGetUserProfile() // 获取用户信息
    Promise.all([p1, p2])
      .then((res) => {
        // wx.hideLoading()
        let code = res[0] // wx.login获取的code
        // let iv = res[1].iv // 用户信息
        // let encryptedData = res[1].encryptedData // 加密数据
        // console.log(iv)
        // console.log(encryptedData)
        console.log(code)
        // 将用户信息的头像等信息储存到data中
        this.setData({
          userInfo: res[1].userInfo
        })
        // 1. 发送登录请求
        this.sendLogin(code)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  async sendLogin(code) {
    try {
      wx.showLoading({
        title: "正在登陆...",
        mask: true
      })
      // 1. 向服务器发送登录请求
      const res = await $myRequest({
        url: "/xhll/auth/getSessionByCode",
        data: {
          code
        }
      })
      console.log("接口1:", res)

      if (res.message == 3) {
        wx.showToast({
          title: "授权失败",
          icon: "error",
          duration: 2000
        })
        return
      }
      if (res.message == 2) {
        console.log("我已有手机号,直接登录")

        // 将用户信息储存到本地
        wx.setStorage({
          key: "user",
          data: res.data
        })
        wx.hideLoading()
        // 跳转到首页
        wx.reLaunch({
          url: "/pages/home/home"
        })
        return
      }
      if (res.message == 1) {
        // 2.如果是新用户，弹出获取手机号的按钮并储存凭证信息
        this.setData({
          modalName: true,
          sessionKey: res.data.session_key,
          openid: res.data.openid
        })
        return
      }
    } catch (err) {
      console.log(err)
    }
  },
  // 3.发送请求获取用户手机号
  async getPhoneNumber(e) {
    // 通过按钮的回调获取到iv,encryptedData
    console.log(e.detail.iv, "iv")
    console.log(e.detail.encryptedData, "encrypetdData")
    const iv = e.detail.iv
    const encryptedData = e.detail.encryptedData

    const data = {
      sessionKey: this.data.sessionKey,
      openid: this.data.openid,
      iv,
      encryptedData,
      nickName: this.data.userInfo.nickName,
      avatarUrl: this.data.userInfo.avatarUrl,
      gender: this.data.userInfo.gender
    }
    console.log("接口2post参数", data)
    try {
      const res = await $myRequest({
        method: "POST",
        url: "/xhll/auth/getUserTelephoneVerify",
        data
      })
      console.log("接口2:", res)
    } catch (err) {
      console.log(err)
    }
  },
  // 跳转到手机号登录页面
  toLoginPhone() {
    wx.navigateTo({
      url: "/pages/phone/phone",
      success: (result) => {},
      fail: () => {},
      complete: () => {}
    })
  },
  // 关闭获取手机号弹窗
  hideModal() {
    this.setData({
      modalName: false
    })
  },
  // 跳转手机号登录注册页面
  toLoginPhone(){
    wx.navigateTo({
      url: "/pages/phone/phone"
    })
  },
  // 为保证wx.getUserProfile和wx.login的先后顺序,封装成两个promise对象
  wxGetUserProfile: function () {
    return new Promise((resolve, reject) => {
      wx.getUserProfile({
        lang: "zh_CN",
        desc: "用户登录", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写,不填写无法调用弹窗
        success: (res) => {
          resolve(res)
          // res.encryptedData,
          // res.iv
        },
        // 失败回调
        fail: (err) => {
          reject(err)
        }
      })
    })
  },
  wxSilentLogin: function () {
    return new Promise((resolve, reject) => {
      wx.login({
        success(res) {
          resolve(res.code)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }
})
