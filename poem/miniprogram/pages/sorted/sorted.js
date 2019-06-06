// miniprogram/pages/sorted/sorted.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lebel: ["朝代", "作者", "类型","诗集","哈哈"],
    kind: [
      { class: "朝代"},
      { class: "作者"},
      { class: "类型"},
      { class: "诗集"},
    ], 
    sortItems:[
      { title: "写景", url:"../../images/写景图标@2x.png"},
      { title: "咏物", url: "../../images/咏物图标@2x.png" },
      { title: "春天", url: "../../images/春天图标@2x.png" },
      { title: "夏天", url: "../../images/夏天图标@2x.png" },
      { title: "秋天", url: "../../images/秋天图标@2x.png" },
      { title: "冬天", url: "../../images/冬天图标@2x.png" },
      { title: "写雨", url: "../../images/写雨图标@2x.png" },
      { title: "写雪", url: "../../images/写雪图标@2x.png" },
      { title: "写竹", url: "../../images/写竹图标@2x.png" },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  gopoemHome:function(){
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