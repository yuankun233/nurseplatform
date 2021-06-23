Page({
  data: {
    items: [
      {
        data: "2021年6月16日",
        orderlist: [
          {
            title: "输液港术后护理",
            order: "4009633521453652",
            price: "132.3",
            checked: false
          },
          {
            title: "PICC导管术后维护",
            order: "4009633521453652",
            price: "13393.3 ",
            checked: true
          }
        ]
      },
      {
        data: "2021年6月15日",
        orderlist: [
          {
            title: "输液港术后护理",
            order: "4009633521453652",
            price: "13393.3 ",
            checked: false
          },
          {
            title: "PICC导管术后维护",
            order: "4009633521453652",
            price: "352.2",
            checked: true
          }
        ]
      },
      {
        data: "2021年6月15日",
        orderlist: [
          {
            title: "输液港术后护理",
            order: "4009633521453652",
            price: "13393.3 ",
            checked: false
          },
          {
            title: "PICC导管术后维护",
            order: "4009633521453652",
            price: "352.2",
            checked: true
          }
        ]
      },
      {
        data: "2021年6月15日",
        orderlist: [
          {
            title: "输液港术后护理",
            order: "4009633521453652",
            price: "13393.3 ",
            checked: false
          },
          {
            title: "PICC导管术后维护",
            order: "4009633521453652",
            price: "352.2",
            checked: true
          }
        ]
      }
    ],
    allcheck: false
  },
  //多选
  userCheck: function (e) {
    console.log(e.currentTarget.dataset)
    const index0 = e.currentTarget.dataset.index0 //获取一级索引
    const index = e.currentTarget.dataset.index //获取二级索引
    const items = this.data.items //获取原列表数组
    items[index0].orderlist[index].checked =
      !items[index0].orderlist[index].checked //修改选中状态
    this.setData({ items: items }) //重新设置data
  },
  // 全选
  allcheck() {
    let allcheck = this.data.allcheck
    allcheck = !allcheck
    const items = this.data.items // 获取源列表数组
    items.forEach((item0) => {
      item0.orderlist.forEach((item1) => {
        item1.checked = allcheck
      })
    })
    this.setData({
      allcheck: allcheck,
      items: items
    })
  },
  // 返回操作
  goback() {
    wx.switchTab({
      url: "/pages/my/my"
    })
  }
})
