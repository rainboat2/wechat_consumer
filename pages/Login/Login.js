// pages/Login/Login.js

import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
var utils = require('../../utils/util.js');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    account: '',
    password: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  
  /**
   * 自定义的方法
   */
  changeAccount(event) {
    this.setData({
      account:event.detail,
    })
  },
  changePassword(event) {
    this.setData({
      password:event.detail,
    })
  },
  login(event) {
    // utils.RequestBySessionId({
    //   url: 'http://localhost:8080/login/userlogin',
    //   data: 
    //   {
    //     loginName: this.data.account,
    //     password: this.data.password,
    //     userType: 0,
    //   },
    //   method: 'GET',
    //   success: function (res) {
    //     console.log(res);
    //     if (res.data.status === 1){
    //               Toast.success('登录成功！');
    //               wx.switchTab({
    //                 url: `/pages/home/HomePage/HomePage`
    //               })
    //           }else{
    //               Toast.fail('登录失败，账号密码错误！');
    //           }
    //   },
    //   fail: function () {
    //     console.log("请求失败");
    //   }
    // });
    console.log(this.data.account)
    app.globalData.axios.get(`http://localhost:8080/login/userlogin?loginName=${this.data.account}&password=${this.data.password}&userType=0`).then(r => {
        console.log(r.data);
        wx.setStorageSync("sessionid", r.headers["Set-Cookie"]);
        if (r.data.status === 1){
            Toast.success('登录成功！');
            wx.switchTab({
              url: `/pages/home/HomePage/HomePage`
            })
        }else{
            Toast.fail('登录失败，账号密码错误！');
        }
    });
  }
})