// components/orderlist/orderlist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {

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
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
})
