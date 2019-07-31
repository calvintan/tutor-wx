// pages/create/create.js
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
  formSubmit: function (e) {
    let story_name = e.detail.value.name
    let story_text = e.detail.value.description
    let story = { name: story_name, text: story_text }
    console.log(story)
    wx.request({
      url: 'http://localhost:3000/api/v1/stories/new',
      method: "POST",
      data: story,
      success() {
        wx.redirectTo({
          url: '/pages/profiles/profile',
        })
        console.log('success')
      }
    })
    // console.log('form has encountered a submit event. The carried value is: ', e.detail.value)
    // app.globalData.dogs.push({ source: e.detail.value.url, name: e.detail.value.name, description: e.detail.value.description, })
    // console.log(app.globalData.dogs)
  },
  formReset: function () {
    console.log('form has encountered a reset event')
  }
})