// miniprogram/pages/homepage/homepage.js
const app = getApp();
var util = require('../../utils/util.js')
Page({//下拉刷新
  data: {
    selectNum: 0,
    onLoad: false,
    lastPages: 1,     //当前页面状态
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
    fans: [],
    concern: [],
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
        content: [],
      }
    ],

    //茶室
    buildMapBtn: false,
    buildMap: false,
    toggleBuild: false,
    current: 0,
    bannerMsg: [
      {
        image: 'cloud://test-3bvt0.7465-test-3bvt0/images/bannerbg.png',
        author: '阿狸',
        content: '酒醉微醺，花开半夏'
      },
      {
        image: 'cloud://test-3bvt0.7465-test-3bvt0/images/bannerbg.png',
        author: '阿狸',
        content: '酒醉微醺，花开半夏'
      },
      {
        image: 'cloud://test-3bvt0.7465-test-3bvt0/images/bannerbg.png',
        author: '阿狸',
        content: '酒醉微醺，花开半夏'
      },
      {
        image: 'cloud://test-3bvt0.7465-test-3bvt0/images/bannerbg.png',
        author: '阿狸',
        content: '酒醉微醺，花开半夏'
      },
    ],
    teaRoom: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    //console.log(app.globalData, 'userins')
    //是否收藏，变换图标样式

  
    if (!app.globalData.userInfo.avatarUrl) {
      return
    }

    if (options.selected) {
      this.setData({
        selected: Number(options.selected)
      })

      this.tearoom();
    }
    this.setData({
      userInfo: app.globalData.userInfo,
    })
    //console.log(app.globalData.userInfo,'uu')
    if (this.data.selected === 0) {
      this.homepage();
    }


    //先查询是否有此用户记录，再创建users表
    app.onQuery('poemUsers', { openId: app.globalData.selfOpenId }, { nickName: true, fans: true, concern: true }).then(res => {
      let data = res.data;

      //console.log(res, 'userData');
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

          //console.log('创建users记录成功！')
        })
      } else {
        that.setData({
          fans: data[0].fans,
          concern: data[0].concern
        })
      }
    })

  },

  cangshige: function () {
    wx.navigateTo({
      url: '../poemHome/poemHome',
    })
  },

  myCollect: function () {
    wx.navigateTo({
      url: '../myCollect/myCollect',
    })
  },

  homepage: function () {
    let that = this;
    let zhaiItem = that.data.zhaiItem;//
    let content = zhaiItem[0].content;
    let collectYoN;
    let chaLength;
    let shiLength;
    //获取话题内容 index commentId articleId title
    app.onQuery('tearoom', { class: '茶' }, { commentContent: true }).then(res => {
      let count = -1;
      let data = res.data;
     
      data.forEach((items, indexs) => {
        items.commentContent.forEach((item, index) => {
          if (item.poem) {
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
          }

        })
      })

      chaLength = content.length;
    
    }).then(() => {
      //录入诗内容
      app.queryCollect('poemCon', {
        class: true, showImg: true, authorAvatar: true, nickName: true,
        collectPeopleID: true, commentNum: true, poemCon: true, queue: true, _openid: true, poemName: true

      }).then(res => {
     
        let data = res.data;
        shiLength = data.length;
     
        data.forEach(item => {
          let obj = {};
          obj.class = item.class;
          obj.id = item._id;
          obj.showImg = item.showImg;
          obj.authorAvatar = item.authorAvatar;
          obj.nickName = item.nickName;
          obj.collectPeopleID = item.collectPeopleID;
          obj.commentNum = item.commentNum;
          obj.openid = item._openid;
          obj.poem = item.poemCon;
          obj.queue = item.queue;
          obj.poemName = item.poemName;
          content.push(obj);
        })

      }).then(() => {
        //判断是否有点赞
        zhaiItem.forEach((Gitem, Gindex) => {
          Gitem.content.forEach((Pitem, Pindex) => {
           
            if (Pitem.collectPeopleID.length === 0) {
              collectYoN = false;
            } else {
              collectYoN = Pitem.collectPeopleID.some(item => item === app.globalData.selfOpenId)//selfId
            }

            zhaiItem[Gindex].content[Pindex].collectYoN = collectYoN;
          })
        });

      }).then(() => {
        let newContent = [];
        //content.sort((a, b) => a.queue - b.queue);
        if (chaLength >= shiLength) {//茶诗排序展示

          for (let cha = 0; cha < chaLength; cha++) {
            //console.log(content[cha],"content")
            newContent.push(content[cha]);
            if (chaLength + cha < chaLength + shiLength) {
              newContent.push(content[chaLength + cha])
            }
          }
        } else {
          for (let shi = 0; shi < shiLength; shi++) {
            newContent.push(content[shi]);
            if (shiLength + shi < chaLength + shiLength) {
              newContent.push(content[shiLength + shi])
            }
          }
        }
        zhaiItem[0].content = newContent;
        that.setData({
          zhaiItem
        })
      })
    })
  },

  tearoom: function () {
    let that = this;
    let teaRoom = this.data.teaRoom;
    app.queryCollect('tearoom', {
      authorAvatar: true, nickName: true, title: true, annotation: true, view: true, commentContent: true, showImg: true
    }).then(res => {
      let data = res.data;
      data.forEach(item => {
        let newTopic = {};
        newTopic.authorAvatar = item.authorAvatar;
        newTopic._id = item._id;
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

  mapNight: function (e) {
    //console.log(e)
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
    if (content.class === "茶") {

      let topicID = content.id;
      let title = content.title;
      let index = content.index;
      let commentId = content.commentId;

      wx.navigateTo({
        url: `../detailTopic/detailTopic?articleId=${topicID}&title=${title}&index=${index}&commentId=${commentId}`
      })
    }
    else {
      let poemName = content.poemName;
      let id = content.id;
      let lastPages = that.data.lastPages;
      let openid = content.openid;
      wx.redirectTo({
        url: `../ListDetail/ListDetail?poemName=${poemName}&id=${id}&lastPages=${lastPages}&openid=${openid}`,
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
      //console.log(content, 'content')
      zhaiItem[outerIndex].content[innerIndex].collectYoN = !zhaiItem[outerIndex].content[innerIndex].collectYoN;

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
    const data = e.currentTarget.dataset
    const url = data.path
    if (data.index === 1) {
      /*  this.setData({
         selected: 1
       }) */
    } else {
      if (data.index === 2) {
        this.tearoom();
      }
      if(data.index===1){
        this.homepage();
      }
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

    wx.navigateTo({
      url: `../mine/mine?authorId=${authorId}`
    })
  },

  goMyMsg: function () {
    wx.navigateTo({
      url: '../myMsg/myMsg'
    })
  },
  goSystermSet: function () {
    wx.navigateTo({
      url: '../systermSet/systermSet'
    })
  },
  createPoem: function () {
    wx.redirectTo({
      url: '../createPoemList/createPoemList',
    })
  },



  //茶室
  swiperDots: function (e) {
    let current = e.detail.current;
    this.setData({
      current,
    })

  },

  intoTearoom: function (e) {
    let id = e.currentTarget.dataset.id;

    wx.navigateTo({
      url: `../intoTearoom/intoTearoom?id=${id}`
    })
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


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    if (this.data.onLoad) {
      let options = {};
      options.selected = this.data.selectNum;
      this.onLoad(options)
    }

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