// miniprogram/pages/homepage/homepage.js
const app = getApp();
Page({//下拉刷新

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:app.globalData.userInfo,
    moreCardShow: false,
    selfId: '112233',
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
    zhaiItem: [//数据库每条说说记录存储_id,date和content的对象，检测到对应date对象就把contentpush进对应content里
      {
        date: '己亥年己巳月辛亥日',
        content: [{
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
        }, {
          _id:'33',
          class: '茶',
          date:'2019-4-25',
          poem: ['我爱你"，用故事怎么说？', '古人思想比较保守，却很深刻。', '爱恨情仇，古今同；',
            '问世间情为何物。', '古人表达爱情很优美，压制，刻骨，', '能甩现代人好几条街。"山无棱，天', '地合，乃敢与君绝。'],
          showImg: '',
          authorId:'',
          authorAvatar: 'cartoon.png',
          nickName: '白日梦',
          collectPeopleID: ['345345'],
          collectNum: 6,
          commentNum: 5
        }, {
          _id:'22',
          class: '诗',
          date:'2019-4-25',
          poem: ['岁月你别催，', '该来的我不催，该还的还，', '该给我的给',
            '走远的我不追', '走过的不后悔。'],
          showImg: 'bamboo.png',
          authorId:'',
          authorAvatar: 'girl.png',
          nickName: '小黑与小白',
          collectPeopleID: ['456456'],
          collectNum: 1,
          commentNum: 3
        },],
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log(app.globalData,'userins')
    //是否收藏，变换图标样式
    let zhaiItem = that.data.zhaiItem;
    let collectYoN;
    zhaiItem.forEach((Gitem, Gindex) => {
      Gitem.content.forEach((Pitem, Pindex) => {
        collectYoN = Pitem.collectPeopleID.some(item => item === '112233')//selfId
        zhaiItem[Gindex].content[Pindex].collectYoN = collectYoN;
      })
    });
    that.setData({
      zhaiItem
    })
  },

  moreCard: function () {//显示更多
    let that = this;
    that.setData({
      moreCardShow:true
    })
  },
  hideCard:function(e){//隐藏更多
    let that = this;
    //console.log(e,'hideCard')
    if(e.target.id==="hideCard"){
      that.setData({
        moreCardShow:false
      })
    }
  },
  detailMsg: function (e) {//点击进入具体说说，传入说说ID
    let that = this;
    //console.log(e, 'big');
    let zhaiItem = that.data.zhaiItem;
    let outerIndex = e.currentTarget.dataset.gparentindex;
    let innerIndex = e.currentTarget.dataset.parentindex;
    let topicID = zhaiItem[outerIndex].content[innerIndex]._id;
    console.log(topicID,'id')
    wx.navigator({
      url:`../detailTopic/detailTopic?topicID=${topicID}`
    })
  },

  switchChange:function(e){

  },

  moreDepth:function(e){//更多条目
    //console.log(e.target.dataset.id,'depth')
  },

  interact: function (e) {
    let that = this;
    //console.log(e,'small');
    let zhaiItem = that.data.zhaiItem;
    //zhaiItem[0].content[1]="";
    let idEvent = e.target.id;
    let outerIndex = e.currentTarget.dataset.gparentindex;
    let innerIndex = e.currentTarget.dataset.parentindex;

    if (idEvent === 'collect') {//收藏变换
      let content = zhaiItem[outerIndex].content[innerIndex];
      if (content.collectYoN)//收藏取消
      {
        zhaiItem[outerIndex].content[innerIndex].collectPeopleID = zhaiItem[outerIndex].content[innerIndex].collectPeopleID.filter(item => item !== '112233');
        zhaiItem[outerIndex].content[innerIndex].collectNum -= 1;

        wx.showToast({
          title: '已取消收藏！',
          duration: 2000
        })

      } else {//确定收藏
        zhaiItem[outerIndex].content[innerIndex].collectPeopleID.push('112233');
        zhaiItem[outerIndex].content[innerIndex].collectNum = zhaiItem[outerIndex].content[innerIndex].collectNum + 1;
        wx.showToast({
          title: '已收藏！',
          duration: 2000
        })
      }
      console.log(content, 'content')
      zhaiItem[outerIndex].content[innerIndex].collectYoN = !zhaiItem[outerIndex].content[innerIndex].collectYoN;
      //console.log(collectPeopleID,'id');
      //console.log(collectNum,'num')

      that.setData({//修改对应数据上传到数据库！
        zhaiItem: zhaiItem
      })
      //console.log(zhaiItem,'zhaiItem');
    }

    if (idEvent === 'commont'){//进入评论区

    }
  },
  switchTab: function (e) {
    console.log(e, 'switch')
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