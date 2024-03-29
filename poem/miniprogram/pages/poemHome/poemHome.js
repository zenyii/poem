// miniprogram/pages/poemHome/poemHome.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: '../../images/',
    moreCardShow: false,
    commendList:[],
    lastPages:1,           //上一页面标识，默认0,1为poemHome，2为searchDetail
    userInfo:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    const db = wx.cloud.database();
    db.collection("Commend").limit(3).get().then(res=>{
      that.setData({
        commendList:res.data,
        userInfo:app.globalData.userInfo
      })
    })
  },
  goDetail:function(e){
    let index = e.currentTarget.dataset.id;
    wx.redirectTo({
      url: '../poemDetail/poemDetail?title=' + this.data.commendList[index].title + '&lastPages=' + this.data.lastPages,
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
  myCollect:function(){
    wx.redirectTo({
      url: '../myCollect/myCollect',
    })
  },
  chaZhai:function(){
    wx.redirectTo({
      url: '../homepage/homepage',
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