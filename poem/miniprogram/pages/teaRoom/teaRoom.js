// miniprogram/pages/teaRoom/teaRoom.js
const app = getApp();
Page({
  data: {
    buildMapBtn:false,
    buildMap:false,
    toggleBuild:false,
    current: 0,
    imgSrc: '../../images/',
    selected: 0,
    color: "#000000",
    selectedColor: "#C09550",
    list: [{
      iconPath: "../../images/一壶未激活@2x.png",
      selectedIconPath: "../../images/一壶激活@2x.png",
      text: "一壶"
    }, {
      iconPath: "../../images/创建@2x.png",
      selectedIconPath: "../../images/创建@2x.png",
    }, {
      iconPath: "../../images/茶室未激活@2x.png",
      selectedIconPath: "../../images/茶室激活@2x.png",
      text: "茶室"
    }],
    bannerMsg: [
      {
        image: '../../images/bannerbg.png',
        author: '阿狸',
        content: '酒醉微醺，花开半夏'
      },
      {
        image: '../../images/bannerbg.png',
        author: '阿狸',
        content: '酒醉微醺，花开半夏'
      },
      {
        image: '../../images/bannerbg.png',
        author: '阿狸',
        content: '酒醉微醺，花开半夏'
      },
      {
        image: '../../images/bannerbg.png',
        author: '阿狸',
        content: '酒醉微醺，花开半夏'
      },
    ],
    teaRoom:[{
      _id: '112233',
      authorAvatar: '../../images/teahoo.png',
      nickName: '室主',
      title: '诗经',
      annotation: '一个专注与研究探讨诗经的小舍，一直以来都很喜欢诗经，希望能在这里聚集一群志同道合的伙伴，一起交流探讨喜欢的诗经',
      view: 1233,
      commentNum: 2342,
      showImg:'../../images/pic1.png',
     
    },
    {
      _id:'1234234',
      masterId: '112233',
      authorAvatar: '../../images/girls.png',
      nickName: '抬头望天',
      title: '逝去的青春',
      annotation: '时光荏苒，青春易逝，用感动的言语，精致的文字记录最美好的一分一秒。',
      view: 1233,
      commentNum: 2342,
      showImg:'../../images/pic2.png',
      
    },{
      _id:'8764853',
      masterId: '112233',
      authorAvatar: '../../images/girlsss.png',
      nickName: '低头看水',
      title: '上下联',
      annotation: '对精彩的对诗现成，欢迎各位喜欢对诗和对联的小伙伴加入，一起感受对联的魅力。',
      view: 1233,
      commentNum: 2342,
      showImg:'../../images/pic3.png',
      
    }]
      
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let teaRoom = this.data.teaRoom;
    app.queryCollect('tearoom',{
      authorAvatar:true,nickName:true,title:true,annotation:true,view:true,commentContent:true,showImg:true
    }).then(res=>{
      let data = res.data;
      data.forEach(item=>{
        let newTopic = {};
        newTopic.authorAvatar= item.authorAvatar;
        newTopic._id= item._id;
        newTopic.nickName = item.nickName;
        newTopic.title = item.title;
        newTopic.annotation = item.annotation;
        newTopic.view = item.view;
        newTopic.commentNum = item.commentContent.length;
        newTopic.showImg = item.showImg;
        teaRoom.unshift(newTopic);
      })

      that.setData({
        teaRoom
      })

    })
  },

  swiperDots: function (e) {
    let current = e.detail.current;
    this.setData({
      current,
    })

  },

  switchTab: function (e) {
    const data = e.currentTarget.dataset
    const url = data.path
    if (data.index === 1) {
      this.setData({
        selected: 1
      })
    } else {
      this.setData({
        selected: data.index
      })
    }
  },

  intoTearoom:function(e){
    let id = e.currentTarget.dataset.id;
    console.log(id,'id')
    wx.navigateTo({
      url:`../intoTearoom/intoTearoom?id=${id}`
    })
  },

  
  toggleBuild:function(){
    let that = this;
    let toggleBuild = this.data.toggleBuild;
    let buildMapBtn = this.data.buildMapBtn;
    this.setData({
      toggleBuild:!toggleBuild,
      buildMap:!this.data.buildMap
    })
    if(buildMapBtn){
      setTimeout(function(){
        that.setData({
          buildMapBtn:!buildMapBtn
        })
      },300)
    }else{
      that.setData({
        buildMapBtn:!buildMapBtn
      })
    }
    
  },

  publicTopic:function(){
    wx.navigator({
      url:'../publicTopic/publicTopic'
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