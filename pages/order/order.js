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
    orderList: "",
    currentPage: 1,
    orderStatus: "待服务", //用来请求不同状态列表
    attendId: "", //护士id
    btnStatus: 1
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
    // 1 清除页面上个状态的订单数据
    this.setData({
      orderList: []
    })
    const index = e.detail.index
    let orderStatus
    // 2 当下标为0，订单状态设为相应的状态
    if (index == 0) {
      orderStatus = "待服务"
    }
    if (index == 1) {
      orderStatus = "服务中"
    }
    if (index == 2) {
      orderStatus = "已完成"
    }
    // 3 设置页面对应的data状态
    this.setData({
      activeTab: index,
      orderStatus
    })
    // 4 获取新的orderList数据
    this.getOrderList()
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
    // 如果请求的页码大于1，则用展开运算符追加订单列表
    if (this.data.currentPage > 1) {
      let list = this.data.orderList // 获取当前订单列表
      list.push(...res.data.selectOrder.data) // 追加请求的订单数据
      // 更新data
      this.setData({
        orderList: list
      })
      return
    }

    // 更新data
    this.setData({
      orderList: res.data.selectOrder.data
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
    //清除原有列表数据
    this.setData({
      orderList: []
    })
    //刷新列表
    this.getOrderList()
    //取消页面的下拉刷新状态
    wx.stopPullDownRefresh()
  },
  // 出发
  go(e) {
    console.log(e)
    console.log(this.data.btnStatus)
    this.setData({
      btnStatus: 1
    })
  },
  // 到达，将订单状态变为服务中
  async arrive(e) {
    wx.showModal({
      title: "提示",
      content: "是否接单",
      async success(res) {
        if (res.confirm) {
          console.log("用户点击确定")
          let orderID = e.currentTarget.dataset.orderid
          console.log("订单ID：", orderID)
          const res = await $myRequest({
            url: "/xhll/order/inServiceOrder",
            method: "POST",
            data: {
              orderID
            }
          })
          console.log(res)
        } else if (res.cancel) {
          console.log("用户点击取消")
        }
      }
    })
  },
  // 联系客户
  calluser(e) {
    console.log("联系客户中~~")
    let telNum = e.currentTarget.dataset.telnum
    console.log(telNum)
    wx.makePhoneCall({
      phoneNumber: telNum,
      success: (result) => {},
      fail: () => {},
      complete: () => {}
    })
  }
})
