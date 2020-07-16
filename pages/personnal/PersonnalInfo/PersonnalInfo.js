// pages/personnal/PersonnalInfo/PersonnalInfo.js
import axios from 'axios'
import mpAdapter from 'axios-miniprogram-adapter'
axios.defaults.adapter = mpAdapter
axios.defaults.withCredentials = true;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    consumerId: "",
    name: "",
    gender: "",
    phone: "",
    //newPhone: "",
    email: "",
    //newEmail: "",
    account: "",
    password: "",
    nickname: "sa",
    //newNickname: "",
    head: "",
    headPic: "",
  },
  jump1(){
    app.globalData.index="2"
    wx.switchTab({
      url: '../../order/Order/Order',
       success(res){
            let page = getCurrentPages().pop();
            if(page == undefined || page == null){
                  return
            }
            page.onLoad();
          }
        })
  },
  jump2(){
    console.log(2)
    app.globalData.index="1"
    wx.redirectTo({
      url: '../../order/OrderS/OrderS',
       success(res){
            let page = getCurrentPages().pop();
            if(page == undefined || page == null){
                  return
            }
            page.onLoad();
          }
        })
  },
  jump3(){
    app.globalData.index="2"
    wx.redirectTo({
      url: '../../order/OrderS/OrderS',
       success(res){
            let page = getCurrentPages().pop();
            if(page == undefined || page == null){
                  return
            }
            page.onLoad();
          }
        })
  },
  jump4(){
    app.globalData.index="4"
    wx.switchTab({
      url: '../../order/Order/Order',
       success(res){
            let page = getCurrentPages().pop();
            if(page == undefined || page == null){
                  return
            }
            page.onLoad();
          }
        })
  },
  change: function(){
    wx.navigateTo({
      url: '../InfoChange/InfoChange'
    })
  },  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.globalData.axios.get('http://localhost:8080/usermangement/getuserinfo',{headers:{
      'cookie': wx.getStorageSync("sessionid")
    }}).then(r=>{
      this.setData({
                consumerId:r.data.list.consumerId,
                name:r.data.list.name,
                gender:r.data.list.gender,
                account:r.data.list.account,
                head:r.data.list.head,
                nickname:r.data.list.nickname,
                email:r.data.list.email,
                phone:r.data.list.phone,
                password:r.data.list.password,
                headPic:"http://localhost:8080/res/"+r.data.list.head,
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