// pages/home/HomePage/HomePage.js
const app = getApp()

const server = "http://localhost:8080";
const categoryUrl = server + "/foodcategory/all";
const getFoodUrl = server + "/food/getfood";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    account: '30001',
    password: '123456',
    carouselImage:[
      {url: "/images/carouselImage/1.jpg", foodId: '1'},
      {url: "/images/carouselImage/2.jpg", foodId: '2'},
      {url: "/images/carouselImage/3.jpg", foodId: '3'},
      {url: "/images/carouselImage/4.jpg", foodId: '4'},
      {url: "/images/carouselImage/5.jpg", foodId: '5'},
    ],
    foodCategories: [],
    hotFoods:[],
    recommendFoods: [],
    showPop: false,
    popFoodId: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data);
    // app.globalData.axios.get("http://localhost:8080/test").then(r=>{
    //   console.log(r);
    // })
    // app.globalData.axios.get(`http://localhost:8080/login/userlogin?loginName=${this.data.account}&password=${this.data.password}&userType=0`).then(r => {
    //                 console.log(r);
    //                 wx.setStorageSync("sessionid", r.headers["Set-Cookie"]);
                    
    //             });
    //查询所有的食品类别信息
    app.globalData.axios.get(categoryUrl).then(r => {
      const categories = Array(r.data.list.length);
      for (let i = 0; i < categories.length; i++){
          categories[i] = r.data.list[i];
      }
      this.setData({
        foodCategories: categories
      });
    });

    app.globalData.axios.get(getFoodUrl, {"params":{
          pageSize: 30,
          pageNum: 1,
          categoryId: '',
          keyword: '',
          orderBy: -1,
          isDesc: 'false'
      }}).then(r=>{
      const foods = r.data.list;
      this.setData({
        hotFoods: foods.slice(0, 10),
        recommendFoods: foods.slice(10, 30)
      });
      console.log(this.data.hotFoods);
    });
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
   * 用于首页菜品图片的跳转
   */
  jumpToDetailPage: function(event){
    const foodId = event.currentTarget.dataset.foodid;
    console.log(foodId);
    this.setData({
      popFoodId: foodId,
      showPop: true
    })
    // wx.navigateTo({
    //   url: `/pages/order/FoodEvaluate/FoodEvaluate?foodId=2`,
    // })
  },
  onPopClose: function(){
    this.setData({
      showPop: false
    })
  },
  jumpToFoodCategory(event){
    const category = event.currentTarget.dataset.category;
    console.log(category);
    const url = `/pages/category/FoodCategory/FoodCategory?categoryName=${category.foodCategory}`;
    wx.switchTab({
      url: url,
    });
  },
})