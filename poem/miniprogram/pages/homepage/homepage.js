// miniprogram/pages/homepage/homepage.js
const app = getApp();
Page({//下拉刷新
  data: {
    lastPages:1,     //当前页面状态
    night: false,
    buildMapBtn: false,
    buildMap: false,
    toggleBuild: false,
    userInfo: app.globalData.userInfo,
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
        content: [/* {
          _id: 'ff',
          class: '诗',
          date: '2019-4-25',
          poem: ['谈天谈地，谈上谈下谈左谈右，',
            '谈来谈去，谈人生不过一场闹剧。'],
          showImg: 'showbg.png',
          authorId: '112233',
          authorAvatar: 'eye.png',
          nickName: '白马非马',
          collectPeopleID: ['112233', '111133'],
          collectNum: 6,
          commentNum: 3
        }, {
          _id: '33',
          class: '茶',
          date: '2019-4-25',
          poem: ['"我爱你"，用古诗怎么说？', '古人思想比较保守，却很深刻。', '爱恨情仇，古今同；',
            '问世间情为何物。', '古人表达爱情很优美，压制，刻骨，', '能甩现代人好几条街。"山无棱，天地合，', '乃敢与君绝。'],
          showImg: '',
          authorId: '',
          authorAvatar: 'cartoon.png',
          nickName: '白日梦',
          collectPeopleID: ['345345'],
          collectNum: 6,
          commentNum: 5
        }, {
          _id: '22',
          class: '诗',
          date: '2019-4-25',
          poem: ['岁月你别催，', '该来的我不催，该还的还，', '该给我的给',
            '走远的我不追', '走过的不后悔。'],
          showImg: 'bamboo.png',
          authorId: '',
          authorAvatar: 'girl.png',
          nickName: '小黑与小白',
          collectPeopleID: ['456456'],
          collectNum: 1,
          commentNum: 3
        }, */],
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log(app.globalData, 'userins')
    //是否收藏，变换图标样式
    let zhaiItem = that.data.zhaiItem;//
    let content = zhaiItem[0].content;
    let collectYoN;

    //获取话题内容 index commentId articleId title
    app.onQuery('tearoom', { class: '茶' }, { commentContent: true }).then(res => {
      let count = -1;
      let data = res.data;

      console.log(data, 'data')
      data.forEach((items, indexs) => {
        items.commentContent.forEach((item, index) => {
          count++;
          //console.log(items._id,"_id")
          content[count] = {};
          content[count].id = items._id;
          content[count].index = index;
          content[count].class = item.class;
          content[count].poem = item.poem;
          content[count].showImg = "";
          content[count].authorAvatar = item.authorAvatar;
          content[count].nickName = item.nickName;
          content[count].collectPeopleID = item.collectPeopleID;
          content[count].commentId = item.commentId;
          content[count].title = item.title;
          content[count].commentNum = item.commentNum;
          content[count].queue = item.queue;
        })
      })
    }).then(() => {
      //录入诗内容
      app.queryCollect('poemCon', {
        class: true, showImg: true, authorAvatar: true, nickName: true,
        collectPeopleID: true, commentNum: true, poemCon: true, queue: true,poemName:true
      }).then(res => {
        let data = res.data;
        console.log(data, 'shi')
        data.forEach(item => {
          let obj = {};
          obj.class = item.class;
          obj.id = item._id;
          obj.showImg = item.showImg;
          obj.authorAvatar = item.authorAvatar;
          obj.nickName = item.nickName;
          obj.collectPeopleID = item.collectPeopleID;
          obj.commentNum = item.commentNum;
          obj.poem = item.poemCon;
          obj.queue = item.queue;
          obj.poemName = item.poemName;
          content.push(obj);
        })

      }).then(() => {
        //判断是否有点赞
        zhaiItem.forEach((Gitem, Gindex) => {
          Gitem.content.forEach((Pitem, Pindex) => {
            collectYoN = Pitem.collectPeopleID.some(item => item === app.globalData.selfOpenId)//selfId
            zhaiItem[Gindex].content[Pindex].collectYoN = collectYoN;
          })
        });

      }).then(() => {
        content.sort((a, b) => a.queue - b.queue);
        that.setData({
          zhaiItem
        })
      })
    })


    //先查询是否有此用户记录，再创建users表
    app.onQuery('poemUsers', { openId: app.globalData.selfOpenId }, { nickName: true }).then(res => {
      let data = res.data;
      console.log(res, 'userData');
      if (data.length === 0) {//如果后台没有此用户记录，则加入
        app.onAdd('poemUsers', {
          avatarUrl: app.globalData.userInfo.avatarUrl,
          nickName: app.globalData.userInfo.nickName,
          openId: app.globalData.selfOpenId,
          hisPoem: [],
          hisTopic: [],
          fans: [],
          concern: [],
          collect: []

        }).then(res => {
          console.log('创建users记录成功！')
        })
      }
    })
  },

  mapNight: function (e) {
    console.log(e)
  },

  moreCard: function () {//显示更多
    let that = this;
    that.setData({
      moreCardShow: true
    })
  },
  hideCard: function (e) {//隐藏更多
    let that = this;
    //console.log(e,'hideCard')
    if (e.target.id === "hideCard") {
      that.setData({
        moreCardShow: false
      })
    }
  },
  detailMsg: function (e) {//点击进入具体说说，传入说说ID
    let that = this;
    //console.log(e, 'big');
    let zhaiItem = that.data.zhaiItem;
    let outerIndex = e.currentTarget.dataset.gparentindex;
    let innerIndex = e.currentTarget.dataset.parentindex;
    let content = zhaiItem[outerIndex].content[innerIndex];

    if (content.class == "茶") {
      let topicID = content.id;
      let title = content.title;
      let index = content.index;
      let commentId = content.commentId;

      wx.navigateTo({
        url: `../detailTopic/detailTopic?articleId=${topicID}&title=${title}&index=${index}&commentId=${commentId}`
      })
    }
    else{
      let poemName = content.poemName;
      let id = content.id;
      let lastPages = that.data.lastPages;
      wx.redirectTo({
        url: `../ListDetail/ListDetail?poemName=${poemName}&id=${id}&lastPages=${lastPages}`,
      })
    }

  },

  switchChange: function (e) {
    let that = this;
    this.setData({
      night: !that.data.night
    })
  },

  moreDepth: function (e) {//更多条目
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
    let index = zhaiItem[outerIndex].content[innerIndex].index;

    if (idEvent === 'collect') {//收藏变换
      let content = zhaiItem[outerIndex].content[innerIndex];
      if (content.collectYoN)//收藏取消
      {
        zhaiItem[outerIndex].content[innerIndex].collectPeopleID = zhaiItem[outerIndex].content[innerIndex].collectPeopleID.filter(item => item !== app.globalData.selfOpenId);
        zhaiItem[outerIndex].content[innerIndex].collectNum -= 1;

        wx.showToast({
          title: '已取消点赞！',
          duration: 2000
        })

      } else {//确定收藏
        zhaiItem[outerIndex].content[innerIndex].collectPeopleID.push(app.globalData.selfOpenId);
        zhaiItem[outerIndex].content[innerIndex].collectNum = zhaiItem[outerIndex].content[innerIndex].collectNum + 1;
        wx.showToast({
          title: '点赞成功！',
          duration: 2000
        })
      }
      console.log(content, 'content')
      zhaiItem[outerIndex].content[innerIndex].collectYoN = !zhaiItem[outerIndex].content[innerIndex].collectYoN;
      //console.log(collectPeopleID,'id');
      //console.log(collectNum,'num')

      that.setData({//修改对应数据上传到数据库！
        zhaiItem: zhaiItem,

      })

      wx.cloud.callFunction({
        name: 'updateComplex',
        data: {
          collect: 'tearoom',
          where: { _id: zhaiItem[outerIndex].content[innerIndex].id },
          key: `commentContent.${index}.collectPeopleID`,
          value: zhaiItem[outerIndex].content[innerIndex].collectPeopleID
        }
      })
      //console.log(zhaiItem,'zhaiItem');
    }

    if (idEvent === 'commont') {//进入评论区

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

  toggleBuild: function () {
    let that = this;
    let toggleBuild = this.data.toggleBuild;
    let buildMapBtn = this.data.buildMapBtn;
    this.setData({
      toggleBuild: !toggleBuild,
      buildMap: !this.data.buildMap
    })
    if (buildMapBtn) {
      setTimeout(function () {
        that.setData({
          buildMapBtn: !buildMapBtn
        })
      }, 300)
    } else {
      that.setData({
        buildMapBtn: !buildMapBtn
      })
    }

  },

  publicTopic: function () {
    wx.navigateTo({
      url: '../publicTopic/publicTopic'
    })
  },
  gotoHome: function () {
    let authorId = app.globalData.selfOpenId;
    console.log(authorId, 'id')
    wx.navigateTo({
      url: `../mine/mine?authorId=${authorId}`
    })
  },

  createPoem:function(){
    wx.redirectTo({
      url: '../createPoemList/createPoemList',
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