// miniprogram/pages/TeaRoomIntro/teaRoomIntro.js
Page({
  data: {
    imgSrc:'../../images/',
    teaRoom:{
      _id: '',
      masterId: '112233',
      masterAvatarUrl: 'teahoo.png',
      masterNickName: '室主',
      class: '诗经',
      date: '2019-4-23',
      menbers: [{
        openid: '',
        avatarUrl: 'teahoo.png',
        nickname: ''
      },{
        openid: '',
        avatarUrl: 'girl.png',
        nickname: ''
      },{
        openid: '',
        avatarUrl: 'girls.png',
        nickname: ''
      },{
        openid: '',
        avatarUrl: 'girlsss.png',
        nickname: ''
      },{
        openid: '',
        avatarUrl: 'pic3.png',
        nickname: ''
      }],
      title: '诗经',
      annotation: '一个专注与研究探讨诗经的小舍，一直以来都很喜欢诗经，希望能在这里聚集一群志同道合的伙伴，一起交流探讨喜欢的诗经',
      view: 1233,
      comment: 2342,
      img:'pic1.png',
      commentContent: [{
        authorId:'',
        title:'蒹葭',
        content: ["蒹葭苍苍，白露为霜。","所谓伊人，在水一方，","溯洄从之，道阻且长。","溯游从之，宛在水中央。",
        "蒹葭萋萋，白露未晞。","所谓伊人，在水之湄。","溯洄从之，道阻且跻。","溯游从之，宛在水中坻。","蒹葭采采，白露未已。",
        "所谓伊人，在水之涘。","溯洄从之，道阻且右。","溯游从之，宛在水中沚。"
      ],
        authorAvatarUrl: 'eye.png',
        authorNickName: '一只眼',
        collect: 232,
        collectId: [],
        comment: 234,
      },
      {
        authorId:'',
        title:'活动3:诗经赏析',
        content: ["小伙伴们可以选择一首自己喜欢的诗经，针对诗经的一句进行赏析和探讨，与大家一起分享诗经的意蕴。"
      ],
        authorAvatarUrl: 'girl.png',
        authorNickName: '夜雨声烦',
        collect: 232,
        collectId: [],
        comment: 234,
      }]
    }
  },

  goBack:function(){
    app.goBack();
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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