// pages/my/my.js
Page({
  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},
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
  }
})
