// miniprogram/pages/ListDeatil/ListDetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    poemItem:[
      {
        poemCon:["就让得到的淡淡的来，","就让失去的好好的去。","来便来了，来了就珍惜，","去便去了，去了就回忆。" ],
        like:3,
        comment:2
      },
      {
        poemCon: ["岁月你别催，","该来的我不催，该还的还，该给我的给。","走远的我不追，走过的不后悔"],
        like: 3,
        comment: 2
      }
    ],
    userInfo:null,
    poemIntro:'灵感随记',
    poemName:'无悔',
    pages:0,
    tempFilePaths:'cloud://test-cf0c34.7465-test-cf0c34/images/诗集梅.png',
    newPoemCon:[],
    poemCon:'',
    current:0,        //当前页码
    lastPages: 0       //跳转的上一级界面状态，0为createPoemList，1为homePage
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      userInfo: app.globalData.userInfo,
      lastPages: options.lastPages
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
          poemMsg.id = res.data[x]._id;
          that.data.poemItem.push(poemMsg);
        }
        that.setData({
          poemIntro: res.data[0].poemIntro,
          poemName: res.data[0].poemName,
          tempFilePaths: res.data[0].tempFilePaths,
          poemItem: that.data.poemItem,
          pages: that.data.poemItem.length
        })
        for (let y = 0; y < that.data.poemItem.length;y++){
          if (options.id == that.data.poemItem[y].id){
           that.setData({
             current:y+2
           })
          }
        }
      }
      else{
        that.setData({
          pages: that.data.poemItem.length
        })
      }
    })
  },

  gopoemList:function(){
    if(this.data.lastPages==0){
      wx.redirectTo({
        url: '../createPoemList/createPoemList',
      })
    }
    else{
      wx.redirectTo({
        url: '../homepage/homepage',
      })
    }
  },
  inputCon: function (e) {
    this.data.newPoemCon = e.detail.value.split("\n");
    this.setData({
      newpoemCon: this.data.newPoemCon
    })
  },

  publish:function(){
    var that = this;
    let a = this.data;
    if (a.poemName && a.poemIntro && a.newpoemCon.length && a.tempFilePaths) {
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
        poemCon:'',
        pages: that.data.poemItem.length
      })
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
      title: '来看看我作的诗',
      path: '/pages/ListDetail/listDetail',
      imageUrl: "../../images/logo.png",
      success: function (res) {

      }
    }
  }
})