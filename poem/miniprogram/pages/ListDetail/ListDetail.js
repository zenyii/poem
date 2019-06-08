// miniprogram/pages/ListDeatil/ListDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    poemItem:[
      {
        content:"就让得到的淡淡的来，就让失去的好好的去。来便来了，来了就珍惜，去便去了，去了就回忆。" ,
        like:3,
        comment:2
      },
      {
        content: "岁月你别催，该来的我不催，该还的还，该给我的给。走远的我不追，走过的不后悔",
        like: 3,
        comment: 2
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  gopoemList:function(){
    wx.redirectTo({
      url: '../createPoemList/createPoemList',
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