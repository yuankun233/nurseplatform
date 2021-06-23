Page({
  onShareAppMessage() {
    return {
      title: "tabs",
      path: "page/weui/example/tabs/tabs"
    }
  },
  data: {
    tabs: [],
    activeTab: 0
  },

  onLoad() {
    const tabs = [
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
    const tabs2 = [
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
    const tabs3 =[
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
        list:[
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
      }
    ]
    const title=[
     {
       title:'待服务',
       name:'小明',
       list:[
         {
           name:'我是小明'
         },
         {
          name:'我是小王'
        },
        {
          name:'我是小明'
        }
       ]
     },
     {
      title:'服务中',
      name:'小红',
      list:[
        {
          name:'我是小红'
        }
      ]
    },
    {
      title:'已服务',
      name:'小李',
      list:[
        {
          name:'我是小李'
        }
      ]
    }
      
    ]
    this.setData({ tabs })
    this.setData({ tabs3 }) 
    this.setData({ title }) 
  },

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
  // 跳转到详情页
  goorderdetail(){
    wx.navigateTo({
      url:'/pages/orderdetail/orderdetail'
    })
  }
})
