// component/FoodDetail/FoodDetail.js
const app = getApp();
const server = "http://localhost:8080";
const serverRes = "http://localhost:8080/res";
const getFoodByIdUrl = server + "/food/getbyid";
const getCommentByFoodIdUrl = server + "/commentmangement/searchcomment";
const insertShoppingCartDetailUrl = server + "/shoppingcart/insertdetailforcurrentconsumer";
const avgGradeUrl = server + "/commentmangement/avggrade";

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    foodId:{
      value: 1,
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    food: {picture: 'default.jpeg'},
    rate: 4.6,
    showDescription: false,
    evaluations: [],
    commentPageInfo:{
        pageSize: 10,
        pageNum: 1,
        totalNum: 0,
        loading: false,
        finished: false,
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    addToCart:function(){
      console.log("add to cart");
    },
  },
  lifetimes: {
    attached: function () {
      app.globalData.axios.get(getFoodByIdUrl, {params:{foodId: this.properties.foodId}}).then(r=>{
        this.setData({food: r.data.food});
      });
    // 获取评分
    app.globalData.axios.get(avgGradeUrl, {"params": {
            foodId: this.properties.foodId
        }}).then(r =>{
            if (r.data.avgGrade === null)
                this.setData({rate: 5});
            else
                this.setData(parseFloat(r.data.avgGrade.toFixed(1)));
      });

      // 获取评论
      app.globalData.axios.get(getCommentByFoodIdUrl,{
          params:{
              pageNum: 1,
              pageSize: 15,
              foodId: this.data.foodId
          }
      }).then(r =>{
          this.setData({
            evaluations: r.data.list.list
          });
      });
    },
  },
})
