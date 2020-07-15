// pages/personnal/Address/Address.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:""
  },

  edit(e){
    let id=e.currentTarget.dataset.id
    let p=e.currentTarget.dataset.p
    let m=e.currentTarget.dataset.m
    let c=e.currentTarget.dataset.c
    let s=e.currentTarget.dataset.s
    wx.redirectTo({
      url: `AddressChange/AddressChange?p=`+p+`&m=`+m+`&c=`+c+`&s=`+s+`&id=`+id,
    })
  },
  add(){
wx.redirectTo({
      url: "AddressAdd/AddressAdd",
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.globalData.axios.get('http://localhost:8080/consumerAddress/SearchById',{headers:{
    'cookie': wx.getStorageSync("sessionid")
  }}).then(r=>{
        this.setData({
          info:r.data.list,
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