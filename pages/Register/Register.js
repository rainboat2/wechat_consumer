// pages/Register/Register.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account: '',
    password: '',
    name:'',
    nickname:'',
    phone:'',
    email:'',
    gender:'',
    emailPattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
    phonePattern: /^1[3456789]\d{9}$/,
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
  changeName(event) {
    this.setData({
      name:event.detail,
    })
  },
  changeGender(event) {
    this.setData({
      gender:event.detail,
    })
  },
  changeNickname(event) {
    this.setData({
      nickname:event.detail,
    })
  },
  changePhone(event) {
    this.setData({
      phone:event.detail,
    })
  },
  changeEmail(event) {
    this.setData({
      email:event.detail,
    })
  },
  register(event) {
    console.log(this.data.phone);
    console.log(this.data.email);
    console.log(this.data.account);
    console.log(this.data.password);
    console.log(this.data.name);
    console.log(this.data.nickname);
    console.log(this.data.gender);
    app.globalData.axios.post(`http://localhost:8080/login/customeregister`,
      {
        phone: this.data.phone,
        email: this.data.email,
        account: this.data.account,
        password: this.data.password,
        name: this.data.name,
        nickname: this.data.nickname,
        gender: this.data.gender,
      }
    ).then(r=>{
      console.log(r.data);
      if (r.data.status === 1){
        Toast.success('注册成功！');
        wx.navigateTo({
          url: `/pages/Login/Login`
        })
      }else{
        Toast.fail('注册失败！');
      }
    });
  },
})