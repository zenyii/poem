// miniprogram/pages/mine/mine.js
const app = getApp();
/* const selfOpenId = app.globalData.selfOpenId;
const nickName = app.globalData.userInfo.nickName;
const avatarUrl = app.globalData.userInfo.avatarUrl; */
Page({
  data: {
    concern: false,
    imgSrc: '../../images/',
    isMaster:false
    /* user: {
      id: '112233',
      authorAvatar: '../../images/cartoon.png',
      nickName: '白日梦',
      fans: 3,
      fansId: ['12123', '34234', '23123'],
      concern: 3,
      concernId: ['765247', '236342', '989543'],
    } */
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {//在链接中传递user_id
    let that = this;
    let authorId = options.authorId;//'oGw5W49WStN-HbdVgfbSxykI8SC0';// options.authorId;
    let selfOpenId = app.globalData.selfOpenId;
    if(authorId===selfOpenId){
      let isMaster = true;
      this.setData({
        isMaster:true
      })
    }
    //先查询帖主的粉丝是否有参与者
    console.log(authorId, 'au')
    app.onQuery('poemUsers', { openId: authorId }, {
      avatarUrl: true, concern: true, fans: true, nickName: true,
      hisPoem: true, hisTopic: true
    }).then(res => {
      let data = res.data[0];
      console.log(res, 'fans');
      let fans = data.fans;

      let concern = fans.some(item => item === selfOpenId);
      that.setData({
        user: data,
        concern,
        authorId,
      })
    })
  },

  concern: function () {
    let that = this;
    let concern = that.data.concern;
    let fans;
    let selfOpenId = app.globalData.selfOpenId;
    //先查询帖主的粉丝是否有参与者
    app.onQuery('poemUsers', { openId: that.data.authorId }, { fans: true }).then(g => {
      let data = g.data[0];
      fans = data.fans;
      if (concern) {//取消关注
        fans = fans.filter(item => item !== selfOpenId)
        wx.showToast({
          title: '已取消关注！',
          duration: 2000
        })
      } else {
        fans.push(selfOpenId);
        wx.showToast({
          title: '已关注！',
          duration: 2000
        })
      }
      concern = !concern;
      that.setData({
        [`user.fans`]: fans,
        concern,
      })
    }).then(res => {
      //更新数据库
      wx.cloud.callFunction({
        name: 'updateComplex',
        data: {
          collect: 'poemUsers',
          where: { openId: that.data.authorId },
          key: `fans`,
          value: fans,
        }
      })
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  goBack:function(){
    app.goBack();
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