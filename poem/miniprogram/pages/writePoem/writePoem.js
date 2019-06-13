// miniprogram/pages/writePoem/writePoem.js
var app = getApp()
import util from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TopUrl: '',
    poemName: '',
    poemIntro: '',
    tempFilePaths: 'cloud://test-3bvt0.7465-test-3bvt0/images/poemBack.png',
    userInfo: null,
    poemCon: '',
    poemList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },

  poemName: function (e) {
    this.setData({
      poemName: e.detail.value
    })
  },

  gocreatPoem: function () {
    wx.showToast({
      title: '已发布',
    })
    wx.redirectTo({
      url: '../createPoemList/createPoemList',
    })
  },

  inputIntro: function (e) {
    this.setData({
      poemIntro: e.detail.value
    })
  },

  inputCon: function (e) {
    this.setData({
      poemCon: e.detail.value
    })
  },

  chooseImage: function () {
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9 
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有 
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有 
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
        let date = util.formatTime(new Date()).replace(/\/|\s|:/g, "");
        let photeSrc = res.tempFilePaths[0];
        console.log(photeSrc);
        wx.showLoading({
          title: '上传中...',
        })

        wx.cloud.init({
          env: 'test-cf0c34'
        })
        wx.cloud.uploadFile({
          cloudPath: `images/${date}.jpg`,
          filePath: photeSrc, // 文件路径
        }).then(res => {
          console.log(res.fileID);
          _this.setData({
            tempFilePaths: res.fileID
          })
          wx.hideLoading();
        })
      }
    })
  },

  publish: function () {
    var that = this;
    let a = this.data;
    let poemConArr = this.data.poemCon.split("\n");
    console.log(poemConArr);
    if (a.poemName && a.poemIntro && a.poemCon && a.tempFilePaths) {
      const db = wx.cloud.database();
      db.collection("poemCon").add({
        data: {
          authorAvatar:app.globalData.userInfo.avatarUrl,
          class:'诗',
          collectedPeopleID:[],
          commentNum:0,
          showImg:'',
          poemName: that.data.poemName,          //诗名
          poemIntro: that.data.poemIntro,         //诗简介
          poemCon: poemConArr,                   //诗内容
          nickName: that.data.userInfo.nickName,  //作者昵称
          tempFilePaths: that.data.tempFilePaths, //封面链接
          like: 0,                                //点赞数
          comment: 0                              //评论数
        }
      })
      db.collection("poemList").add({
        data: {
          poemName: that.data.poemName,
          nickName: that.data.userInfo.nickName,
          tempFilePaths: that.data.tempFilePaths
        }
      })
      wx.redirectTo({
        url: '../createPoemList/createPoemList',
      })
    }
    else {
      wx.showToast({
        title: '请填写所有信息噢~',
      })
    }

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