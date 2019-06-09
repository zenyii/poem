// miniprogram/pages/poemDetail/poemDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isMain:true,
    isNote:false,
    isTrans: false,
    isAppr: false,
    isAut: false,
    left:120,
    top:20,
    poemDetail:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    const db = wx.cloud.database();
    db.collection("poemDetail").where({
      title: options.title
    }).get().then(res=>{
      that.setData({
        poemDetail: res.data[0]
      })
    })
  },
  goMain:function(){
    this.setData({
      left:120,
      isMain:true,
      isNote: false,
      isTrans: false,
      isAppr: false,
      isAut: false,
    })
  },

  goNote:function(){
    this.setData({
      left:255,
      isMain: false,
      isNote: true,
      isTrans: false,
      isAppr: false,
      isAut: false,
    })
  },
  goTran:function(){
    this.setData({
      left: 385,
      isMain: false,
      isNote: false,
      isTrans: true,
      isAppr: false,
      isAut: false,
    })
  },
  goAppr:function(){
    this.setData({
      left: 515,
      isMain: false,
      isNote: false,
      isTrans: false,
      isAppr: true,
      isAut: false,
    })
  },

  goAut:function(){
    this.setData({
      left: 650,
      isMain: false,
      isNote: false,
      isTrans: false,
      isAppr: false,
      isAut: true,
    })
  },
  goHome:function(){
    wx.redirectTo({
      url: '../poemHome/poemHome',
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