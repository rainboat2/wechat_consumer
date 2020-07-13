// pages/personnal/InfoChange/InfoChange.js
import Toast from '@vant/weapp/toast/toast';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    consumerId: "",
    name: "",
    gender: "",
    phone: "",
    //newPhone: "",
    email: "",
    //newEmail: "",
    account: "",
    password: "",
    nickname: "sa",
    //newNickname: "",
    head: "",
    headPic: "",
  },
  afterRead(event) {
    const { file } = event.detail;
    var self = this
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'http://localhost:8080/usermangement/getPicName', // 仅为示例，非真实的接口地址
      filePath: file.path,
      name: 'mf',
      header: { "Content-Type": "multipart/form-data" },
      formData: { oldname: this.data.head },
      success(res) {
        console.log(res.data)
        self.setData({
          head:res.data,
          headPic:"http://localhost:8080/res/"+res.data,
        })
        self.change();
      },
    })
  },
  change(){
    app.globalData.axios.get('http://localhost:8080/usermangement/changeusermessage',{
                      params:{
                          consumerId:this.data.consumerId,
                          name:this.data.name,
                          gender:this.data.gender,
                          phone:this.data.phone,
                          email:this.data.email,
                          account:this.data.account,
                          password:this.data.password,
                          nickname:this.data.nickname,
                          head:this.data.head
                      }},{
                        headers:{
                          'cookie': wx.getStorageSync("sessionid")
                        }
                      }
                    ).then(r=>{
                      if (r.data.status!=0){
                          Toast.success('修改成功');
                      }else{
                          Toast.fail('修改失败');
                      }
                  })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.globalData.axios.get('http://localhost:8080/usermangement/getuserinfo',{headers:{
      'cookie': wx.getStorageSync("sessionid")
    }}).then(r=>{
      this.setData({
                consumerId:r.data.list.consumerId,
                name:r.data.list.name,
                gender:r.data.list.gender,
                account:r.data.list.account,
                head:r.data.list.head,
                nickname:r.data.list.nickname,
                email:r.data.list.email,
                phone:r.data.list.phone,
                password:r.data.list.password,
                headPic:"http://localhost:8080/res/"+r.data.list.head,
            })
            console.log(this.data.headPic)
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