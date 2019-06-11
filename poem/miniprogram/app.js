//app.js
App({
  globalData: {
    userId: '',
    hasUserInfo: false,
    userInfo:null,
    selfOpenId: "o6e-P4nvU2HvdRqKOZIwRsw_wgD8",
  },
  onLaunch: function (path) {
    let that = this;
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    // 展示本地存储能力，
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //console.log(path, 'path')
    let query = '';
    let redirect_url = '';
    let userInfo = wx.getStorageSync('userInfo');
    let selfOpenId = wx.getStorageSync('selfOpenId');

      if (selfOpenId || userInfo) {
        that.globalData.userInfo = userInfo;
        that.globalData.selfOpenId = selfOpenId;
      }
      //解析url中是否带有参数，若有则拼接成字符串
      for (let i in path.query) {
        if (i) {
          query = query + i + '=' + path.query[i] + '&'
        }
      }
      if (query) {
        redirec_url = parh.path + '?' + query;
      } else {
        redirect_url = path.path;
      }
      if (!selfOpenId || !userInfo.avatarUrl) {
        wx.reLaunch({
          url: 'pages/login/login?redirect_url=' + encodeURIComponent(`/${redirect_url}`),
        })
        return
      }

  },

  goBack:function(){
    wx.navigateBack({
      delta: 1
    })
  },

  //云开发添加记录
  onAdd: function (collect, data) {
    const db = wx.cloud.database()
    return db.collection(collect).add({
      data: data
    })
  },

  /* 查询记录 */
  onQuery: function (collect, where, field) {
    const db = wx.cloud.database()
    return db.collection(collect).where(where).field(field).get()
  },
  /* 更改记录 */
  onUpdate: function (collect, where, data, value) {
    const db = wx.cloud.database()
    return db.collection(collect).doc(where).update({
      data: {
        [data]: value
      }

    })
  },
  /*  获取一个集合的数据.then(res => {
       res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
       console.log(res.data)
     }) */
  queryCollect: function (collect, filed) {
    const db = wx.cloud.database();
    return db.collection(collect).field(filed).get()
  },

  /* 更改二条记录 */
  onUpdateTwo: function (collect, where, data, value, data1, value1) {
    const db = wx.cloud.database()
    return db.collection(collect).doc(where).update({
      data: {
        [data]: value,
        [data1]: value1
      }

    })
  },

  /* 更改三条记录 */
  onUpdateThree: function (collect, where, data, value, data1, value1, data2, value2) {
    const db = wx.cloud.database()
    return db.collection(collect).doc(where).update({
      data: {
        [data]: value,
        [data1]: value1,
        [data2]: value2
      }
    })
  },
  //自增
  incNum: function (collect, id, key, num) {
    const db = wx.cloud.database()
    const _ = db.command
    return db.collection(collect).doc(id).update({
      data: {
        // 表示指示数据库将字段自增 10
        [key]: _.inc(num)
      }
    })
  },

})
