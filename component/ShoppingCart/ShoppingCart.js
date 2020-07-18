// component/ShoppingCart/ShoppingCart.js
const app = getApp();
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    data: {
      shoppingCartList:"",
      totalFee:"",
      index:""
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
       var value = 123;
    this.triggerEvent('changeFee', value)
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
     var value = 123;
    this.triggerEvent('changeFee', value)
   },
  
  },
  lifetimes: {
    attached: function () {
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
  },
})
