// miniprogram/pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotSearch: ["李白", "苏轼", "白居易", "唐寅", "孟浩然", "慕然", "舒婷", "毛泽东", "戴望舒"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  goPoemHome:function(){
    wx.redirectTo({
      url: '../poemHome/poemHome',
    })
  },

  gosearchDetail:function(e){
    var that = this;
    let index = e.currentTarget.dataset.index;
    wx.redirectTo({
      url: '/pages/searchDetail/searchDetail?label=' + that.data.hotSearch[index],
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