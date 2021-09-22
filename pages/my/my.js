// pages/my/my.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user: null, //用户信息
    isLogin: false //用户登录状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取用户相关个人信息
    this.getUser()
  },
  // 跳转待结算
  towaitclose() {
    wx.navigateTo({
      url: "/pages/waitclose/waitclose",
      success: (result) => {},
      fail: () => {},
      complete: () => {}
    })
  },
  // 跳转资格认证
  tozgrz() {
    wx.navigateTo({
      url: "/pages/zgrz/zgrz",
      success: (result) => {},
      fail: () => {},
      complete: () => {}
    })
  },
  // 获取用户缓存
  getUser() {
    try {
      let user = wx.getStorageSync("user")
      if (user) {
        // 储存用户信息，并把登录状态该为true
        this.setData({
          user,
          isLogin: true
        })
      }
    } catch (e) {
      // Do something when catch error
    }
  },
  // 跳转登录界面
  toLogin() {
    if (this.data.isLogin == false) {
      wx.navigateTo({
        url: "/pages/login/login"
      })
    }
  }
})
