// pages/create/create.js
import { $wuxSelect } from '../../dist/index'

const app = getApp()
const date = new Date()
const years = []
const months = []
const days = []
const times = []

for (let i = date.getFullYear() ; i <= date.getFullYear() + 3; i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1 ; i <= 31; i++) {
  days.push(i)
}

for (let i = 0; i <= 24; i++) {
  times.push(i)
}

Page({

  /**
   * Page initial data
   */
  data: {
    value1: '',
    title1: '',
    category: [
      { name: "chinese", value: "chinese" },
      { name: "english", value: "english" },
      { name: "math", value: "math" },
      { name: "coding", value: "coding" },
      { name: "korean", value: "korean" },
      { name: "science", value: "science" },
    ],
    difficulty: [
      { name: "beginner", value: "beginner" },
      { name: "intermediate", value: "intermediate" },
      { name: "master", value: "master" }
    ],
    years: years,
    year: date.getFullYear(),
    months: months, default: 8,
    month: date.getMonth() + 1,
    days: days,
    day: date.getDate(),
    times: times,
    time: date.getHours(),
    value: []
  },
  onClick1() {
    $wuxSelect('#wux-select1').open({
      value: this.data.value1,
      options: ["chinese", "english", "math", "coding", "korean", "science"],
      onConfirm: (value, index, options) => {
        console.log('onConfirm', value, index, options)
        if (index !== -1) {
          this.setData({
            value1: value,
            title1: options[index],
          })
        }
      },
    })
  },
  bindChange: function (e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]],
      time: this.data.times[val[3]]
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
    wx.authorize({
      scope: 'scope.userInfo',
      success: res => {
        console.log('res', res)
        wx.getUserInfo({
          success: function (res) {
            var userInfo = res.userInfo
            var nickName = userInfo.nickName
            var avatarUrl = userInfo.avatarUrl
            var gender = userInfo.gender //性别 0：未知、1：男、2：女
            var province = userInfo.province
            var city = userInfo.city
            var country = userInfo.country
            console.log(nickName)
          }
        })
      },
      fail: f => {
        console.log('f',f)
      }
    })

    console.log('scope',this.scope)
    let title = e.detail.value.title
    let description = e.detail.value.description
    let category = e.detail.value.category
    let difficulty = e.detail.value.difficulty
    let location = e.detail.value.location
    let saved_date = [this.data.year, this.data.month, this.data.day]
    if ((saved_date[1] < date.getMonth() + 1) || (saved_date[1] == date.getMonth() + 1 && saved_date[2] < date.getDate())) {
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
    let event = { title: title, user_id: getApp().globalData.userId, description: description, category: category, description: description, location: location, difficulty: difficulty, time: new Date(this.data.year, this.data.month - 1, this.data.day, this.data.time)}
    console.log("event",event)
    wx.request({
      url: 'http://localhost:3000/api/v1/services/',
      // url: 'https://tutor-app-mp.herokuapp.com/api/v1/services/',
      method: "POST",
      data: event,
      success() {
        wx.reLaunch({
          url: '/pages/profiles/profile',
        })
        console.log('success')
      }
    })
  },

  formReset: function () {
    console.log('form has encountered a reset event')
  },
})

