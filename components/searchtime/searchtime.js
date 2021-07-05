// components/searchtime/searchtime.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    date: "",
    show: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onDisplay() {
      this.setData({ show: true })
    },
    onClose() {
      this.setData({ show: false })
    },
    formatDate(date) {
      date = new Date(date)
      return `${date.getMonth() + 1}/${date.getDate()}`
    },
    onConfirm(event) {
      this.setData({
        show: false,
        date: this.formatDate(event.detail),
      })
    },
  },
})
