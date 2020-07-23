// pages/order/OrderPay/OrderPay.js
import axios from 'axios'
import mpAdapter from 'axios-miniprogram-adapter'
axios.defaults.adapter = mpAdapter
axios.defaults.withCredentials = true;
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressValue:false,
    pointTitle:"选择使用积分",
    couponTitle:"选择使用红包",

    price: 0,
    couponPrice: 0,
    pointPrice: 0,

    remark: "",//备注
    pPoint: "",//积分
    columns: [],
    pointValue: false,//积分表
    phone: false,//号码保护
    radio: '',
    //红包相关
    chosenCoupon: -1,
    coupons: [],
    disabledCoupons: [],
    showList: false,
    coupon: [],

    addressTitle: '到货地址',
    addressTime: '到货时间',
    //送餐时间
    timeValue: false,
    currentTime: '09:00',
    minHour: "",
    maxHour: "23",
    minMinute: "",

    point: "",
    address: [],
    shoppingCart: [],
    picLocation: 'http://localhost:8080/res/',
    totalFee: "",
    primaryFee: "",
    actualAmount: "",
    num: "",

    orderInfo: {
      scheduledTime: "",
      amountBeforeref: "",
      prefAmount: "",
      actualAmount: "",
      deliveryAmount: "",
      pointNum: "",
      orderRemark: "",
      arriveAddress: "",
      shopId:1,
      couponIdList: []
    },
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.globalData.axios.get('http://localhost:8080/shoppingcart/search', {
      headers: {
        'cookie': wx.getStorageSync("sessionid")
      }
    }).then(r => {
      this.setData({
        shoppingCart: r.data.list,
        num : r.data.list.length,
        totalFee : r.data.totalFee,
        actualAmount : r.data.totalFee,
        primaryFee : r.data.totalFee,
        price : r.data.totalFee * 100,
      });
      console.log(r.data.list);
      app.globalData.axios.get('http://localhost:8080/coupon/seecoupon', {
        headers: {
          'cookie': wx.getStorageSync("sessionid")
        }
      }).then(r => {
        let j = 0
        let a = '红包ID';
        let b = '红包优惠-￥';
        const tdisabledCoupons = [];
        const tcoupons = [];
        tcoupons.push('无红包');
        for (let i = 0; i < r.data.list.length; i++) {
          if (r.data.list[i].couponState === '1') {
            if (this.data.totalFee >= r.data.list[i].coupon.leastUseFee) {
              tcoupons.push('红包ID' + (r.data.list[i].couponId) + "红包优惠-￥" + (r.data.list[i].coupon.fee));
            } else {
              tdisabledCoupons.push('红包ID' + (r.data.list[i].couponId) + "红包优惠-￥" + (r.data.list[i].coupon.fee));
            }
          } else {
            tdisabledCoupons.push('红包ID' + (r.data.list[i].couponId) + "红包优惠-￥" + (r.data.list[i].coupon.fee));
          }
        }
        this.setData({
          disabledCoupons: tdisabledCoupons,
          coupons: tcoupons,
        });
        console.log(this.data.disabledCoupons);
        console.log(this.data.coupons);
      });
    });

    app.globalData.axios.get('http://localhost:8080/point/consumerseetotalpoint', {
      headers: {
        'cookie': wx.getStorageSync("sessionid")
      }
    }).then(r => {
      const colum = [];
      for (let i = 0; i < r.data.totalPoint; i++) {
        colum.push(i + 1);
      }
      this.setData({
        point : r.data.totalPoint,
        columns: colum,
      });
      console.log(colum);
      console.log(this.data.columns);
    });
    app.globalData.axios.get('http://localhost:8080/consumerAddress/SearchById', {
      headers: {
        'cookie': wx.getStorageSync("sessionid")
      }
    }).then(r => {
      const taddress=[];
      for (let i = 0; i < r.data.list.length; i++) {
        taddress.push(r.data.list[i].province + r.data.list[i].municipal + r.data.list[i].county + r.data.list[i].street);
      };
      this.setData({
        address: taddress,
      });
      console.log(r.data.list);
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
   showArriveTime() {
    this.setData({
      timeValue: true,
    });
    var myDate = new Date;
    var h = myDate.getHours();//获取当前小时数(0-23)
    var m = myDate.getMinutes();//获取当前分钟数(0-59)
    console.log("当前时间" + h + m);
    this.setData({ minHour: h, });
    if (m >= 40) {
      this.setData({
        minHour: h + 1,
        minMinute: 20 - (60 - m),
      });
    } else {
      if (m >= 35) {
        this.setData({
          minHour: h,
          minMinute: 55,
        });
      } else {
        this.setData({
          minHour: h,
          minMinute: m + 14,
        });
      }
    }
  },
  timeCancel(){
    this.setData({
      timeValue: false,
    });
  },
  arriveTime(event) {
    // console.log(event.detail);
    this.setData({
      addressTime: event.detail,
      timeValue: false,
    });
  },
  filter(type, options) {
    if (type === 'minute') {
      return options.filter((option) => option % 5 === 0);
    }
    return options;
  },
  timeChage(event) {
    var myDate = new Date;
    var h = myDate.getHours();//获取当前小时数(0-23)
    var m = myDate.getMinutes();//获取当前分钟数(0-59)
    var time = h + ":59"
    var time1 = (h + 1) + ":59"
    console.log(event.detail);
    // this.setData({ currentTime: event.detail});
    if (event.detail >= time) {
      if (m >= 40 && event.detail <= time1) {
        this.setData({minMinute: 20 - (60 - m)});
      }else {
        this.setData({minMinute:0});
      }
    } else {
      this.setData({minMinute: m+20});
    }
  },
  showAddress(){
    this.setData({ addressValue: true });
  },
  arriveAddress(event) {
    const { picker, value, index } = event.detail;
    if (this.data.addressTitle=="到货地址"){
      this.setData({
        addressTitle: value,
        addressValue: false,
        price: this.data.price + 1000,
      });
    }
    this.setData({
      addressTitle: value,
      addressValue: false,
    });
  },
  showCoupon() {
    this.setData({couponValue: true });
  },
  couponConfirm(event) {
    const { picker, value, index } = event.detail;
    console.log(value);
    if(value=='无红包'){
      let cc = this.data.price;
      cc = cc + (this.data.couponPrice * 100);
      this.setData({
        price: cc,
        couponPrice: 0,
      });
      this.setData({
        couponTitle: value,
        couponValue: false,
      });
    }else{
      let bb = this.data.price;
      bb = bb + (this.data.couponPrice * 100);
      bb = bb - (value.split('￥')[1] * 100);
      if (bb <= 0) {
        wx.showToast({
          title: '使用后金额为负无法使用',
          icon: 'none',
          duration: 1000
        });
      } else {
        this.setData({
          price: bb,
          couponPrice: value.split('￥')[1],
        });
        console.log(value.split('￥')[1]);
        this.setData({
          couponTitle: value,
          couponValue: false,
        });
      }
    }
  },

  showPoint() {
    this.setData({ pointValue: true });
  },
  pointConfirm(event) {
    const { picker, value, index } = event.detail;
    let aa=this.data.price;
    aa = aa+(this.data.pointPrice*100);
    aa = aa-(value*100);
    if(aa<=0){
      wx.showToast({
        title: '使用后金额为负无法使用',
        icon: 'none',
        duration: 1000
      });
    }else{
      this.setData({
        pointTitle: value,
        pointValue: false,
      });
      this.setData({
        price: aa,
        pointPrice: value
      });
    }
  },
  onClose(){
    this.setData({
      addressValue: false,
      timeValue: false,
      couponValue: false,
      pointValue: false,
    });
  },
  onCancel() {
    this.setData({
      addressValue: false,
      timeValue: false,
      couponValue: false,
      pointValue: false,
    });
  },
   radioChange: function (e) {
    this.setData({
      remark: e.detail.value
    });
  },
  reonChange(event) {
    this.setData({
      remark: event.detail
    });
  },
  onSubmit() {
    console.log(this.data.addressTitle);
    console.log(this.data.addressTime);
    console.log(this.data.couponTitle);
    console.log(this.data.pointTitle);
    console.log(this.data.remark);
    console.log(this.data.price);
    console.log(this.data.pointPrice);
    var j = Number(this.data.couponPrice);
    console.log(j);
    if (this.data.addressTime != '到货时间') {
      var myDate = new Date;
      this.data.orderInfo.scheduledTime = (myDate.toLocaleDateString() + " " + this.data.addressTime)
    } else {
      wx.showToast({
        title: '请选择到货时间',
        icon: 'none',
        duration: 1000
      });
      return;
    }
    if (this.data.addressTitle != '到货地址') {
      this.data.orderInfo.arriveAddress = this.data.addressTitle;
    } else {
      wx.showToast({
        title: '请选择到货地址',
        icon: 'none',
        duration: 1000
      });
      return;
    }

    if (this.data.pointTitle !='选择使用积分') {
      this.data.orderInfo.pointNum = this.data.pointTitle
    } else {
      this.data.orderInfo.pointNum = 0;
    }
    if (this.data.remark) {
      this.data.orderInfo.orderRemark = this.data.remark
    } else {
      this.data.orderInfo.orderRemark = "无";
    }
    let a1 = this.data.couponTitle.split('红包优惠')[0];
    let b1 = a1.split('D')[1];
   
    if (this.data.couponTitle != '选择使用红包') {
      if (this.data.couponTitle == '无红包'){
        this.data.orderInfo.couponIdList[0] = 0;
      }else{
        this.data.orderInfo.couponIdList[0] = parseInt(b1);
      }
    } else {
      this.data.orderInfo.couponIdList[0] = "无红包";
    }
    this.data.orderInfo.amountBeforeref = 10+this.data.actualAmount;//初始金额
    this.data.orderInfo.prefAmount = ((this.data.pointPrice + j));//优惠金额
    this.data.orderInfo.actualAmount = (10+this.data.price/100);
    this.data.orderInfo.deliveryAmount = "10";

    console.log(this.data.orderInfo);
    app.globalData.axios.post('http://localhost:8080/ordermanagement/consumerorder',this.data.orderInfo, {
      headers: {
        'cookie': wx.getStorageSync("sessionid"),
        // 'orderInfo' : this.data.orderInfo,
      }
    }).then(r => {
      if (r.data.status === '0') {
        console.log("添加失败");
        // this.$message.success('添加成功！');
        // location.reload()
      } else {
        console.log("添加成功");
        wx.showToast({
          title: '下单成功',
          icon: 'success',
          duration: 2000
        });
        // Toast.success('下订单成功');
        // this.$router.push({
        //   path: "/consumer/order",
        // });
      }
    });
    wx.navigateBack({ changed: true });
  },


})