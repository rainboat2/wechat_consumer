// pages/component/FoodCard/FoodCard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    food: {
      type: JSON,
      value: {},
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    
  },
  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  lifetimes: {
    attached: function () {
      console.log("attach");
      console.log(this.properties.food);
    },
  },
})
