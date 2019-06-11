// miniprogram/pages/sort/sort.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lebel:["近现代","毛泽东","咏物"],
    kind: [
      { class: "朝代", url: "cloud://test-cf0c34.7465-test-cf0c34/images/sort1.png" },
      { class: "作者", url: "cloud://test-cf0c34.7465-test-cf0c34/images/sort2.png" }, 
      { class: "类型", url: "cloud://test-cf0c34.7465-test-cf0c34/images/sort3.png" },
      { class: "诗集", url: "cloud://test-cf0c34.7465-test-cf0c34/images/sort4.png"},
    ]
  },
  onLoad: function (options) {

  },
  gopoemHome:function(){
    wx.redirectTo({
      url: '../poemHome/poemHome',
    })
  },

  goSorted:function(){
    wx.redirectTo({
      url: '../sorted/sorted',
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