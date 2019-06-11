// miniprogram/pages/searchDetail/searchDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    label:'',
    poemList:[],
    lastPages: 2           //上一页面标识，默认0,1为poemHome，2为searchDetail
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      label: options.label
    })
    const db = wx.cloud.database();
    db.collection("Commend").where({
      label: that.data.label
    }).get().then(res=>{
      console.log(res.data);
      that.setData({
        poemList:res.data
      })
    })
  },
  goDetail:function(e){
    var that = this;
    let index = e.currentTarget.dataset.id;
    wx.redirectTo({
      url: '/pages/poemDetail/poemDetail?title=' + that.data.poemList[index].title + '&lastPages=' + that.data.lastPages,
    })
  },

  gosorted:function(){
    wx.redirectTo({
      url: '/pages/sorted/sorted',
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