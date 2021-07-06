// pages/search/search.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    date: "",
    // 按钮模式
    btnStatus: "am"
  },
  back() {
    console.log("返回首页")
    wx.navigateBack({
      delta: 1
    })
  },
  // 选择时间按钮切换
  switchBtn(e) {
    console.log(e.currentTarget.dataset)
    this.setData({
      btnStatus: e.currentTarget.dataset.time
    })
  },
  onLoad(options) {
    // 根据传入模式显示对应的搜索模式
    this.setData({
      searchStatus: options.searchStatus
    })
  },
  switchSearch(e) {
    this.setData({
      searchStatus: e.currentTarget.dataset.mode
    })
  }
})
