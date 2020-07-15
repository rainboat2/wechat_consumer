// pages/personnal/Address/AddressChange/AddressChange.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"",
    phone:"",
    consumerAddress:{
      addressId:"",
      consumerId:"",
      street:"",
      county:"",
      municipal:"",
      province:"",
    }
  },
  delete(){
    app.globalData.axios.get('http://localhost:8080/consumerAddress/delete', {
                    params:{
                        addressId:this.data.consumerAddress.addressId,
                    }
                }).then(r=>{
                  if(r.data!=0){
                    //Toast.success('删除成功');
                    wx.redirectTo({
                      url: "../Address",
                    })
                }else{
                    //Toast.fail('删除失败');
                }
            })
  },
  change(){
    app.globalData.axios.post('http://localhost:8080/consumerAddress/change',this.data.consumerAddress).then(r=>{
      if(r.data!=0){
          //Toast.success('添加成功');
          wx.redirectTo({
            url: "../Address",
          })
      }else{
          //Toast.fail('添加失败');
      }
  })
  },
  onChangeP(e){
    let a=this.data
    this.data.consumerAddress.province=e.detail;
    this.setData({
      consumerAddress:a.consumerAddress
    })
  },
  onChangeM(e){
    let a=this.data
    this.data.consumerAddress.municipal=e.detail;
    this.setData({
      consumerAddress:a.consumerAddress
    })
  },
  onChangeC(e){
    let a=this.data
    this.data.consumerAddress.county=e.detail;
    this.setData({
      consumerAddress:a.consumerAddress
    })
  },
  onChangeS(e){
    let a=this.data
    this.data.consumerAddress.street=e.detail;
    this.setData({
      consumerAddress:a.consumerAddress
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.globalData.axios.get('http://localhost:8080/usermangement/getuserinfo',{headers:{
      'cookie': wx.getStorageSync("sessionid")
    }}).then(r=>{
      console.log(options.id)
      let a=this.data
      this.data.consumerAddress.consumerId=r.data.list.consumerId
      this.data.consumerAddress.addressId=options.id
      this.data.consumerAddress.province=options.p
      this.data.consumerAddress.municipal=options.m
      this.data.consumerAddress.county=options.c
      this.data.consumerAddress.street=options.s
      this.setData({
                name:r.data.list.name,
                phone:r.data.list.phone,
                consumerAddress:a.consumerAddress
            })
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