// miniprogram/pages/commentList/commentList.js
const app = getApp();
Page({
  data: {
    imgSrc:'../../images/',
    commentList:[],
    author:[]
  },
  onLoad: function (options) {
    let that = this;
    let commentList = this.data.commentList;
    let selfOpenId = app.globalData.selfOpenId;  //app.globalData.selfOpenId
    app.onQuery('poemUsers',{openId:selfOpenId},{commentList:true}).then(res=>{
      let data = res.data[0];
      console.log(data,'data')
      commentList = data.commentList.reverse();
      /* that.setData({
        commentList:data.commentList,
        userId:data._id//该用户的id号
      }) */
    }).then(()=>{
      that.setData({
        commentList
      })
      console.log(that.data,'commentList')
    })
  },
  goComment:function(e){//commentId  index
    let index = e.currentTarget.dataset.index;
    let commentId = this.data.commentList[index].commentId;
    let account = this.data.commentList[index].index;
    wx.navigateTo({
      url:`../gotoComment/gotoComment?commentId=${commentId}&index=${account}&articleId=hui&title=hh`
    })

  },

  goBack:function(){
    app.goBack();
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