// pages/category/FoodCategory/FoodCategory.js
const app = getApp();
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';
const server = "http://localhost:8080";
const serverRes = "http://localhost:8080/res";
const categoryUrl = server + "/foodcategory/all";
const getFoodUrl = server + "/food/getfood";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryName: "",
    loading: false,
    finished: false,
    keyword: '',
    activeKey: '0',
    foodCategories: [
      { foodCategoryId: '1', foodCategory: '小吃炸串', foodCategoryDescription: '' },
    ],
    popupFoodId: '',
    showPop: false,
    showPop1: false,
    foods: [],
    price:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.globalData.axios.get('http://localhost:8080/shoppingcart/search',{headers:{
      'cookie': wx.getStorageSync("sessionid")
    }}).then(r=>{
               this.setData({
                 price:r.data.totalFee*100
               })
            });
    this.setData({
      categoryName: options.categoryName
    })
    app.globalData.axios.get(categoryUrl).then(r => {
      const categories = Array(r.data.list.length);
      for (let i = 0; i < categories.length; i++) {
        categories[i] = r.data.list[i];
      }
      this.setData({
        foodCategories: categories
      })
      this.setActiveKey();
      this.searchFoods();
    });
  },

  /**
   * 自定义方法
   */
  changeFee(){
    app.globalData.axios.get('http://localhost:8080/shoppingcart/search',{headers:{
      'cookie': wx.getStorageSync("sessionid")
    }}).then(r=>{
               this.setData({
                 price:r.data.totalFee*100
               })
            });
  },
  
  setActiveKey() {
    // 依据路由传来的菜品类别，设置左侧的菜品类别导航栏
    const categoryName = this.data.categoryName;
    let activeKey = 0;
    if (categoryName !== undefined) {
      for (let i = 0; i < this.data.foodCategories.length; i++) {
        if (this.data.foodCategories[i].foodCategory === categoryName) {
          activeKey = i;
          break;
        }
      }
    }
    this.setData({
      activeKey: activeKey
    });
  },
  addToCart(event) {
    let _this=this
    const food = event.currentTarget.dataset.food;
    console.log(food.foodId);
    app.globalData.axios.get('http://localhost:8080/shoppingcart/insertdetailforcurrentconsumer',{headers:{
      'cookie': wx.getStorageSync("sessionid")
    },
    params: {
      foodId: food.foodId,
      foodAmount: 1,
  }
  }).then(r=>{
    if (r.data.status === 1){
      Toast.success('添加成功！');
      app.globalData.axios.get('http://localhost:8080/shoppingcart/search',{headers:{
      'cookie': wx.getStorageSync("sessionid")
    }}).then(r=>{
               this.setData({
                 price:r.data.totalFee*100
               })
               _this.load=_this.selectAllComponents('#shopping-cart')
            });
  }else{
      Toast.fail('添加失败，请稍尝试！');
  }
            });
  },
  onPopClose(){
    this.setData({
      showPop: false
    })
  },
  fieldChange(event){
    this.setData({
      keyword: event.detail
    });
    this.searchFoods();
  },
  searchFoods() {
    app.globalData.axios.get(getFoodUrl, {
      "params": {
        pageSize: 20,
        pageNum: 1,
        categoryId: this.data.foodCategories[this.data.activeKey].foodCategoryId,
        keyword: this.data.keyword,
        orderBy: -1,
        isDesc: false
      }
    }).then(r => {
      for (let i = 0; i < r.data.list.length; i++){
        let desc = r.data.list[i].foodDescribe;
        desc = desc.replace("<br>", "");
        if (desc.length > 20)
          desc = desc.substr(0, 20) + "...";
        r.data.list[i].foodDescribe = desc;
      }
      this.setData({
        foods: r.data.list
      })
    });
  },
  handleChange(event){
    this.setData({
      activeKey: event.detail
    });
    this.searchFoods();
  },
  goBack() {
    const url = `/pages/home/HomePage/HomePage`;
    wx.switchTab({
      url: url,
    })
  },
  goShoppingCart() {
    this.setData({
      showPop: true
    })
  },
  toFoodDetail(event) {
    const food = event.currentTarget.dataset.food;
    console.log(food.foodId);
    this.setData({
      popupFoodId: food.foodId,
      showPop1: true
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