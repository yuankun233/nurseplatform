// pages/sfrz/sfrz.js
Page({
  /**
   * 页面的初始数据
   */
  data: {},

  // 返回操作
  goback() {
    wx.navigateBack({
      delta: 1
    })
  },
  // 下一页面
  jumpNext() {
    wx.navigateTo({
      url: "/pages/post_au/post_au"
    })
  }
})
