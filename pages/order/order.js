Page({
  onShareAppMessage() {
    return {
      title: "tabs",
      path: "page/weui/example/tabs/tabs"
    }
  },
  data: {
    activeTab: 0, // 用下标控制激活的tab
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
        money: 150
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
        money: 250
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
        money: 450
      }
    ]
  },

  onLoad() {},

  onTabClick(e) {
    const index = e.detail.index
    this.setData({
      activeTab: index
    })
  },

  onChange(e) {
    const index = e.detail.index
    this.setData({
      activeTab: index
    })
  },
  handleClick(e) {
    wx.navigateTo({
      url: "./webview"
    })
  },
  // 联系客户
  calluser() {
    console.log("联系客户中~~")
  },
  // 跳转到订单详情页面
  goOrderDetail() {
    wx.navigateTo({
      url: "/pages/orderdetail/orderdetail"
    })
  },
  // 出发
  go(e) {
    console.log(e)
    console.log(this.data.btnStatus)
    this.setData({
      btnStatus: 1
    })
  },
  // 到达
  arrive() {
    wx.showModal({
      title: "是否确认到达",
      content: "确认到达后将开始服务",
      showCancel: true,
      cancelText: "取消",
      cancelColor: "#000000",
      confirmText: "确定",
      confirmColor: "#3CC51F",
      success: (result) => {
        if (result.confirm) {
          console.log("确认到达")
          // 切换到服务中
          this.setData({
            activeTab: 1
          })
          return
        }

        console.log("取消确认")
      },
      fail: () => {},
      complete: () => {}
    })
  }
})
