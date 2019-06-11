// miniprogram/pages/poemDetail/poemDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    left:120,
    top:5,
    poemDetail:{},
    lastPages: 0,           //上一页面标识，默认0,1为poemHome，2为searchDetail
    current:0,
    left:[120,255,385,515,650],
    isStar:false,              //是否收藏，
    collect:[],                //用户收藏列表,
    title:'',                   //当前诗名
    text:'',
    poster: '../../images/朗诵@2x.png',
    audiosrc: 'http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=3&text=',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.audioCtx = wx.createAudioContext('myAudio');
    var that = this;
    const db = wx.cloud.database();
    //从诗词表中获取此首诗的详细数据
    db.collection("poemDetail").where({
      title: options.title
    }).get().then(res=>{
      let text = res.data[0].poemCon.join("");
      that.setData({
        poemDetail: res.data[0],
        lastPages: options.lastPages,
        title: res.data[0].title,
        text: text
      })
    }).then(()=>{
      that.setData({
        audiosrc: 'http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=2.5&text=' + that.data.text
      })
    })

    //从用户表中查询此首诗的点赞情况
    db.collection("poemUsers").where({
      _openid: app.globalData.selfOpenId
    }).field({
      collect:true
    }).get().then(res=>{
      that.setData({
        collect:res.data[0].collect
      })
      //判断是否已经点赞过该诗
      for (let x = 0; x < that.data.collect.length; x++) {
        if (that.data.collect[x] == that.data.title) {
          that.setData({
            isStar:true
          })
        }
      }
    })
  },
  goMain:function(){
    this.setData({
      current:0
    })
  },

  goNote:function(){
    this.setData({
      current: 1
    })
  },
  goTran:function(){
    this.setData({
      current: 2
    })
  },
  goAppr:function(){
    this.setData({
      current: 3
    })
  },

  goAut:function(){
    this.setData({
      current: 4
    })
  },
  goHome:function(){
    var that = this;
    if(this.data.lastPages==1){
      wx.redirectTo({
        url: '../poemHome/poemHome',
      })
    }
    else if (this.data.lastPages == 2) {
      wx.redirectTo({
        url: '../searchDetail/searchDetail?label=' + that.data.poemDetail.label,
      })
    }
    else if (this.data.lastPages == 3) {
      wx.redirectTo({
        url: '../myCollect/myCollect',
      })
    }
  },

  scrollSwiper:function(e){
    this.setData({
      current: e.detail.current 
    })
  },
  collect:function(){
    var that = this;
    let temp = this.data.isStar?false:true;
    this.setData({
      isStar:temp
    })
    if (!this.data.isStar){
      for(let x = 0 ; x < this.data.collect.length; x++){
        if (that.data.collect[x] == that.data.title) {
          that.data.collect.splice(x,1);
        }
      }
    }
    else{
      that.data.collect.push(that.data.title);
    }
    //云函数更新数组
    /* 数据库更新 */
    wx.cloud.callFunction({
      name: 'updateComplex',
      data: {
        collect: 'poemUsers',
        where: { _openid: that.data.selfOpenId },
        key: 'collect',
        value: that.data.collect
      }
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
    }
    return {
      title: '一起来欣赏这首诗',
      path: '/pages/poemDetail/poemDetail',
      imageUrl: "../../images/logo.png",
      success: function (res) {

        }
      }
    }
})