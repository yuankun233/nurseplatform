Page({
  onShareAppMessage() {
    return {
      title: "tabs",
      path: "page/weui/example/tabs/tabs",
    }
  },
  data: {
    btnStatus: 0,
    tabs: [
      {
        title: "待服务",
        status: false,
        name: "张先生",
        type: "静脉采血(单次)",
        hcb: true,
        servedate: "6-11",
        servetime: "13:00-16:00",
        msg: "需要带压脉带以及酒精棉",
        adress: "上海市闵行区",
        money: 150,
      },
      {
        title: "服务中",
        status: true,
        name: "李先生",
        type: "陪伴护理",
        hcb: false,
        servedate: "6-12",
        servetime: "15:00-16:00",
        msg: "需要护士跟随",
        adress: "上海市松江区",
        money: 250,
      },
      {
        title: "已服务",
        status: false,
        name: "董女士",
        type: "上门服务",
        hcb: false,
        servedate: "6-15",
        servetime: "10:00-16:00",
        msg: "需要带压脉带",
        adress: "上海市浦东新区",
        money: 450,
      },
    ],
    activeTab: 0,
  },

  onLoad() {},

  onTabClick(e) {
    const index = e.detail.index
    this.setData({
      activeTab: index,
    })
  },

  onChange(e) {
    const index = e.detail.index
    this.setData({
      activeTab: index,
    })
  },
  handleClick(e) {
    wx.navigateTo({
      url: "./webview",
    })
  },
  // 联系客户
  calluser() {
    console.log("联系客户中~~")
  },
  // 跳转到订单详情
  goOrderDetail() {
    // 跳转到订单详情页
    wx.navigateTo({
      url: "/pages/orderdetail/orderdetail",
    })
  },
  // 出发
  go() {
    console.log(this.data.btnStatus)
    this.setData({
      btnStatus: 1,
    })
  },
})
