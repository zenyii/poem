// miniprogram/pages/detailTopic/detailTopic.js
Page({
  data: {
    topicContent:{
      _id:'ff',
      class: '诗',
      date:'2019-4-25',
      poem: ['谈天谈地，谈上谈下谈左谈右，',
        '谈来谈去，谈人生不过一场闹剧。'],
      showImg: 'showbg.png',
      authorId:'112233',
      authorAvatar: 'eye.png',
      nickName: '白马非马',
      collectPeopleID: ['112233', '111133'],
      collectNum: 6,
      commentNum: 3
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let topicID = options.topicID;//取数据查询
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