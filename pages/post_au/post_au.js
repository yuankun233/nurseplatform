// pages/post_au/post_au.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    rzlist: [
      {
        Image: "../../assets/zslogoOne.png",
        name: "护士认证",
        introduce: "上传个人从业经历及国家资格证书",
        xgdata: "待认证"
      },
      {
        Image: "../../assets/zslogoTwo.png",
        name: "护理员认证",
        introduce: "上传个人从业经历及国家资格证书",
        xgdata: "待认证"
      },
      {
        Image: "../../assets/zslogoThree.png",
        name: "康复师认证",
        introduce: "上传个人从业经历及国家资格证书",
        xgdata: "待认证"
      },
      {
        Image: "../../assets/zslogoFour.png",
        name: "药剂师认证",
        introduce: "上传个人从业经历及国家资格证书",
        xgdata: "待认证"
      }
    ],
    xggdata: ""
  },
  goback() {
    wx.navigateBack({
      delta: 1
    })
  },
  // 通过index设置跳转页面
  Jump: function (e) {
    let id = e.currentTarget.dataset.id
    // console.log(id)
    if (id == 0) {
      wx.navigateTo({
        url: "../nurse_au/nurse_au"
      })
    }
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
