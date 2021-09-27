import { $myRequest } from "../../utils/request"
Page({
  data: {
    show: false,
    list: "",
    currentPage: 1,
    attendId: "", //护士id
    isLogin: false,
    currentRobid: "" // 当前抢单成功订单id(orderid，不是id)
  },
  // 显示模态层
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  // 隐藏模态层
  hideModal(e) {
    console.log("hidemodal and onload page~~")
    //隐藏模态框,重置数据,并刷新页面
    this.setData({
      show: null,
      list: "",
      currentPage: 1
    })
    this.onLoad() //刷新页面
  },
  // 隐藏模态层并自跳转
  goOrderDetail() {
    // 跳转到订单详情页

    const orderid = this.data.currentRobid
    wx.navigateTo({
      url: "/pages/orderdetail/orderdetail?orderid=" + orderid
    })

    // 隐藏模态层
    setTimeout(() => {
      this.hideModal()
    }, 500)
    // 刷新界面
  },
  // 前往搜索页
  goSearch(e) {
    let mode = e.currentTarget.dataset.mode
    // 跳转到搜索页面
    wx.navigateTo({
      url: `/pages/search/search?searchStatus=${mode}`
    })
  },
  // 获取抢单列表
  async getWaitOrder() {
    try {
      let res = await $myRequest({
        url: "/xhll/order/waitServiceOrder",
        method: "POST",
        data: {
          currentPage: this.data.currentPage
        }
      })
      console.log("抢单池订单列表:", res)
      // 如果请求的页码大于1，则用展开运算符追加订单列表
      if (this.data.currentPage > 1) {
        let list = this.data.list // 获取当前订单列表
        list.push(...res.data.waitServiceOrder.data) // 追加请求的订单数据
        // 更新data
        this.setData({
          list
        })
        return
      }

      // 将抢单池列表存到data
      this.setData({
        list: res.data.waitServiceOrder.data
      })
    } catch (err) {}
  },
  async robOrder(e) {
    console.log("抢单id:", e.currentTarget.dataset.orderid)
    let id = e.currentTarget.dataset.id
    let orderId = e.currentTarget.dataset.orderid // 获取当前orderid，为了抢单成功跳转订单详情
    // 如果未登录，则弹窗提醒是否跳转登录
    if (this.data.isLogin == false) {
      wx.showModal({
        title: "您还未登录，无法使用抢单功能",
        content: "是否跳转至登录页?",
        showCancel: true,
        cancelText: "取消",
        cancelColor: "#000000",
        confirmText: "确定",
        confirmColor: "#3CC51F",
        success: (result) => {
          // 用户点击确认
          if (result.confirm) {
            wx.navigateTo({
              url: "/pages/login/login"
            })
          }
        },
        fail: () => {},
        complete: () => {}
      })
      return
    }
    //已登录，正常发送抢单请求
    if (this.data.isLogin) {
      try {
        let data = {
          attendId: this.data.attendId,
          id
        }
        let res = await $myRequest({
          url: "/xhll/order/pickOrder",
          method: "POST",
          data
        })
        console.log(res)
        // 抢单成功
        if (res.data.selectStatus) {
          // 弹出弹出框
          this.setData({
            show: true,
            currentRobid: orderId
          })
          return
        }
        // 抢单失败，给予提示并刷新页面
        if (res.data.selectStatus == false) {
          wx.showToast({
            title: "抢单失败",
            icon: "none",
            duration: 1500,
            mask: false,
            success: (result) => {
              this.onLoad() //刷新页面
            }
          })

          return
        }
      } catch (err) {}
      return
    }
  },
  // 列表触底获取下一页抢单订单
  onReachBottom() {
    console.log("页面触底了!!")
    //页码+1
    this.setData({
      currentPage: this.data.currentPage + 1
    })
    // 获取下一页订单
    this.getWaitOrder()
  },
  onLoad() {
    // 获取抢单列表
    this.getWaitOrder()

    try {
      // 获取本地缓存
      const user = wx.getStorageSync("user")
      // 如果获取成功，则已登录,请求订单数据
      if (user) {
        console.log(user)
        this.setData({
          attendId: user.attendId,
          isLogin: true
        })
        // 获取订单列表
        // this.getOrderList()
        return
      }
    } catch (e) {
      // Do something when catch error
    }
  }
})
