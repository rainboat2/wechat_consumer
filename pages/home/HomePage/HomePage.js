// pages/home/HomePage/HomePage.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account: '30001',
    password: '123456',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data);
    // app.globalData.axios.get("http://localhost:8080/test").then(r=>{
    //   console.log(r);
    // })
    app.globalData.axios.get(`http://localhost:8080/login/userlogin?loginName=${this.data.account}&password=${this.data.password}&userType=0`).then(r => {
                    console.log(r);
                    wx.setStorageSync("sessionid", r.headers["Set-Cookie"]);
                    // if (r.data.status === 1){
                    //     this.$toast.success('登录成功！');
                    //     this.$router.push("/consumerframe");
                    // }else{
                    //     this.$toast.fail('登录失败，账号密码错误！');
                    // }
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

  }
})