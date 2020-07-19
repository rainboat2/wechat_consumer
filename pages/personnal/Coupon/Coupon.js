// pages/personnal/Coupon/Coupon.js

import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    canGetCoupons: [],
    cannotGetCoupons: [],
    canUseCoupons: [],
    cannotUseCoupons: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initialCoupons();
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
  pageTo(){
    wx.redirectTo({
            url: '/pages/personnal/PersonnalInfo/PersonnalInfo'
         })
  },
  showPopup() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },

  /**
   * 自定义的方法
   */
  //领取红包
  getCoupon(event){
    let couponId = event.currentTarget.dataset.x.couponId;
    console.log(couponId);
    if(couponId!=undefined){
      app.globalData.axios.get(`http://localhost:8080/coupon/usecoupon?couponID=${couponId}`,{headers:{
        'cookie': wx.getStorageSync("sessionid")
      }}
      ).then(r=>{
        if(r.data.status==1){
          this.setData({
            canGetCoupons: [],
            cannotGetCoupons: [],
            canUseCoupons: [],
            cannotUseCoupons: [],
          });
          this.initialCoupons();
          Toast.success('领取红包成功！');
        }else{
          Toast.error('领取红包失败！');
        }
      });
    }
  },
  //将日期转化为yyyy-mm-dd的格式
  resolvingDate(date) {//date是传入的时间
    let d = new Date(date);
    let month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
    let day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
    let times = d.getFullYear() + '-' + month + '-' + day;
    return times
  },
  //查询红包列表
  initialCoupons(event){
    app.globalData.axios.get(`http://localhost:8080/coupon/usefulcoupon`,{headers:{
      'cookie': wx.getStorageSync("sessionid")
    }}
    ).then(r=>{
      let list = r.data.list;
      console.log(list);
      if(list!=null){
        for(let i=0;i<list.length;i++){
          list[i].expirationTime = this.resolvingDate(list[i].expirationTime);
        }
        this.setData({
          canGetCoupons: list,
        });
      }
    });
    app.globalData.axios.get(`http://localhost:8080/coupon/seecoupon`,{headers:{
      'cookie': wx.getStorageSync("sessionid")
    }}
    ).then(r=>{
      let list = r.data.list;
      console.log(list);
      if(list!=null){
        let canUseCoupons = [];
        let cannotGetCoupons = [];
        let cannotUseCoupons = [];
        for(let i=0;i<list.length;i++){
          list[i].coupon.expirationTime = this.resolvingDate(list[i].coupon.expirationTime);
          let myDate = new Date();
          let now = myDate.valueOf();
          let time = new Date(list[i].coupon.expirationTime).valueOf();
          if(list[i].couponState=='1' && now<time){
            canUseCoupons.push(list[i]);
            cannotGetCoupons.push(list[i]);
          }else{
            cannotUseCoupons.push(list[i]);
            cannotGetCoupons.push(list[i]);
          }
        }
        this.setData({
          canUseCoupons: canUseCoupons,
          cannotGetCoupons: cannotGetCoupons,
          cannotUseCoupons: cannotUseCoupons,
        });
      }
    });
    
    
  },
})