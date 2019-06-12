// miniprogram/pages/myMsg/myMsg.js
const app = getApp();
Page({
  data: {
    imgSrc:'../../images/',
    redDotZ:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let selfOpenId = 'oGw5W49WStN-HbdVgfbSxykI8SC0';  //app.globalData.selfOpenId
    app.onQuery('poemUsers',{openId:selfOpenId},{newCMsg:true}).then(res=>{
      let data = res.data[0];
      console.log(data,'data')
      that.setData({
        redDot:data.newCMsg,
        userId:data._id
      })
    })
  },
  goBack:function(){
    app.goBack();
  },
  commentList:function(){
    this.setData({
      redDotZ:false,
      redDot:false
    })
    app.onUpdate('poemUsers',this.data.userId,'newCMsg',false).then(()=>{
      wx.navigateTo({
        url:`../commentList/commentList`
      })
    })
  },

  goZan:function(){
    wx.navigateTo({
      url:`../zanList/zanList`
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