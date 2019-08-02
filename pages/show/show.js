// pages/show/show.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    sc: '14',
  },
  //This is for the map
  markertap(e) {
    console.log(e.markerId)
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log(options)
    let page = this
    let id = options.id
    let mk = [
      {
        iconPath: "/images/icons/home.png", // **1
        id: 0,
        latitude: 23.099994,
        longitude: 113.324520,
        width: 50,
        height: 50,
        callout: { content: "Le Wagon \n Shanghai, China", fontSize: 12, color: "#000000", padding: 10 }
      }]
    wx.request({
      url: `http://localhost:3000/api/v1/services/${id}`,
      // url: `https://tutor-app-mp.herokuapp.com/api/v1/services/${id}`,
      success: function (res) {
        const service = res.data.service;
        console.log('res.data is: ', res.data)
        console.log('mk:', mk[0])
        mk[0].latitude = service.latitude
        mk[0].longitude = service.longitude
        mk[0].callout.content = service.title
        // Update local data
        page.setData({
          service: service,
          mk: mk
        });
        console.log(page.data)
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
