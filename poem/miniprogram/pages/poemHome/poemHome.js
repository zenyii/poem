// miniprogram/pages/poemHome/poemHome.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: '../../images/',
    moreCardShow: false,
    commendList:[
      { 
        title:"菩萨蛮·小山重叠金明灭",
        author: "北宋 | 李清照",
        poem:"小山重叠金明灭，鬓云欲渡香腮雪。"
      },
      {
        title: "秋思",
        author: "宋代|陆游",
        poem: "利欲驱人万火牛，江湖浪迹一沙鸥。"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  goDetail:function(){
    wx.redirectTo({
      url: '../poemDetail/poemDetail',
    })
  },
  moreCard: function () {//显示更多
    let that = this;
    that.setData({
      moreCardShow: true
    })
  },
  hideCard: function (e) {//隐藏更多
    let that = this;
    //console.log(e,'hideCard')
    if (e.target.id === "hideCard") {
      that.setData({
        moreCardShow: false
      })
    }
  },
  goSearch:function(){
    wx.redirectTo({
      url: '../search/search',
    })
  },
  gopoemHome:function(){
    wx.redirectTo({
      url: '../sort/sort',
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