// pages/suspendeditempage/AnnouncementPage/AnnouncementPage.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:'',
    beginDate:'',
    endDate:'',
    show:false,
    minDate: new Date(2020, 0, 1).getTime(),
    maxDate: new Date().getTime(),
    activeNames:['1'],
    announcement:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAnnouncement();
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
  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },
  formatDateShow(date) {
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  },
  //规范化日期传递服务端格式
  formatDateController(date){
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  },
  onDisplay() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  onConfirm(event) {
      const [start, end] = event.detail;
      this.setData({
        show:false,
        beginDate:this.formatDateController(start),
        endDate:this.formatDateController(end),
        date:`${this.formatDateShow(start)} - ${this.formatDateShow(end)}`
      })
  },
  resetDate(){
    this.setData({
      date : '',
      beginDate : '',
      endDate:'',
    })
      
  },
  back(){
    wx.navigateBack({
    })
  },
  getAnnouncement(){
    app.globalData.axios.get(`http://localhost:8080/announcement/searchallannouncement`,{params:{
              beginTime:this.data.beginDate,
              endTime:this.data.endDate,
          }}).then(r => {
          console.log(r.data);
          if (r.data.list!=null){
            this.setData({
              announcement : r.data.list,
            })
          }else{
          }
      });

  },
})