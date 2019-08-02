// pages/profiles/profile.js
const app = getApp()

Page({

  // binded to delete button
  deleteService(e) {
    const data = e.currentTarget.dataset;
    console.log(getApp().globalData.userId)

    // make a DELETE request
    wx.request({
      // url: `http://localhost:3000/api/v1/services/${data.id}`,
      url: `https://tutor-app-mp.herokuapp.com/api/v1/services/${data.id}`,
      method: 'DELETE',
      success(r) {
        // redirect to index page when done
        console.log('yes', r)
      },
      fail(r) {
        console.log('no',r)
      }
    });

    return wx.reLaunch({
      url: '/pages/profiles/profile',
    })
  },

  deletebooking(e) {
    let page = this
    const data = e.currentTarget;
    // this.data.service.show = true
    console.log('service', e.currentTarget.dataset)
    e.currentTarget.dataset.service.show = true
    console.log('service', e.currentTarget.dataset.service)
    console.log("e", e.currentTarget)
    // console.log('booking',e)
    wx.request({
      // url: `http://localhost:3000/api/v1/services/${e.currentTarget.dataset.serviceid}`,
      url: `https://tutor-app-mp.herokuapp.com/api/v1/services/${e.currentTarget.dataset.serviceid}`,
      method: "PUT",
      data: e.currentTarget.dataset.service
    })
    // make a DELETE request
    wx.request({
      // url: `http://localhost:3000/api/v1/services/${e.currentTarget.dataset.serviceid}/bookings/${e.currentTarget.dataset.id}`,
      url: `https://tutor-app-mp.herokuapp.com/api/v1/services/${e.currentTarget.dataset.serviceid}/bookings/${e.currentTarget.dataset.id}`,
      method: 'DELETE',
      success(r) {
        // redirect to index page when done
        console.log('yes', r)
      },
      fail(r) {
        console.log('no', r)
      }
    });

    return wx.redirectTo({
      url: '/pages/success/success',
    })
  },
  //binding to edit
  editService: function(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/edit/edit?id=${id}`,
    })
  },

  /**
   * Page initial data
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onChange(e) {
    console.log('onChange', e)
    this.setData({
      current: e.detail.key,
    })
    console.log('current:', e.detail.key)
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    // console.log('app', app.globalData)
    let page = this
    // console.log(options)
    // wx.request({
    //   url: `http://localhost:3000/api/v1/users/${app.globalData.userId}`,
    //   // url: `https://tutor-app-mp.herokuapp.com/api/v1/services/${id}`,
    //   success: function (res) {
    //     console.log("services", res.data.services);
    //     const services = res.data.services;

    //     // Update local data
    //     page.setData({
    //       services: services,
    //       bookings: bookings
    //     });
    //   }
    // })
    if (app.globalData.userId) {
      // this.setData({
      //   userInfo: app.globalData.userInfo,
      //   hasUserInfo: true
      // })
      wx.request({
        // url: `http://localhost:3000/api/v1/users/${app.globalData.userId}`,
        url: `https://tutor-app-mp.herokuapp.com/api/v1/users/${app.globalData.userId}`,
        success: function (res) {
          console.log("services", res.data.services);
          const services = res.data.services;
          const bookings = res.data.bookings;
          // Update local data
          page.setData({
            services: services,
            bookings: bookings
          });
        }
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        }),
        wx.request({
          // url: `http://localhost:3000/api/v1/services/${id}`,
          url: `https://tutor-app-mp.herokuapp.com/api/v1/services/${id}`,
          success: function (res) {
            console.log(res.data.service);
            const service = res.data.service;

            // Update local data
            page.setData({
              service: service
            });
          }
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
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
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
