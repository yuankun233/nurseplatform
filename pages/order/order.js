import { $myRequest } from "../../utils/request" // 引入ajax工具
import { getUser } from "../../utils/getUser" // 引入验证获取user工具
Page({
  onShareAppMessage() {
    return {
      title: "tabs",
      path: "page/weui/example/tabs/tabs"
    }
  },
  data: {
    activeTab: 0, // 用下标控制激活的tab 0:待服务，1:服务中，2：已服务
    orderList: [],
    currentPage: 1,
    orderStatus: "待服务", //用来请求不同状态列表
    attendId: "", //护士id
    btnStatus: 0
  },

  onLoad() {
    // 获取本地缓存
    const user = wx.getStorageSync("user")
    console.log(user)
    this.setData({
      attendId: user.attendId
    })
    // 获取订单列表
    this.getOrderList()
  },
  //当切换订单状态时，订单列表重新获取
  changeOrderList(e) {
    console.log("orderlist变化")
    const index = e.detail.index
    let orderStatus
    // 当下标为0，订单状态设为相应的状态
    if (index == 0) {
      orderStatus = "待服务"
    }
    if (index == 1) {
      orderStatus = "服务中"
    }
    if (index == 2) {
      orderStatus = "待评价"
    }
    this.setData({
      activeTab: index,
      orderStatus
    })
  },

  // 跳转到订单详情页面
  goOrderDetail() {
    wx.navigateTo({
      url: "/pages/orderdetail/orderdetail"
    })
  },

  // 请求订单列表
  async getOrderList() {
    // 1. 向服务器请求订单
    const data = {
      attendId: this.data.attendId,
      orderStatus: this.data.orderStatus,
      currentPage: this.data.currentPage
    }
    console.log(data)
    const res = await $myRequest({
      url: "/xhll/order/selectOrder",
      method: "POST",
      data
    })
    console.log("请求订单列表：", res)
    let list = this.data.orderList // 获取当前订单列表
    list.push(...res.data.selectOrder.data) // 追加请求的订单数据
    // 更新data
    this.setData({
      orderList: list
    })
  },
  // 列表触底获取下一页
  onReachBottom() {
    console.log("页面触底了!!")
    //页码+1
    this.setData({
      currentPage: this.data.currentPage + 1
    })
    // 获取下一页订单
    this.getOrderList()
  },
  //开启下拉刷新
  onPullDownRefresh: function () {
    this.getOrderList()
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
  },
  // 联系客户
  calluser() {
    console.log("联系客户中~~")
  }
})
