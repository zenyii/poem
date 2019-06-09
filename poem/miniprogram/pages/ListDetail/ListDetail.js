// miniprogram/pages/ListDeatil/ListDetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    poemItem:[
      {
        poemCon:"就让得到的淡淡的来，就让失去的好好的去。来便来了，来了就珍惜，去便去了，去了就回忆。" ,
        like:3,
        comment:2
      },
      {
        poemCon: "岁月你别催，该来的我不催，该还的还，该给我的给。走远的我不追，走过的不后悔",
        like: 3,
        comment: 2
      }
    ],
    userInfo:null,
    poemIntro:'灵感随记',
    poemName:'无悔',
    pages:0,
    tempFilePaths:'../../images/诗集梅.png',
    newPoemCon:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      userInfo: app.globalData.userInfo
    })
    const db = wx.cloud.database();
    db.collection("poemCon").where({
      poemName:options.poemName,
      _openid: app.globalData.selfOpenId
    }).get().then(res=>{
      if(res.data.length){
        that.data.poemItem = [];
        for (let x = 0; x < res.data.length;x++){
          let poemMsg = {};
          poemMsg.poemCon = res.data[x].poemCon;
          poemMsg.like = res.data[x].like;
          poemMsg.comment = res.data[x].comment;
          that.data.poemItem.push(poemMsg);
        }
        that.setData({
          poemIntro: res.data[0].poemIntro,
          poemName: res.data[0].poemName,
          tempFilePaths: res.data[0].tempFilePaths,
          poemItem: that.data.poemItem,
          pages: that.data.poemItem.length
        })
      }
      else{
        that.setData({
          pages: that.data.poemItem.length
        })
      }
      console.log(that.data.poemItem);
    })
  },

  gopoemList:function(){
    wx.redirectTo({
      url: '../createPoemList/createPoemList',
    })
  },
  inputCon: function (e) {
    this.setData({
      newpoemCon: e.detail.value
    })
  },

  publish:function(){
    var that = this;
    let a = this.data;
    if (a.poemName && a.poemIntro && a.newpoemCon && a.tempFilePaths) {
      const db = wx.cloud.database();
      db.collection("poemCon").add({
        data: {
          poemName: that.data.poemName,          //诗名
          poemIntro: that.data.poemIntro,         //诗简介
          poemCon: that.data.newpoemCon,             //诗内容
          nickName: that.data.userInfo.nickName,  //作者昵称
          tempFilePaths: that.data.tempFilePaths, //封面链接
          like: 0,                                //点赞数
          comment: 0                              //评论数
        }
      })
      let obj = {
        comment:0,
        like: 0, 
        poemCon: that.data.newpoemCon
      }
      that.data.poemItem.push(obj);
      that.setData({
        poemItem: that.data.poemItem,
        newpoemCon:'',
        pages: that.data.poemItem.length
      })
      console.log(that.data.poemItem);
    }
    else {
      wx.showToast({
        title: '请填写所有信息噢~',
      })
    }
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
    }
    return {
      title: '转发',
      path: '/pages/ListDetail/listDetail',
      imageUrl: "../../images/logo.png",
      success: function (res) {

      }
    }
  }
})