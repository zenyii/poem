// miniprogram/pages/createPoemList/createPoemList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    poemList:[
      {name:"诗集一" , url:"../../images/myPoem1.png"},
      {name: "诗集二", url: "../../images/myPoem2.png" },
    ],
    isEdit:false,
    selectItem:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  toEdit:function(){
    this.setData({
      isEdit:true
    })
  },

  delete:function(){
    for (let x = 0; x < this.data.selectItem.length;x++){
      let temp = parseInt(this.data.selectItem[x]);
      this.data.poemList.splice(temp,1);
    }
    this.setData({
      isEdit: false,
      poemList:this.data.poemList
    })
  },

  select:function(e){
    this.data.selectItem = e.detail.value;
  },

  goHome:function(){
    let temp = this.data.isEdit?true:false;
    if(temp){
      this.setData({
        isEdit:false
      })
    }else{
      console.log("页面跳转");
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