// pages/personnal/Point/Point.js
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalPoint:0,
    pointDetail:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTotalPoint();
    this.getPointDetail();
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
  //获取总积分
  getTotalPoint(){
    app.globalData.axios.get(`http://localhost:8080/point/consumerseetotalpoint`,
    {headers:{
      'cookie':wx.getStorageSync('sessionid')
    }}).then(r => {
        console.log(r.data.totalPoint);
        if (r.data!=null){
          this.setData({
            totalPoint : r.data.totalPoint,
          })
        }else{
        }
    });
},

//获取积分明细
getPointDetail(){
  app.globalData.axios.get(`http://localhost:8080/point/consumerseepoints`,
  {headers:{
    'cookie':wx.getStorageSync('sessionid')
  }}).then(r => {
        console.log(r.data);
        if (r.data.list!=null){
          this.setData({
            pointDetail : r.data.list,
          })
            // this.data.pointDetail = r.data.list;
            // console.log(this.data.pointDetail.length);
        }else{
        }
    });
},
})