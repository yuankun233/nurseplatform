// pages/search/search.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    date: "",
    timeSelectShow: false
  },
  back() {
    console.log("返回首页")
    wx.navigateBack({
      delta: 1
    })
  },
  // 日历弹出层
  showPopup() {
    this.setData({ timeSelectShow: true })
  },

  onClose() {
    this.setData({ timeSelectShow: false })
  }
})
