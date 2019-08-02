// pages/show/show.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log(options)
    let page = this
    let id = options.id
    wx.request({
      url: `http://localhost:3000/api/v1/services/${id}`,
      // url: `https://tutor-app-mp.herokuapp.com/api/v1/services/${id}`,
      success: function (res) {
        console.log(res);
        const service = res.data.service;

        // Update local data
        page.setData({
          service: service
        });
      }
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  createBooking: function (e) {
    const serviceId = e.currentTarget.dataset.id
    wx.request({
      url: `http://localhost:3000/api/v1/services/${serviceId}/bookings`,
      // url: 'https://tutor-app-mp.herokuapp.com/api/v1/services/',
      method: "POST",
      data: app.globalData.userId,
      success() {
        wx.reLaunch({
          url: '/pages/profiles/profile',
        })
        console.log('success')
      }
    })
  }
})
