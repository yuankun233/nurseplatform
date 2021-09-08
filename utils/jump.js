export const jump = () =>{
  return new Promise((res,rej) =>{
    wx.getStorage({
      key: 'user',
      success(){
        res('成功')
      },
      fail(res) {
        wx.showToast({
          title: '请先登录',
          icon: 'none',
          duration: 1000,
        });
        setTimeout(function () {
          console.log('doSomething');
          wx.reLaunch({
            url: '/pages/login/login',
          });
        }, 1000);
        rej('error666');
      },
    });
  })
}