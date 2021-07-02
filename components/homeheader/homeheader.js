// components/homeheader.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    // 返回上一页面
    back() {
      console.log('返回首页')
      wx.navigateBack({
        delta: 1,
      })
    },
  },
})
