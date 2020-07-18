// pages/order/Order/Order.js
import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog';
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';
var utils = require('../../../utils/util.js');

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:"1",
    orderList: [],//全部
    obligationList: [],//待支付
    evaluateList: [],//待评价
    refundList: [],//退款/售后
    unRecivedList:[],//未接收
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(app.globalData.index)
    this.setData({
      index:app.globalData.index,
    })
    app.globalData.index="1"

    // utils.RequestBySessionId({
    //   url: 'http://localhost:8080/ordermanagement/consumerviewnostate',
    //   method: 'GET',
    //   success: function (res) {
    //     console.log(res);
    //   },
    //   fail: function () {
    //     console.log("请求失败");
    //   }
    // });

    this.initialOrders();
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
  //点击订单图片
  orderDetail(event){
    let orderId = event.currentTarget.dataset.x.orderId;
    console.log(orderId);
    wx.navigateTo({
      url: `/pages/order/OrderDetail/OrederDetail?orderId=${orderId}`
    })
    // wx.navigateTo({
    //   url: `/pages/order/OrderDetail/OrederDetail`
    // })
  },
  //点击评价按钮
  evaluateOrder(event){
    let orderId = event.currentTarget.dataset.x.orderId;
    console.log(orderId);
    wx.navigateTo({
      url: `/pages/order/FoodEvaluate/FoodEvaluate?orderId=${orderId}`
    })
  },
  //点击取消订单按钮
  cancelOrder(event){
    let orderId = event.currentTarget.dataset.x.orderId;
    console.log(orderId);
    wx.navigateTo({
      url: `/pages/order/OrderCancel/OrederCancel?orderId=${orderId}`
    })
  },
  //点击支付订单按钮
  payOrder(event){
    let orderId = event.currentTarget.dataset.x.orderId;
    console.log(orderId);
    wx.navigateTo({
      url: `/pages/order/OrderPayment/OrderPayment?orderId=${orderId}`
    })
  },
  //点击退款按钮
  refundOrder(event){
    let orderId = event.currentTarget.dataset.x.orderId;
    console.log(orderId);
    wx.navigateTo({
      url: `/pages/order/OrderRefund/OrderRefund?orderId=${orderId}`
    })
  },
  //点击派送情况按钮
  sendMap(event){
    let orderId = event.currentTarget.dataset.x.orderId;
    console.log(orderId);
    wx.navigateTo({
      url: `/pages/order/OrderSendingMap/OrderSendingMap?orderId=${orderId}`
    })
  },
  //点击再来一单按钮
  againOrder(event){
    let orderId = event.currentTarget.dataset.x.orderId;
    console.log(orderId);
    app.globalData.axios.get(`http://localhost:8080/ordermanagement/consumerreorder?orderId=${orderId}`,
      {
        headers: {
          'cookie': wx.getStorageSync("sessionid")
        }
      }
    ).then(r => {
      wx.navigateTo({
        url: `/pages/order/OrderPay/OrderPay?orderId=${orderId}`
      })
    });
  },
  //点击确认收货按钮
  receiveOrder(event){
    let orderId = event.currentTarget.dataset.x.orderId;
    console.log(orderId);
    Dialog.confirm({
      title: '提示',
      message: '确定要确认收货吗？',
    }).then(() => {
      app.globalData.axios.post(`http://localhost:8080/ordermanagement/consumerconfirm`, {
        headers: {
          'cookie': wx.getStorageSync("sessionid")
        }
      },
        {
          orderId: orderId,
        }
      ).then(r=>{
        console.log(r);
        if(r.data.status==1){
          Toast.success('确认收货成功！');
          this.setData({
            orderList: [],
            obligationList: [],
            evaluateList: [],
            refundList: [],
          });
          this.initialOrders();
        }else if(r.data.status==2){
          Toast.error('骑手未送达！');
        }else{
          Toast.error('确认收货失败！');
        }
      });
    }).catch(() => {});
  },
  //将日期转化为yyyy-mm-dd hh:mm:ss的格式
  resolvingDate(date) {//date是传入的时间
    let d = new Date(date);
    let month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
    let day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
    let hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
    let min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
    let sec = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
    let times = d.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + min + ':' + sec;
    return times
  },
  //初始化订单列表
  initialOrders(event) {

    app.globalData.axios.get(`http://localhost:8080/ordermanagement/consumerviewnostate`,{headers:{
      'cookie': wx.getStorageSync("sessionid")
    }}

    ).then(r => {
        console.log(r.data);
        if(r.data!=null){
          let orderList = [];
          let obligationList = [];
          let evaluateList = [];
          let refundList = [];
          let unRecivedList = [];
            for(let i=0;i<r.data.list.length;i++){
                r.data.list[i].orderTime = '下单时间：'+this.resolvingDate(r.data.list[i].orderTime);
                r.data.list[i].orderDetailList[0].food.picture = 'http://localhost:8080/res/'+r.data.list[i].orderDetailList[0].food.picture;
                let amount = 0;
                for(let j=0;j<r.data.list[i].orderDetailList.length;j++){
                    amount = amount + r.data.list[i].orderDetailList[j].amount;
                    r.data.list[i].title = '本次订单共计'+ amount +'个菜品';
                }
                if(r.data.list[i].orderState==0){
                    r.data.list[i].state='未支付';
                    r.data.list[i].ifEvaluate=false;
                    r.data.list[i].ifCancel=true;//可以取消订单
                    r.data.list[i].ifPay=true;//可以支付订单
                    r.data.list[i].ifRefund=false;
                    r.data.list[i].ifAgain=false;
                    r.data.list[i].ifReceive=false;
                    r.data.list[i].ifSendMap=false;
                    obligationList.push(r.data.list[i]);//待支付
                }else if(r.data.list[i].orderState==1){
                    r.data.list[i].state='已取消';
                    r.data.list[i].ifEvaluate=false;
                    r.data.list[i].ifCancel=false;
                    r.data.list[i].ifPay=false;
                    r.data.list[i].ifRefund=false;
                    r.data.list[i].ifAgain=true;//可以再来一单
                    r.data.list[i].ifReceive=false;
                    r.data.list[i].ifSendMap=false;
                }else if(r.data.list[i].orderState==2){
                    r.data.list[i].state='已支付';
                    r.data.list[i].ifEvaluate=false;
                    r.data.list[i].ifCancel=false;
                    r.data.list[i].ifPay=false;
                    r.data.list[i].ifRefund=true;//可以退款
                    r.data.list[i].ifAgain=true;//可以再来一单
                    r.data.list[i].ifReceive=false;
                    r.data.list[i].ifSendMap=false;
                }else if(r.data.list[i].orderState==3){
                    r.data.list[i].state='商家已接单';
                    r.data.list[i].ifEvaluate=false;
                    r.data.list[i].ifCancel=false;
                    r.data.list[i].ifPay=false;
                    r.data.list[i].ifRefund=true;//可以退款
                    r.data.list[i].ifAgain=true;//可以再来一单
                    r.data.list[i].ifReceive=false;
                    r.data.list[i].ifSendMap=true;//可以看派送情况
                    unRecivedList.push(r.data.list[i]);
                }else if(r.data.list[i].orderState==4){
                    r.data.list[i].state='骑手已接单';
                    r.data.list[i].ifEvaluate=false;
                    r.data.list[i].ifCancel=false;
                    r.data.list[i].ifPay=false;
                    r.data.list[i].ifRefund=false;
                    r.data.list[i].ifAgain=true;//可以再来一单
                    r.data.list[i].ifReceive=false;
                    r.data.list[i].ifSendMap=true;//可以看派送情况
                    unRecivedList.push(r.data.list[i]);
                }else if(r.data.list[i].orderState==5){
                    r.data.list[i].state='退款中';
                    r.data.list[i].ifEvaluate=false;
                    r.data.list[i].ifCancel=false;
                    r.data.list[i].ifPay=false;
                    r.data.list[i].ifRefund=false;
                    r.data.list[i].ifAgain=true;//可以再来一单
                    r.data.list[i].ifReceive=false;
                    r.data.list[i].ifSendMap=true;//可以看派送情况
                    refundList.push(r.data.list[i]);//退款/售后
                }else if(r.data.list[i].orderState==6){
                    r.data.list[i].state='已退款';
                    r.data.list[i].ifEvaluate=false;
                    r.data.list[i].ifCancel=false;
                    r.data.list[i].ifPay=false;
                    r.data.list[i].ifRefund=false;
                    r.data.list[i].ifAgain=true;//可以再来一单
                    r.data.list[i].ifReceive=false;
                    r.data.list[i].ifSendMap=false;
                    refundList.push(r.data.list[i]);
                }else if(r.data.list[i].orderState==7){
                    r.data.list[i].state='已送达';
                    r.data.list[i].ifEvaluate=false;
                    r.data.list[i].ifCancel=false;
                    r.data.list[i].ifPay=false;
                    r.data.list[i].ifRefund=false;
                    r.data.list[i].ifAgain=true;//可以再来一单
                    r.data.list[i].ifReceive=true;//可以确认收货
                    r.data.list[i].ifSendMap=false;
                }else if(r.data.list[i].orderState==8){
                    r.data.list[i].state='已完成';
                    r.data.list[i].ifEvaluate=true;//可以评价
                    r.data.list[i].ifCancel=false;
                    r.data.list[i].ifPay=false;
                    r.data.list[i].ifRefund=false;
                    r.data.list[i].ifAgain=true;//可以再来一单
                    r.data.list[i].ifReceive=false;
                    r.data.list[i].ifSendMap=false;
                    evaluateList.push(r.data.list[i]);//待评价
                }else if(r.data.list[i].orderState==9){
                    r.data.list[i].state='已结束';
                    r.data.list[i].ifEvaluate=false;
                    r.data.list[i].ifCancel=false;
                    r.data.list[i].ifPay=false;
                    r.data.list[i].ifRefund=false;
                    r.data.list[i].ifAgain=true;//可以再来一单
                    r.data.list[i].ifReceive=false;
                    r.data.list[i].ifSendMap=false;
                }else if(r.data.list[i].orderState=='a'){
                    r.data.list[i].state='已评价';
                    r.data.list[i].ifEvaluate=false;
                    r.data.list[i].ifCancel=false;
                    r.data.list[i].ifPay=false;
                    r.data.list[i].ifRefund=false;
                    r.data.list[i].ifAgain=true;//可以再来一单
                    r.data.list[i].ifReceive=false;
                    r.data.list[i].ifSendMap=false;
                }
            }
            orderList = r.data.list;
            this.setData({
              orderList: orderList,
              obligationList: obligationList,
              evaluateList: evaluateList,
              refundList: refundList,
              unRecivedList:unRecivedList,
            });
        }
    });
  }
})