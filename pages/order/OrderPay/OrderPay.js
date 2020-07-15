// pages/order/OrderPay/OrderPay.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    currentTime: '12:00',
    minHour: "",
    maxHour: "23",
    minMinute: "",

    point: "",
    address: "",
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
      couponIdList: []
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const disabledCoupon=[];
    disabledCoupon.push({
                id: 1,
                denominations: 1,
                originCondition:1,
                value:1,
                name: 1,
                reason: '不满足最低使用金额',	//不可用原因，优惠券不可用时展示
                startAt: 1489104000,//卡有效开始时间 (时间戳, 单位秒)
                endAt: 1514592000//卡失效日期 (时间戳, 单位秒)
    });
    console.log(disabledCoupon);
    this.setData({
      disabledCoupons:disabledCoupon
    });
    console.log(this.data.disabledCoupons);
    // app.globalData.axios.get('http://localhost:8080/shoppingcart/search').then(r => {
    //   this.setData({
    //     shoppingCart: r.data.list,
    //     num = r.data.list.length,
    //     totalFee = r.data.totalFee,
    //     actualAmount = r.data.totalFee,
    //     primaryFee = r.data.totalFee,
    //     price = r.data.totalFee * 100,
    //   });
    //   app.globalData.axios.get('http://localhost:8080/coupon/seecoupon').then(r => {
    //     let j = 0
    //     for (let i = 0; i < r.data.list.length; i++) {
    //       if (r.data.list[i].couponState === '1') {
    //         if (this.data.totalFee >= r.data.list[i].coupon.leastUseFee) {
    //           this.data.coupons.push({
    //             id: r.data.list[i].couponId,//优惠券id
    //             denominations: (r.data.list[i].coupon.fee * 100),//优惠券金额 单位分
    //             originCondition: (r.data.list[i].coupon.leastUseFee * 100), //满减规则金额 单位分 为0显示无门槛
    //             value: (r.data.list[i].coupon.fee * 100),//折扣券优惠金额，单位分
    //             name: r.data.list[i].coupon.name,//优惠券名称
    //             startAt: 1489104000,//卡有效开始时间 (时间戳, 单位秒)
    //             endAt: 1514592000//卡失效日期 (时间戳, 单位秒)
    //           });
    //         } else {
    //           this.data.disabledCoupons.push({
    //             id: r.data.list[i].couponId,//优惠券id
    //             denominations: (r.data.list[i].coupon.fee * 100),//优惠券金额 单位分
    //             originCondition: (r.data.list[i].coupon.leastUseFee * 100), //满减规则金额 单位分 为0显示无门槛
    //             value: (r.data.list[i].coupon.fee * 100),//折扣券优惠金额，单位分
    //             name: r.data.list[i].coupon.name,//优惠券名称
    //             reason: '不满足最低使用金额',	//不可用原因，优惠券不可用时展示
    //             startAt: 1489104000,//卡有效开始时间 (时间戳, 单位秒)
    //             endAt: 1514592000//卡失效日期 (时间戳, 单位秒)
    //           });
    //         }
    //       } else {
    //         this.data.disabledCoupons.push({
    //           id: r.data.list[i].couponId,//优惠券id
    //           denominations: (r.data.list[i].coupon.fee * 100),//优惠券金额 单位分
    //           originCondition: (r.data.list[i].coupon.leastUseFee * 100), //满减规则金额 单位分 为0显示无门槛
    //           value: (r.data.list[i].coupon.fee * 100),//折扣券优惠金额，单位分
    //           name: r.data.list[i].coupon.name,//优惠券名称
    //           reason: '已使用',	//不可用原因，优惠券不可用时展示
    //           startAt: 1489104000,//卡有效开始时间 (时间戳, 单位秒)
    //           endAt: 1514592000//卡失效日期 (时间戳, 单位秒)
    //         });
    //       }
    //     }
    //   });
    // });
    app.globalData.axios.get('http://localhost:8080/point/consumerseetotalpoint').then(r => {
      const colum = [];
      for (let i = 0; i < r.data.totalPoint; i++) {
        this.data.columns.push(i + 1);
      }
      this.setData({
        point : r.data.totalPoint,
        columns: colum,
      });
      conso.log(colum);
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