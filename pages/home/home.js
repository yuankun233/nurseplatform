Page({
  data: {
    show: false,
  },
  // 显示模态层
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target,
    })
  },
  // 隐藏模态层
  hideModal(e) {
    this.setData({
      modalName: null,
    })
  },
  goOrderDetail() {
    // 跳转到订单详情页
    wx.navigateTo({
      url: "/pages/orderdetail/orderdetail",
    })

    // 隐藏模态层
    setTimeout(() => {
      this.hideModal()
    }, 100)
  },
  // 前往搜索页
  goSearch() {
    // 跳转到订单详情页
    wx.navigateTo({
      url: "/pages/search/search",
    })
  },
})
