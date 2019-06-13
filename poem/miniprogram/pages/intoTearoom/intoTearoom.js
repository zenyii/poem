// miniprogram/pages/intoTearoom/intoTearoom.js
const app = getApp();
Page({
  data: {
    id:'',
    onLoad:false,
    emojiSwiper: [],
    keyboard: 0,
    emojiShow: false,
    emojiArr: ["😠", "😩", "😲", "😞", "😵", "😰", "😒", "😍", "😤", "😜", "😝", "😋", "😘", "😚", "😷", "😳", "😃", "😅", "😆", "😁", "😂", "😊", "😄", "😢", "😭", "😨", "😣", "😡", "😌", "😖", "😔", "😱", "😪", "😏", "😓", "😥", "😫", "😉", "🙈", "🙊", "🙉", "🙋", "🙌", "🙍", "🙎", "🙏"],
    emoji: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38"],
    time: '',
    inputValue: [],
    value: '',
    imgSrc: '../../images/',
    teaRoom: {
      _id: '',
      authorId: '112233',//创建一个users表，用于点击头像信息展示
      authorAvatar: '',
      nickName: '室主',
      title: '诗经',
      view: 2233,
      commentNum: 1342,
      showImg: '',
      commentContent: [/* {
        class: '茶',
        firstSend: '',
        date: "16分钟前",
                articleId: "33", 
         reviewerId: '',
        title: '蒹葭',
        poem: ["蒹葭苍苍，白露为霜。", "所谓伊人，在水一方，", "溯洄从之，道阻且长。", "溯游从之，宛在水中央。",
          "蒹葭萋萋，白露未晞。", "所谓伊人，在水之湄。", "溯洄从之，道阻且跻。", "溯游从之，宛在水中坻。", "蒹葭采采，白露未已。",
          "所谓伊人，在水之涘。", "溯洄从之，道阻且右。", "溯游从之，宛在水中沚。"
        ],
        showImg: '',
        authorId: '',
        authorAvatar: '',
        nickName: '一只眼',
        collectNum: 232,
        collectPeopleID: [],
        commentNum: 234,
        commentId: '',//第三季评论记录id，并存入tearoom的_id
      },
      {
        class: '茶',
        firstSend: '',
        date: "16分钟前",
          reviewerId: '', 
        title: '活动3:诗经赏析',
        poem: ["小伙伴们可以选择一首自己喜欢的诗经，针对诗经的一句进行赏析和探讨，与大家一起分享诗经的意蕴。"
        ],
        showImg: '',
        authorId: '',
        authorAvatar: '',
        nickName: '夜雨声烦',
        collectNum: 232,
        collectPeopleID: [],
        commentNum: 234,
        commentId: '',
      } */]
    },

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let topicId =options.id// 'cbdb4c165cfb563701bbd5a641b18038'; //options.id;
    let selfOpenId = app.globalData.selfOpenId;
    //console.log(topicId, "id")
    //拆分emoji
    let emojiArr = that.data.emojiArr;
    let emojiSwiper = that.data.emojiSwiper;
    let left = 10 - emojiArr.length % 10;
    let time = new Date();
    //console.log(left)
    for (var i = left; i >= 0; i--) {
      emojiArr.push("");
    }
    while (emojiArr.length >= 40) {
      emojiSwiper.push(emojiArr.splice(0, 40));
    }
    emojiSwiper.push(emojiArr);
    that.setData({
      time,
      emojiSwiper

    })



    //初始化评论区
    app.onQuery('tearoom', { _id: topicId }, {
      authorId: true, authorAvatar: true, nickName: true,
      title: true, view: true, commentNum: true, showImg: true, commentContent: true
    }).then(res => {
      let data = res.data[0];
      data.view += 1;
          //初始化收藏
     //是否收藏，变换图标样式
     
     let collectYoN;
     data.commentContent.forEach((items, indexs) => {
         collectYoN = items.collectPeopleID.some(item => item === selfOpenId)//selfId
         data.commentContent[indexs].collectYoN = collectYoN;
     });
      that.setData({
        teaRoom: data
      })
    }).then(res => {
      //view+1自增
      app.incNum('tearoom', that.data.teaRoom._id, 'view', 1)
    })



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
        selectNum:2
      });
    }

    app.goBack();
  },


  goToDetail:function(e){
    let articleId = e.currentTarget.dataset.articleid;
    let commentId = e.currentTarget.dataset.commentid;
    let index = e.currentTarget.dataset.index;
    let title = e.currentTarget.dataset.title;
    wx.navigateTo({
      url:`../detailTopic/detailTopic?articleId=${articleId}&commentId=${commentId}&index=${index}&title=${title}`
    })
  },

  //收藏事件
  interact: function (e) {
    let that = this;
    let selfOpenId = app.globalData.selfOpenId;
    //console.log(e,'small');
    let teaRoom = that.data.teaRoom;
    //zhaiItem[0].content[1]="";
    let idEvent = e.target.id;
    let innerIndex = e.currentTarget.dataset.parentindex;
    console.log(innerIndex,"index")
    if (idEvent === 'collect') {//收藏变换
      var commentContent = teaRoom.commentContent[innerIndex];
      if (commentContent.collectYoN)//收藏取消
      {
        commentContent.collectPeopleID = commentContent.collectPeopleID.filter(item => item !== selfOpenId);
        commentContent.collectNum -= 1;

        wx.showToast({
          title: '已取消点赞！',
          duration: 2000
        })

        //app.incNum('tearoom', that.data.teaRoom._id, `commentContent.${innerIndex}.`, 1)

      } else {//确定收藏
        commentContent.collectPeopleID.push(selfOpenId);
        commentContent.collectNum = commentContent.collectNum + 1;
        wx.showToast({
          title: '点赞成功！',
          duration: 2000
        })
      }
      //console.log(content, 'content')
      commentContent.collectYoN = !commentContent.collectYoN;
      //console.log(collectPeopleID,'id');
      //console.log(collectNum,'num')

      that.setData({//修改对应数据上传到数据库！
        teaRoom
      })

      wx.cloud.callFunction({
        name: 'updateComplex',
        data: {
          collect: 'tearoom',
          where: { _id: that.data.teaRoom._id },
          key: `commentContent.${innerIndex}.collectPeopleID`,
          value: commentContent.collectPeopleID
        }
      })
      //console.log(zhaiItem,'zhaiItem');
    }

    if (idEvent === 'commont'){//进入评论区

    }
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

  keyboardShou: function () {
    this.setData({
      keyboard: 0,
      emojiShow: false,
      focus: false,
      placeholder: '点击输入文字'

    })
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
 
  send: function (e) {//先获取到发布者的openid，然后获取到头像和昵称
    let dates = new Date();
    let year = dates.getFullYear();
    let mouth = dates.getMonth();
    let day = dates.getDay();
    dates = `${year}/${mouth}/${day}`;
    let that = this;
    let teaRoom = that.data.teaRoom;
    let Comment = teaRoom.commentContent;
    let value = this.data.value
    let contentArr = this.geshihua(value);
    this.setData({
      //点击外部时focus为false，keyboard为0，emoji隐藏
      keyboard: 0,
      emojiShow: false,
      sendAct: false

    })
    if (value.length === 0 || value[0] === "") {

      return
    }
    //每发一条话题就给一条comment记录
    app.onAdd('comment', {//默认时间排序（数据库），
      content: []
    }).then(resss => {
      let object = {//默认时间排序（数据库），
        date: dates,
        authorAvatar: app.globalData.userInfo.avatarUrl,
        nickName: app.globalData.userInfo.nickName,
        title: contentArr[0],
        poem: contentArr.slice(1),//注意格式首尾去空格，遇空格切为一个item
        collectPeopleID: [],
        collectNum: 0,
        commentNum: 0,
        class: '茶',
        showImg: 'cloud://test-3bvt0.7465-test-3bvt0/images/showbg.png',
        authorId: app.globalData.selfOpenId,
        commentId: resss._id,//第三季评论记录id，并存入tearoom的_id
      }
      Comment.unshift(object);
      that.setData({
        teaRoom,
        value: ""
      })

      /* 数据库更新 */
      console.log(Comment, "comment")
      console.log(that.data.teaRoom._id,'tearoomid')
      wx.cloud.callFunction({
        name: 'updateComplex',
        data: {
          collect: 'tearoom',
          where: { _id: that.data.teaRoom._id },
          key: 'commentContent',
          value: Comment
        }
      }).then(() => {
        //app.incNum('tearoom', that.data.teaRoom._id, 'commentNum', 1)//话题加1！
      })
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
    if(this.data.onLoad){
      let options={};
      options.id = this.data.id;
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
    let that = this;
    //view+1

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