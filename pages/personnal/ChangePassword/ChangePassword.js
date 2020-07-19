// pages/personnal/ChangePassword/ChangePassword.js
const app = getApp()
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    consumerId: '',
    name: '',
    gender: '',
    phone: '',
    email: '',
    account: '',
    nickname: '',
    head: '',
    headPic: '',
    password:'',
    oldpwd:null,
    newpwd:null,
    confirmpwd:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  onChangeOldpwd(event) {
    // event.detail 为当前输入的值
    this.setData({
      oldpwd:event.detail,
    })
  },
  onChangeNewpwd(event) {
    // event.detail 为当前输入的值
    this.setData({
      newpwd:event.detail,
    })
  },
  onChangeConfirmpwd(event) {
    // event.detail 为当前输入的值
    this.setData({
      confirmpwd:event.detail,
    })
  },
  changepwd(){
    console.log(this.data.confirmpwd);
    if(this.data.oldpwd==null||this.data.newpwd == null || this.data.confirmpwd == null){
        Toast.fail('请输入必填项！');
    }
    else{
      if(this.data.confirmpwd!=this.data.newpwd){
        Toast.fail('两次密码输入不一致！');
        this.setData({
          confirmpwd:null,
          newpwd:null,
        })
      }
      else{
        app.globalData.axios.get(`http://localhost:8080/usermangement/getuserinfo`,
        {headers:{
          'cookie':wx.getStorageSync('sessionid')
        }}).then(r => {
            console.log(r.data.list);
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
              })
              if(this.data.oldpwd!=this.data.password){
                Toast.fail('旧密码输入错误，请重试！');
                  this.setData({
                      oldpwd:null,
                      newpwd:null,
                      confirmpwd:null,
                  })
              }
              else{
                app.globalData.axios.get(`http://localhost:8080/usermangement/changeusermessage`,{params:{
                          consumerId:this.data.consumerId,
                          name:this.data.name,
                          gender:this.data.gender,
                          phone:this.data.phone,
                          email:this.data.email,
                          account:this.data.account,
                          password:this.data.newpwd,
                          nickname:this.data.nickname,
                          head:this.data.head
                  }}).then(r => {
                      if(r.data.status==1){
                        Toast({
                          type: 'success',
                          message: '修改成功',
                          onClose: () => {
                            wx.switchTab({
                              url: '../../personnal/PersonnalInfo/PersonnalInfo'
                           })
                          },
                        });
                      }
                      else{
                          Toast.fail('修改失败，请重试！');
                          this.setData({
                            oldpwd:null,
                            newpwd:null,
                            confirmpwd:null,
                           })
                      }
                  });
              }
          });
      };
    }
  },
})

