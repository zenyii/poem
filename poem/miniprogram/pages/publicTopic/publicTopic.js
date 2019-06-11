// miniprogram/pages/publicTopic/publicTopic.js
var util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    imgSrc: '../../images/',
    titleNum: 0,
    contentNum: 0,
    photeSrc: '',
    title: '',
    content: ''
  },

  onLoad: function (options) {

  },
  title: function (e) {
    let value = e.detail.value;
    let length = e.detail.value.length;
    this.setData({
      titleNum: length,
      title: value
    })
  },
  content: function (e) {
    let value = e.detail.value;
    let length = e.detail.value.length;
    this.setData({
      contentNum: length,
      content: value
    })
  },
  chooseImg: function () {
    let that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        const path = res.tempFilePaths[0];
        let urls = [];
        urls.push(path);
        that.setData({
          photeSrc: path,
          urls: urls
        })

      }

    })

  },

  submitForm(e) {
    let that = this;
    if (this.data.title === "") {
      wx.showToast({
        title: '话题名称不能为空！',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (this.data.content === "") {
      wx.showToast({
        title: '话题简介不能为空！',
        icon: 'none',
        duration: 2000
      })
      return
    }
    let photeSrc = this.data.photeSrc;
    if (photeSrc === "") {//没有背景图

    } else {

      //上传到云储存中
      let date = util.formatTime(new Date()).replace(/\/|\s|:/g, "");
      let dates = new Date();
      let year = dates.getFullYear();
      let mouth = dates.getMonth();
      let day = dates.getDay();
      dates = `${year}-${mouth}-${day}`;
      wx.showLoading({
        title: '上传中...',
      })

      wx.cloud.init({
        env: 'test-3bvt0'
      })
      wx.cloud.uploadFile({
        cloudPath: `images/${date}.jpg`,
        filePath: photeSrc, // 文件路径
      }).then(res => {
        // get resource ID
        console.log(res.fileID, 'file')
        /* 在数据库中插入数据 */
        app.onAdd('tearoom',
          {
            authorId: app.globalData.selfOpenId,
            authorAvatar: app.globalData.userInfo.avatarUrl,
            nickName: app.globalData.userInfo.nickName,
            date: dates,
            roommates: [{
              openid: app.globalData.selfOpenId,
              avatarUrl: app.globalData.userInfo.avatarUrl,
              nickname: app.globalData.userInfo.nickName,
            }],
            class:'茶',
            title: that.data.title,
            annotation: that.data.content,
            poem:[],
            view: 0,
            commentNum: 0,
            collectNum:0,
            collectPeopleID:[],
            showImg: res.fileID,
            commentContent:[]
          })
          .then(ress => {
           
            console.log('[数据库] [新增room记录] 成功，记录 _id: ', ress._id);
            
          }, err => {
            console.error('[数据库] [新增room记录] 失败：', err)
          })
          .then(e => {//数据发送到服务器并反馈成功后页面跳转
            wx.hideLoading();
            wx.redirectTo({
              url:'../teaRoom/teaRoom'
            })
          })
        wx.hideLoading()
      }).catch(error => {//图片上传失败
        // handle error
        wx.hideLoading()
      })
    }
  },
  deleteImg: function () {
    this.setData({
      photeSrc: ''
    })
  },

  goBack:function(){
    app.goBack();
  },


  previewImage: function () {
    let that = this;
    let src = this.data.photeSrc;
    let urls = this.data.urls;
    wx.previewImage({
      current: src,
      urls: urls
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})