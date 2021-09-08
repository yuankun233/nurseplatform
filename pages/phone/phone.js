import { $myRequest } from "../../utils/request" // 引入ajax工具
Page({
  data: {
    isGetCode: false, //是否获取验证码
    phone: "", //手机号码
    code: "", //用户输入验证码
    realCode: "", // 真正的验证码
    time: 60, //验证码倒计时
    userInfo: "" //用户的个人信息
  },
  // 更新输入框
  updateInput(e) {
    const type = e.target.dataset.type // 控制输入框种类

    this.setData({
      [type]: e.detail.value
    })
  },
  // 获取验证码
  async getCode() {
    // 手机号校验
    const phone = this.data.phone
    const rexp =
      /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
    const flag = rexp.test(phone)
    console.log("手机正则校验", flag)
    if (flag == false) {
      wx.showToast({
        title: "手机格式不正确",
        icon: "error",
        duration: 1500
      })
      return
    }
    // 通过手机校验，发送手机验证码
    const res = await $myRequest({
      url: "/bee/open-72810619931328627/auth/getPhoneNumberwyyx",
      data: {
        phone: this.data.phone,
        sms_type: "1"
      }
    })
    console.log("接口1验证码:", res)
    // 储存验证码并打开定时器
    this.setData({
      realCode: res.obj,
      isGetCode: true
    })

    let times = 60
    let i = setInterval(() => {
      times--
      if (times == 0) {
        this.setData({
          isGetCode: false
        })
        clearInterval(i)
      } else {
        this.setData({
          isGetCode: true,
          time: times
        })
      }
    }, 1000)
  },
  // 手机号注册/登录
  loginFn() {
    // 非空判断
    if (this.data.phone == "") {
      wx.showToast({
        title: "请填写手机号码",
        icon: "error",
        duration: 1500
      })
      return
    }
    if (this.data.code == "") {
      wx.showToast({
        title: "请填写验证码",
        icon: "error",
        duration: 1500
      })
      return
    }
    // 验证码判断
    const flag = this.data.code == this.data.realCode
    console.log(flag)
    if (flag == false) {
      wx.showToast({
        title: "验证码错误",
        icon: "error",
        duration: 1500
      })
      return
    }
    //通过验证，执行登录请求
    this.getWxCode()
  },
  // 登录按钮
  getWxCode() {
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
        this.loginPhone(code)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  //1.获取WXcode，执行登录操作
  async loginPhone(code) {
    try {
      wx.showLoading({
        title: "正在登陆...",
        mask: true
      })
      // 1. 向服务器发送登录请求
      const res = await $myRequest({
        url: "/bee/open-72810619931328627/auth/getSessionByCode",
        data: {
          code
        }
      })
      console.log("接口2:", res)
      const openid = res.data.openid
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
        // 2.如果是新用户，则请求手机号注册接口并添加用户信息
        const data = {
          openid,
          nickName: this.data.userInfo.nickName,
          gender: this.data.userInfo.gender,
          avatarUrl: this.data.userInfo.avatarUrl,
          phone: this.data.phone,
          code: this.data.realCode
        }
        console.log(data)
        const res = await $myRequest({
          method: "POST",
          url: "/bee/open-72810619931328627/auth/inPhoneRegister",
          data
        })
        console.log("接口3注册：", res)
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
    } catch (err) {
      console.log(err)
    }
  },
  // 新用户
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
  },
  onLoad() {}
})
