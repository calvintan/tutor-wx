//app.js
App({
  onLaunch: function () {
    // const host = 'http://localhost:3000/'
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
            console.log(2019, res)
            this.globalData.userId = res.data.userId
          }
        })
      }
    })
  },
  globalData: {
  },
})
