// components/orderlist/btns/btns.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    btnStatus: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
  },
})
