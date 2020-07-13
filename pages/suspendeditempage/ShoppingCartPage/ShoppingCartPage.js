// pages/suspendeditempage/ShoppingCartPage/ShoppingCartPage.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shoppingCartList:"",
    totalFee:"",
    index:""
  },
  change:function(e){
    let index=e.currentTarget.dataset.id
     console.log(e.detail);
    this.data.shoppingCartList[index].foodAmount=e.detail
    this.setData({
     index:this.data.shoppingCartList
   })
     app.globalData.axios.get('http://localhost:8080/shoppingcart/change',{
         params:{
             shoppingCartDetailId:this.data.shoppingCartList[index].shoppingCartDetailId,
             foodAmount:this.data.shoppingCartList[index].foodAmount
         }
     }).then(r=>{
       this.setData({
         shoppingCartList:this.data.index
       })
     });
 },
 clear(){
   app.globalData.axios.get('http://localhost:8080/shoppingcart/clear',{headers:{
     'cookie': wx.getStorageSync("sessionid")
   }}).then(r=>{
       if (r.data.states!==0){
           this.setData({
             shoppingCartList:""
           })
           Toast.success('清空成功');
       }else {
           Toast.fail('清空失败');
       }
   })
 },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.globalData.axios.get('http://localhost:8080/shoppingcart/search',{headers:{
      'cookie': wx.getStorageSync("sessionid")
    }}).then(r=>{
      console.log(r.data.list)
      for (let i=0;i<r.data.list.length;i++) {
        r.data.list[i].food.picture="http://localhost:8080/res/"+r.data.list[i].food.picture;
        console.log(r.data.list[i].food.picture)
      }
      this.setData({
        shoppingCartList:r.data.list,
        totalFee:r.data.totalFee,
      })
      console.log(this.data.shoppingCartList)
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