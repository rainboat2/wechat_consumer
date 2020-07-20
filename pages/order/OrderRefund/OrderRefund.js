// pages/order/OrderRefund/OrderRefund.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: true,
    items: [
      { name: '时间选错了', value: '时间选错了', checked: '' },
      { name: '菜品选错了', value: '菜品选错了', checked: 'true' },
      { name: '地址选错了', value: '地址选错了', checked: '' },
      { name: '菜品数量选错了', value: '菜品数量选错了', checked: '' },
      { name: '其他', value: '其他', checked: '' },
    ],
    value: '',
    orderId: "",
    reason:"菜品选错了",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderId: options.orderId
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

  },
  reasonChoose: function (e) {
    this.setData({
      reason: e.detail.value
    })
    // console.log(this.data.reason);
  },
  radioChange: function (e) {
    this.setData({
      reason: e.detail.value
    });
  },
  cancel() {
    wx.navigateBack({ changed: true });
  },
  orderCancel() {
    // // console.log(this.data.value);
    // console.log(this.data.reason);
    // console.log(this.data.orderId);
    if (this.data.reason=='其他'){
      this.data.reason == this.data.reason
    }
    // console.log(this.data.reason);
    // console.log(this.data.orderId);
    app.globalData.axios.get('http://localhost:8080/ordermanagement/consumerrefund', {
      params:{
        orderId: this.data.orderId,
        refundReason: this.data.reason,
      }
    }).then(r => {
      if (r.data.status !== 0) {
        wx.showToast({
          title: '已申请退款',
          icon: 'success',
          duration: 3000
        });
      }
    });
    wx.navigateBack({ changed: true });
  },
  input() {
    this.data.items[4].checked = 'true';
    this.data.items[0].checked = 'false';
    this.data.items[1].checked = 'false';
    this.data.items[2].checked = 'false';
    this.data.items[3].checked = 'false';
    this.setData({
      items: this.data.items
    });
    this.setData({
      reason: this.data.reason
    });
    console.log(this.data.value);
  },
})