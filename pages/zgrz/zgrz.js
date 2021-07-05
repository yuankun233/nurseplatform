// pages/zgrz/zgrz.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    date: "2018-12-25", //时间选择
    nowdate: ""
  },
  onload() {},
  // 选择日期
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  // 返回操作
  goback() {
    wx.navigateBack({
      delta: 1
    })
  },
  // 下一步
  next() {
    wx.navigateTo({
      url: "/pages/sfrz/sfrz"
    })
  }
})
