let ajaxNum = 0 // 记录发送ajax的次数
export const $myRequest = (params) => {
  ajaxNum++
  wx.showLoading({
    title: "加载中..."
  })
  // 定义公共的url
  const baaseUrl = "https://www.qycloud.com.cn/bee/open-75661043697254584"
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: baaseUrl + params.url,
      success: (result) => {
        resolve(result.data)
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => {
        ajaxNum--
        if (ajaxNum === 0) {
          wx.hideLoading()
        }
      }
    })
  })
}
