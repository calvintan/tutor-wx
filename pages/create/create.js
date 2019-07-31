// pages/create/create.js
const date = new Date()
const months = []
const days = []

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}

Page({

  /**
   * Page initial data
   */
  data: {
    items: [
      {name: "beginner", value:"beginner"},
      {name:"intermediate", value:"intermediate"},
      {name:"master", value:"master"}
    ],
    years: [date.getFullYear()],
    year: date.getFullYear(),
    months: months,
    month: 1,
    days: days,
    day: 1,
    value: []
  },

  bindChange: function (e) {
    const val = e.detail.value
    console.log("month", this.data.month)
    this.setData({
      year: date.getFullYear(),
      month: this.data.months[val[1]],
      day: this.data.days[val[2]],
    })
  },

  radioChange: function (e) {
    console.log('a change event occurred on radio; carry value is: ', e.detail.value)
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
    console.log(e)
    let title = e.detail.value.title
    let description = e.detail.value.description
    let difficulty = e.detail.value.difficulty
    let location = e.detail.value.location
    let saved_date = [this.data.year, this.data.month, this.data.day]
    if ((saved_date[1] < date.getMonth() + 1) || (saved_date[1] == date.getMonth() + 1 && saved_date[2] < date.getDate()) || [...Array(25).keys()].includes(Number(e.detail.value.time_start))==false ) {
      wx.showModal({
        title: 'Spam Alert',
        content: 'Time is invalid!',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return wx.reLaunch({
        url: '/pages/create/create',
      })
    }
    let event = { name: title, description: description, location: location, difficulty: difficulty, time: new Date(this.data.year, this.data.month - 1, this.data.day, Number(e.detail.value.time_start)) }
    console.log("event",event)
    wx.request({
      url: 'http://localhost:3000/api/v1/stories/new',
      method: "POST",
      data: event,
      success() {
        wx.redirectTo({
          url: '/pages/profiles/profile',
        })
        console.log('success')
      }
    })
  },
  formReset: function () {
    console.log('form has encountered a reset event')
  }
})