//app.js
App({
  onLaunch: function () {
    const host = 'https://tutor-app-mp.herokuapp.com/'
    console.log('beginning login')
    wx.login({
      success: (res) => {
        console.log(res)
        wx.request({
          url: host + 'login',
          method: 'post',
          data: {
            code: res.code
          },
          success: (res) => {
            console.log(res)
            this.globalData.userId = res.data.userId
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
