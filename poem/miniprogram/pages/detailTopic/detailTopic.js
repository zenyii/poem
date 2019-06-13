// miniprogram/pages/detailTopic/detailTopic.js
const app = getApp();
var util = require('../../utils/util.js')
/* const selfOpenId = app.globalData.selfOpenId;
const nickName = app.globalData.userInfo.nickName;
const avatarUrl = app.globalData.userInfo.avatarUrl; */
Page({
  data: {
    onLoad:false,
    sendAct: false,
    emojiSwiper: [],
    keyboard: 0,
    emojiShow: false,
    emojiArr: ["😠", "😩", "😲", "😞", "😵", "😰", "😒", "😍", "😤", "😜", "😝", "😋", "😘", "😚", "😷", "😳", "😃", "😅", "😆", "😁", "😂", "😊", "😄", "😢", "😭", "😨", "😣", "😡", "😌", "😖", "😔", "😱", "😪", "😏", "😓", "😥", "😫", "😉", "🙈", "🙊", "🙉", "🙋", "🙌", "🙍", "🙎", "🙏"],
    emoji: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38"],
    time: '',
    inputValue: [],
    value: '',
    /*     concern: true,
        concernArr: ["112233", "223344"], */
    sortAct: '',
    imgSrc: '../../images/',
    title: '"我爱你"，用故事怎么说',
    scrollTop: 0,
    /* topicContent: {
      _id: '33',
      date: '2019-4-25',
      title: '',
      poem: ['我爱你"，用故事怎么说？', '古人思想比较保守，却很深刻。', '爱恨情仇，古今同；',
        '问世间情为何物。', '古人表达爱情很优美，压制，刻骨，', '能甩现代人好几条街。"山无棱，天', '地合，乃敢与君绝。'],
      showImg: '../../images/首页插图@2x.png',
      authorId: '',
      authorAvatar: '../../images/cartoon.png',
      nickName: '白日梦',
      collectPeopleID: ['345345'],
      collectNum: 6,
      commentNum: 5
    },
    Comment: [{//默认时间排序（数据库），
      firstSend: '',
      date: "16分钟前",
      articleId: "33",
      reviewerId: "345345",
      reviewerAvatar: '../../images/cartoon.png',
      reviewerName: '小黑和小白',
      content: ["我爱你", "你是光，你是电，你是唯一的神话。"],//注意格式
      collectPeopleID: ['345345'],
      collectNum: 6,
      commentNum: 3,
    },
    {
      firstSend: '',
      date: "24小时前",
      articleId: "3355",
      reviewerId: "305345",
      reviewerAvatar: '../../images/cartoon.png',
      reviewerName: '业余剩饭',
      content: ["我越是远离，却越是靠近你", "我越是背过脸，却越是看见你", "我是一座孤岛，处于相思之水中，",
        "四面八方，隔断我通向你。", "一千零一面镜子，转映着你的容颜，", "我从你开始，我在你结束", "           ——埃姆朗 萨罗斯"],//注意格式
      collectPeopleID: ['345345', '112233'],
      collectNum: 16,
      commentNum: 3,
    },
    {
      class: '茶',
      firstSend: '',
      date: "2天前",
      articleId: "33",
      reviewerId: "345345",
      reviewerAvatar: '../../images/cartoon.png',
      reviewerName: '唯一神话',
      content: ["执子之手与子偕老"],//注意格式
      collectPeopleID: ['345345'],
      collectNum: 3,
      commentNum: 3,
    }] */

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let title = options.title;
    let selfOpenId = app.globalData.selfOpenId;
    let articleId = options.articleId;// "cbdb4c165cfb563701bbd5a641b18038";// options.articleId;//第一级话题文章id
    let commentId = options.commentId;// "dec80a9e5cfb982001e7d9b17e34c811";// options.commentId;//第三级评论id
    let indexss = options.index;// options.index;


    //初始化
    let that = this;
    let time = new Date().getTime();

    //拆分emoji
    let emojiArr = that.data.emojiArr;
    let emojiSwiper = that.data.emojiSwiper;
    let left = 10 - emojiArr.length % 10;
    for (var i = left; i >= 0; i--) {
      emojiArr.push("");
    }

    while (emojiArr.length >= 40) {
      emojiSwiper.push(emojiArr.splice(0, 40));
    }

    emojiSwiper.push(emojiArr);
    that.setData({
      time,
      emojiSwiper,
      title

    })

    //初始化评论区
    app.onQuery('tearoom', { _id: articleId }, {
      commentContent: true,
    }).then(res => {
      let data = res.data[0];
      let author;
      let topicContent = data.commentContent[indexss];
      topicContent.articleId = articleId;
      topicContent.commentId = commentId;
      topicContent.indexss = indexss;
      if (selfOpenId === topicContent.authorId) {
        author = true;
      }
      that.setData({
        topicContent,
        author
      })

      app.onQuery('comment', { _id: commentId }, {
        content: true,
      }).then(ress => {
        let commentData = ress.data[0];
        //console.log(commentData, 'commentData')
        that.setData({
          Comment: commentData.content
        })
      }).then(res => {
        //是否收藏，变换图标样式
        let topicContent = that.data.topicContent;
        let Comment = that.data.Comment;
        //console.log(Comment, 'Comment')
        let collectYoN = topicContent.collectPeopleID.some(item => item === selfOpenId)//selfId
        topicContent.collectYoN = collectYoN;
        //评论区是否收藏
        if (Comment.length !== 0) {
          Comment.forEach((item, index) => {
            let commentYoN = item.collectPeopleID.some(item => item === selfOpenId)//selfid
            Comment[index].commentYoN = commentYoN;
          })
        }
        that.setData({
          topicContent,
          Comment
        })
        //console.log(that.data.topicContent, "topicContent")
      })
    }).then(e => {
      //先查询帖主的粉丝是否有参与者
      app.onQuery('poemUsers', { openId: that.data.topicContent.authorId }, { fans: true }).then(g => {
        let data = g.data[0];
        let fans = data.fans;
        let concern = fans.some(item => item === selfOpenId);
        that.setData({
          concern
        })
      })
    })

  },
  //评论区滚动到指定位置
  scrollTop: function (e) {
    let id = e.target.id;
    let scrollTop = e.target.offsetTop;
    if (id === "topicCommont") {
      scrollTop += 35;
    }
    this.setData({
      scrollTop
    })
  },

  emojiInput: function (e) {
    let parentIndex = e.target.dataset.parentindex;
    let index = e.target.dataset.index;
    let emojiSwiper = this.data.emojiSwiper;
    let emoji = emojiSwiper[parentIndex][index];
    let value = this.data.value;
    value = value + emoji;
    this.setData({
      value,
      sendAct: true
    })

  },

  //表情包键盘显示
  emojiShow: function () {
    this.setData({
      emojiShow: true,
      keyboard: 155
    })
  },
  pickupboard: function (e) {
    console.log(e, 'id')
    if (e.type === "tap") {
      this.setData({
        //点击外部时focus为false，keyboard为0，emoji隐藏
        keyboard: 0,
        emojiShow: false,
      })
    }
  },
  inputFocus: function (e) {
    let keyboard = e.detail.height;
    this.setData({
      emojiShow: false,
      keyboard
    })
  },

  bindinput: function (e) {
    let value = e.detail.value;
    if (value === "") {
      this.setData({
        sendAct: false
      })
    } else {
      this.setData({
        sendAct: true
      })
    }
    this.setData({
      value,
    })

  },

  geshihua: function (e) {
    let value = e.replace(/\s+/g, " ");
    value = value.split(" ");
    return value

  },
  //获取发布时间差
  getTimeDiff: function (first1) {
    let date = new Date();
    let first = first1;
    let cha = date - first;
    cha /= 1000;
    cha = Math.floor(cha);
    if (cha >= 31536000) {
      let year = Math.floor(cha / 31536000);
      return (year + "年前");
    } else if (cha >= 86400) {
      let day = Math.floor(cha / 86400);
      return (day + "天前");
    } else if (cha >= 3600) {
      let hour = Math.floor(cha / 3600);
      return (hour + "小时前")
    } else if (cha >= 60) {
      let minute = Math.floor(cha / 60);
      return (minute + "分钟前")
    } else {
      return ("刚刚")
    }
  },

  send: function (e) {//先获取到发布者的openid，然后获取到头像和昵称
    let selfOpenId = app.globalData.selfOpenId;
    let nickName = app.globalData.userInfo.nickName;
    let avatarUrl = app.globalData.userInfo.avatarUrl;
    let index = this.data.topicContent.indexss;
    let time = new Date().getTime();
    let timess = util.formatTime(new Date()).slice(0, 16);
    let that = this;
    let Comment = that.data.Comment;
    let value = this.data.value
    this.setData({
      //点击外部时focus为false，keyboard为0，emoji隐藏
      keyboard: 0,
      emojiShow: false,
      sendAct: false
    })
    if (value.length === 0 || value[0] === "") {
      return
    }
    let object = {//默认时间排序（数据库），
      firstSend: time,
      timess: timess,
      date: that.getTimeDiff(this.data.time),
      articleId: that.data.topicContent.articleId,
      reviewerId: selfOpenId,
      reviewerAvatar: avatarUrl,
      reviewerName: nickName,
      content: this.geshihua(this.data.value),//注意格式首尾去空格，遇空格切为一个item
      collectPeopleID: [],
      collectNum: 0,
      commentNum: 0,
      comment: []
    }
    Comment.unshift(object);
    that.setData({
      Comment,
      value: ""
    })

    /* 数据库更新 */
    wx.cloud.callFunction({
      name: 'updateComplex',
      data: {
        collect: 'comment',
        where: { _id: that.data.topicContent.commentId },
        key: 'content',
        value: Comment
      }
    }).then(() => {
      app.incNum('tearoom', that.data.topicContent.articleId, `commentContent.${index}.commentNum`, 1)
    })

  },

  concern: function () {
    let that = this;
    let concern = that.data.concern;
    let fans;
    let selfOpenId = app.globalData.selfOpenId;
    //先查询帖主的粉丝是否有参与者
    app.onQuery('poemUsers', { openId: that.data.topicContent.authorId }, { fans: true }).then(g => {
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
        concern,
      })
    }).then(res => {
      //更新数据库
      wx.cloud.callFunction({
        name: 'updateComplex',
        data: {
          collect: 'poemUsers',
          where: { openId: that.data.topicContent.authorId },
          key: `fans`,
          value: fans,
        }
      })
    })
  },

  interact: function (e) {
    let that = this;
    let topicContent = that.data.topicContent;
    let Comment = that.data.Comment;
    let id = e.target.id;
    let selfOpenId = app.globalData.selfOpenId;;
    //console.log(topicContent,'topicContent')
    if (id === "topicCollect") {
      //console.log('topicCollect','111')
      if (topicContent.collectYoN)//收藏取消
      {
        topicContent.collectPeopleID = topicContent.collectPeopleID.filter(item => item !== selfOpenId);
        topicContent.collectNum -= 1;

        wx.showToast({
          title: '已取消点赞！',
          duration: 2000
        })

      } else {//确定收藏
        topicContent.collectPeopleID.push(selfOpenId);
        topicContent.collectNum += 1;
        wx.showToast({
          title: '点赞成功！',
          duration: 2000
        })
      }
      //console.log(content, 'content')
      topicContent.collectYoN = !topicContent.collectYoN;

      wx.cloud.callFunction({
        name: 'updateComplex',
        data: {
          collect: 'tearoom',
          where: { _id: that.data.topicContent.articleId },
          key: `commentContent.${that.data.topicContent.indexss}.collectPeopleID`,
          value: topicContent.collectPeopleID
        }
      })
      that.setData({//修改对应数据上传到数据库！
        topicContent,
      })


    }
    if (id === "commentCollect") {
      //console.log('commentCollect','222')
      let index = e.currentTarget.dataset.index;
      let commentYoN = Comment[index].commentYoN;

      if (commentYoN) {
        Comment[index].collectPeopleID = Comment[index].collectPeopleID.filter(item => item !== selfOpenId);
        Comment[index].collectNum -= 1;
        //console.log(Comment[index].collectPeopleID, "id")
        wx.showToast({
          title: '已取消点赞！',
          duration: 2000
        })
      } else {
        Comment[index].collectPeopleID.push(selfOpenId);
        Comment[index].collectNum += 1;
        wx.showToast({
          title: '点赞成功！',
          duration: 2000
        })
      }
      Comment[index].commentYoN = !commentYoN;
      wx.cloud.callFunction({
        name: 'updateComplex',
        data: {
          collect: 'comment',
          where: { _id: that.data.topicContent.commentId },
          key: `content.${index}.collectPeopleID`,
          value: Comment[index].collectPeopleID
        }
      })
      that.setData({//修改对应数据上传到数据库！
        Comment
      })

    }
    if (id === "topicCommont") {

    }
    if (id === "commentC") {

    }

  },

  //更换banner壁纸
  changeBg: function () {
    let that = this;
    let dates = util.formatTime(new Date()).replace(/\/|\s|:/g, "");
    let indexss = that.data.topicContent.indexss;
    let articleId = that.data.topicContent.articleId;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        const path = res.tempFilePaths[0];
        console.log(res, "path")
        wx.showLoading({
          title: '上传中...',
        })

        wx.cloud.init({
          env: 'test-3bvt0'
        })
        wx.cloud.uploadFile({
          cloudPath: `images/${dates}.jpg`,//重复覆盖不灵通？？？
          filePath: path, // 文件路径
        }).then(res => {
          // get resource ID
          let fileID = res.fileID;
          console.log(res.fileID, 'file')
          //在数据库中插入数据 
          app.onUpdate('tearoom', articleId, `commentContent.${indexss}.showImg`, fileID)
            .then(() => {
              that.setData({
                [`topicContent.showImg`]: path,
              })
              console.log('[数据库] [新增壁纸记录] 成功，记录 _id: ');
            }, err => {
              console.error('[数据库] [新增壁纸记录] 失败：', err)
            })
            .then(e => {//数据发送到服务器并反馈成功后页面跳转
            })
          wx.hideLoading()
        }).catch(error => {//图片上传失败
          // handle error
          wx.hideLoading()
        })

      }

    })
  },

  keyboardShou: function () {
    this.setData({
      keyboard: 0,
      emojiShow: false,
      focus: false,
      placeholder: '点击输入文字'

    })
  },

  //精彩回帖,根据点赞数 //倒序排帖
  sort: function (e) {

    let that = this;
    let Comment = that.data.Comment;
    let id = e.target.id;
    let sortAct = that.data.sortAct;
    if (id === "cool") {
      Comment.sort((a, b) => b.collectPeopleID.length - a.collectPeopleID.length)
      sortAct = "cool";
    }
    if (id === "reverse") {
      Comment.reverse();
      sortAct = "reverse";
    }
    that.setData({
      Comment,
      sortAct
    })
  },

  gotoHome: function () {
    let authorId = this.data.topicContent.authorId;
    console.log(authorId, 'id')
    wx.navigateTo({
      url: `../mine/mine?authorId=${authorId}`
    })
  },

  gotoComment: function (e) {//提交commentId & index
    console.log(e, "e")
    let index = e.currentTarget.dataset.index;
    let commentId = this.data.topicContent.commentId;
    let title = this.data.title;
    let articleId = this.data.topicContent.articleId;
    wx.navigateTo({
      url: `../gotoComment/gotoComment?commentId=${commentId}&index=${index}&title=${title}&articleId=${articleId}`
    })
  },
  goBack: function () {
    let pages = getCurrentPages();
    let currPage = null; //当前页面
    let prevPage = null; //上一个页面

    if (pages.length >= 2) {
      currPage = pages[pages.length - 1]; //当前页面
      prevPage = pages[pages.length - 2]; //上一个页面
    }
    if (prevPage) {
      prevPage.setData({
        onLoad: true,
        selectNum:0,
        id:this.data.topicContent.articleId

      });
    }


    app.goBack();
  },
  //返回到对应高度页面

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(this.data.onLoad){
      let options={};
      options.id = this.data.id;
      options.title = this.data.title;
      options.commentId = this.data.commentId;
      options.articleId = this.data.articleId;
      options.index = this.data.index;
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