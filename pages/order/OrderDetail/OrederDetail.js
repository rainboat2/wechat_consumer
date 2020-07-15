// pages/order/OrderDetail/OrederDetail.js
const app = getApp()
// const server = "http://localhost:8080";
// const categoryUrl = server + "/foodcategory/all";
// const getFoodUrl = server + "/food/getfood";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    picLocation: 'http://localhost:8080/res/',
    order: [],
    orderState: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.globalData.axios.get('http://localhost:8080/ordermanagement/consumerviewone', {"params": {
      orderId: options.orderId,
      }}).then(r => {
        this.setData({
          order: r.data.list
        });
        if (this.data.order.orderState == '0') {
          this.setData({
            orderState: "订单未支付"
          });
        }
        if (this.data.order.orderState == '1') {
          this.setData({
            orderState: "订单已取消"
          });
        }
        if (this.data.order.orderState == '2') {
          this.setData({
            orderState: "订单已支付"
          });
        }
        if (this.data.order.orderState == '3') {
          this.setData({
            orderState: "商家已接单"
          });
        }
        if (this.data.order.orderState == '4') {
          this.setData({
            orderState: "骑手已接单"
          });
        }
        if (this.data.order.orderState == '5') {
          this.setData({
            orderState: "退款中"
          });
        }
        if (this.data.order.orderState == '6') {
          this.setData({
            orderState: "订单已退款"
          });
        }
        if (this.data.order.orderState == '7') {
          this.setData({
            orderState: "骑手已送达"
          });
        }
        if (this.data.order.orderState == '8') {
          this.setData({
            orderState: "订单已完成(未评价)"
          });
        }
        if (this.data.order.orderState == '9') {
          this.setData({
            orderState: "订单已结束"
          });
        }
        if (this.data.order.orderState == 'a') {
          this.setData({
            orderState: "订单已评价"
          });
        }
        console.log(this.data.orderState);
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
   * 自定义的方法
   */
  cancel: function() {
    wx.navigateBack({ changed: true });
})