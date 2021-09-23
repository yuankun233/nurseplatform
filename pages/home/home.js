import { $myRequest } from "../../utils/request"
Page({
  data: {
    show: false,
    list: "",
    currentPage: 1
  },
  // 显示模态层
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  // 隐藏模态层
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  goOrderDetail() {
    // 跳转到订单详情页
    wx.navigateTo({
      url: "/pages/orderdetail/orderdetail"
    })

    // 隐藏模态层
    setTimeout(() => {
      this.hideModal()
    }, 10)
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
  }
})
