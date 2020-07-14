// component/FoodEvaluation/FoodEvaluation.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    evaluation:{
      value: {},
      type: JSON
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    evaluationDate: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
  },
  lifetimes:{
    attached:function(){
      this.setData({
        evaluationDate: this.properties.evaluation.evaluationDate.substr(0, 10)
      })
    }
  }
})
