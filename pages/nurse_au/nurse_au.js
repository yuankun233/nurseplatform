// pages/post_attestation/post_attestation.js
Page({
  /**
   * 页面的初始数据
   */
  data: {},
  goback() {
    // var pages = getCurrentPages();
    // var currentPage = pages[pages.length-1];//获取当前页面
    // var prevPage = pages[pages.length-2];//获取上一个页面
    // console.log(prevPage.data.rzlist[0].xgdata);
    // // 修改数据状态为已认证
    // prevPage.setData({
    //   'rzlist[0].xgdata':"已认证"
    // })
    // 跳转上个页面
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
})
