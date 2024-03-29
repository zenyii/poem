// pages/login.js
const app = getApp();
Page({
  data: {
    code: '',
    redirect_url: ''
  },
  handleLogin(res) {
    let data = res.detail;
    let userInfo = {};
    userInfo.avatarUrl = data.userInfo.avatarUrl;
    userInfo.nickName=data.userInfo.nickName;
    app.globalData.userInfo = userInfo;//全局储存用户信息
    let that = this;
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      loading: true,
    })
     // 调用云函数
     wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        //console.log('[云函数] [login] user openid: ', res.result.openid)
        //console.log(userInfo,'userInfo')
        app.globalData.selfOpenId = res.result.openid;
        wx.setStorageSync('userInfo', userInfo);//本地缓存用户信息
        wx.setStorageSync('selfOpenId', res.result.openid);
        wx.hideLoading();
        that.setData({
          loading: false
        });

        console.log(that.data.redirect_url,'url')

        if (that.data.redirect_url) {
          //console.log('重定向！')
          wx.reLaunch({
            url: that.data.redirect_url
          })
        } else {
          //console.log('没有来源，默认index1')
          wx.reLaunch({
            url: 'pages/homepage/homepage'///!!!!
          })
        }
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        
      }
    })

  },
  onLoad: function (options) {
    let that = this;
    this.setData({
      redirect_url: decodeURIComponent(options.redirect_url)
    })
    wx.login({//登录并获取code
      success: function (res) {
        if (res.code) {
          that.setData({
            code: res.code
          })
        }
      }
    })
  },

})