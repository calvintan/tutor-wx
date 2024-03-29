// pages/category/category.js
Page({

  /**
   * Page initial data
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log("options: ", options)
    let page = this;

    wx.request({
      url: `https://tutor-app-mp.herokuapp.com/api/v1/services/?category=${options.cat}`,
      // url: `http://localhost:3000/api/v1/services/?category=${options.cat}`,
      success: function(res) {
        console.log("response.data", res.data);
        const services = res.data;

        // Update local data
        page.setData({
          category: options.cat,
          services: services
        });
      }
    });
  },

  goToShow: function (event) {
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/show/show?id=${id}`,
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

  }
})
