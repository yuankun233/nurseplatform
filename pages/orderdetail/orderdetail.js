// pages/orderdetail/orderdetail.js
import { $myRequest } from "../../utils/request" // 引入ajax工具
Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderDetail: ""
  },
  back() {
    wx.navigateBack({
      delta: 1
    })
  },

  onLoad(options) {
    console.log("订单详情号:", options.orderid)
    this.getOrderDetail(options.orderid)
  },
  // 获取id对应的订单详情
  async getOrderDetail(id) {
    // 请求订单信息
    const res = await $myRequest({
      url: "/xhll/order/ordercqDetails",
      method: "POST",
      data: {
        orderId: id
      }
    })
    console.log(res)
    // 储存到data
    this.setData({
      orderDetail: res.data.ordercqDetails
    })
  }
})
