// miniprogram/pages/gotoComment/gotoComment.js
const app = getApp();
const util = require('../../utils/util.js');
/* const selfOpenId = app.globalData.selfOpenId;
const nickName = app.globalData.userInfo.nickName;
const avatarUrl = app.globalData.userInfo.avatarUrl; */
Page({
  data: {
    imgSrc: '../../images/',
    page: {},
    sendAct: false,
    emojiSwiper: [],
    keyboard: 0,
    emojiShow: false,
    emojiArr: ["😠", "😩", "😲", "😞", "😵", "😰", "😒", "😍", "😤", "😜", "😝", "😋", "😘", "😚", "😷", "😳", "😃", "😅", "😆", "😁", "😂", "😊", "😄", "😢", "😭", "😨", "😣", "😡", "😌", "😖", "😔", "😱", "😪", "😏", "😓", "😥", "😫", "😉", "🙈", "🙊", "🙉", "🙋", "🙌", "🙍", "🙎", "🙏"],
    emoji: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38"],
    time: '',
    inputValue: [],
    value: '',
    id: "",//被回复者id
    name: "",//被回复者名字
    avatar:'',//被回复者头像
    placeholder: '点击输入文字'
  },
  onLoad: function (options) {
    let that = this;
    let selfOpenId = app.globalData.selfOpenId;
    let commentId =options.commentId; //"dec80a9e5cfb982001e7d9b17e34c811";//options.commentId;
    let index =options.index;// 0;// options.index;
 
    let articleId = options.articleId;
    let title = options.title;

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
      emojiSwiper,
      commentId,
      index,
      articleId,
      title
    })


    app.onQuery('comment', { _id: commentId }, { content: true }).then(res => {
      let data = res.data[0];
      let page = data.content[index];
      page.firstSend = page.timess;
      //判断收藏
      let collectYoN = page.collectPeopleID.some(item => item === selfOpenId);
      that.setData({
        page,
        collectYoN
      })
    })
  },

  interact: function (e) {
    let that = this;
    let page = that.data.page;
    let selfOpenId = app.globalData.selfOpenId;
    let collectYoN = that.data.collectYoN;
    if (collectYoN)//收藏取消
    {
      page.collectPeopleID = page.collectPeopleID.filter(item => item !== selfOpenId);
      wx.showToast({
        title: '已取消收藏！',
        duration: 2000
      })

    } else {//确定收藏
      page.collectPeopleID.push(selfOpenId);
      wx.showToast({
        title: '已收藏！',
        duration: 2000
      })
    }
    //console.log(content, 'content')
    collectYoN = !collectYoN;

    wx.cloud.callFunction({
      name: 'updateComplex',
      data: {
        collect: 'comment',
        where: { _id: that.data.commentId },
        key: `content.${that.data.index}.collectPeopleID`,
        value: page.collectPeopleID
      }
    })
    that.setData({//修改对应数据上传到数据库！
      page,
      collectYoN
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
  keyboardShou: function () {
    this.setData({
      keyboard: 0,
      emojiShow: false,
      focus: false,
      name: '',
      id: '',
      placeholder: '点击输入文字'

    })
  },

  inputBlus: function () {
    let that = this;
    if (!that.data.emojiShow) {
      that.setData({
        keyboard: 0,
        focus: false,
        name: '',
        id: '',
        placeholder: '点击输入文字'

      })
    }

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

  gotoMine: function (e) {
    let id = e.currentTarget.dataset.id;
    console.log(id,'id')
    wx.navigateTo({
      url:`../mine/mine?authorId=${id}`
    })
  },

  commentSend: function (e) {
    console.log(e, 'e')
    let id = this.data.id;
    let name = this.data.name;
    let avatar = this.data.avatar;
    let placeholder = this.data.placeholder;
    id = e.currentTarget.dataset.id;
    name = e.currentTarget.dataset.name;
    avatar = e.currentTarget.dataset.avatar;
    if (name) {
      placeholder = `回复 ${name}`;
    }
    this.setData({
      focus: true,
      id,
      name,
      avatar,
      placeholder
    })

    console.log(this.data.id, 'data')
  },
  send: function (e) {//先获取到发布者的openid，然后获取到头像和昵称
    let that = this;
    let selfOpenId = app.globalData.selfOpenId;
    let nickName = app.globalData.userInfo.nickName;
    let avatarUrl = app.globalData.userInfo.avatarUrl;
    let time = new Date();
    time = util.formatTime(time)
    let times = time.slice(0, 16);
    //time = `${dates} ${times}`;//获取时间格式
    let page = this.data.page;//实时更新
    let comment = page.comment;
    let value = this.data.value;
    let index  = this.data.index;
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
      date: times,
      reviewerId: selfOpenId,
      reviewerName: nickName,
      reviewerAvatar:avatarUrl,
      content: that.data.value,
      beReviewerId: that.data.id,
      beReviewerName: that.data.name,
      beReviewerAvatar:that.data.avatar
    }
    let commentList = {
      commentId:that.data.commentId,
      content:that.data.value,
      date: times,
      reviewerId: selfOpenId,
      reviewerName: nickName,
      reviewerAvatar:avatarUrl,
      index:index,
      authorAvatar:page.reviewerAvatar,
      article:page.content.join('')
    }
    comment.push(object);
  
    that.setData({
      page,
      value: "",
      placeholder: '点击输入文字',
      id: '',
      name: ''
    })
    /* 数据库更新 */
    wx.cloud.callFunction({
      name: 'updateComplex',
      data: {
        collect: 'comment',
        where: { _id: that.data.commentId },
        key: `content.${that.data.index}.comment`,
        value: comment
      }
    }).then(res=>{  //通知更新
      wx.cloud.callFunction({
        name: 'update2Complex',
        data: {
          collect: 'poemUsers',
          where: { openId: page.reviewerId },
          key: 'commentList',
          value: commentList,
          key1:'newCMsg',
          value1:true
        }
      })
    })

  
    if(that.data.name)//被回复者
    {

    }
    //app.onUpdate('poemUsers','')


  },
  goBack:function(){
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
        articleId:this.data.articleId,
        title:this.data.title,
        commentId:this.data.commentId,
        index:this.data.index
      });
    }
    app.goBack();
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