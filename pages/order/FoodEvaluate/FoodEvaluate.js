// pages/order/FoodEvaluate/FoodEvaluate.js
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';

const app = getApp();
const server = "http://localhost:8080";
const serverRes = "http://localhost:8080/res";
const getOrderUrlById = server + "/ordermanagement/consumerviewone";
const insertCommentUrl = server + "/commentmangement/insertcommentwithfilename";
const uploadPhotoUrl = server + "/upload";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeKey: '',
    orderId: 1,
    order: '',
    selectedFood: '',
    selectedFoodGrade: 5,
    photoList: [],
    evaluation: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.orderId !== undefined)
      this.setData({ orderId: options.orderId });

    app.globalData.axios.get(getOrderUrlById, {
      params: {
        orderId: this.data.orderId
      }
    }).then(r => {
      this.setData({
        order: r.data.list,
        activeKey: 0,
        selectedFood: r.data.list.orderDetailList[0].food
      });
    });
  },

  changeHandler(event) {
    this.setData({
      activeKey: event.detail,
      selectedFood: this.data.order.orderDetailList[event.detail].food
    })
    this.clearForm();
  },
  clearForm() {
    this.setData({
      photoList: [],
      evaluation: '',
      selectedFoodGrade: 5
    });
  },
  afterRead(event) {
    const { file } = event.detail;
    console.log(file);
    const _this = this;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: uploadPhotoUrl,
      filePath: file[0].path,
      name: 'photo',
      formData: { user: 'test' },
      success(res) {
        // 上传后更新photoList
        console.log(res);
        const { photoList = [] } = _this.data;
        photoList.push({ ...file, url: serverRes + "/" + res.data, fileName: res.data });
        _this.setData({ photoList });
      },
    });
  },
  submitEvaluate() {
    const evaluation = {
      orderId: this.data.order.orderId,
      consumerId: this.data.order.consumerId,
      content: this.data.evaluation,
      foodId: this.data.selectedFood.foodId,
      grade: this.data.selectedFoodGrade,
      photos: []
    };
    for (let photo of this.data.photoList)
      evaluation.photos.push(photo.fileName);
    console.log(evaluation);
    app.globalData.axios.post(insertCommentUrl, evaluation).then(r => {
      if (r.data.status === 1) {
        Toast.success("评论发表成功");
        this.clearForm();
      } else {
        Toast.success("评论失败，返回状态码为: " + r.data.status);
      }
    }).catch(error => {
      Toast.fail(error.message);
    })
  },
  goBack() {
    console.log("go back");
    wx.navigateBack({ changed: true });
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