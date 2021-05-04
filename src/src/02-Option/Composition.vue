<template>
  <div>
    <h3>演示 组合</h3>
    <!-- 组件的优先级>mixins>extends 当组件和mixins和extends定义了相同的方法/数据等时 以这个优先级使用-->
    <div><button @click="log">打印</button></div>

    <div><button @click="changeData">修改传递给子组件的值,观察provide使用computed依赖data和setup的数据是否可以响应式</button></div>

    <div><button @click="tip='新提示'">修改tip,验证解构的props没有响应式</button></div>
    <!-- 子组件  -->
    <CompositionSon :tip="tip" :test="'测试'"></CompositionSon>
  </div>
</template>

<script>
import { computed,ref } from 'vue';
import CompositionSon from './CompositionSon.vue';
export default {
  data(){
    return {
      dynamicData:'data的数据',
      tip:'提示'
    }
  },
  // 优先级: 组件>mixins>extends 

  // 用于扩展组件 传递的是一个对象或者返回对象的函数 有生命周期 method等 无props  即只能扩展一次  基本等效与 mixins:[{}]
  extends:{
    methods:{
      log(){
        console.log('extends的方法');
      }
    },
  },
  // mixins为一个对象数组 每一个对象都基本等效与一个组件 有生命周期 method等 无props 
  mixins:[{
    methods:{
      log(){
        console.log('mixins的方法');
      },
    },
  }],

  // provide/method/以及写在setup外的生命周期函数是可以通过this访问组件的实例 如this.$data 
  // provide 为下层组件提供数据/方法
  provide(){
    // console.log(this.$data);
    return {
      'provideData':'上层组件provide给下层组件的数据',// 非响应式
      // 默认情况下 provide和inject是非响应式的 可以使用computed来使它相应 无论是data的数据还是setup的数据都适用
      'dynamicData':computed(()=>this.$data.dynamicData),
      'dynamicSetupData':computed(()=>this.dynamicSetupData),
      'provideMethod':()=>{console.log('为下层组件提供方法');}
    }
  },

  methods:{
    log(){
      console.log('组件的方法');
    },
    changeData(){
      this.$data.dynamicData='新的data的数据';
      this.dynamicSetupData='新的setup的数据';
    }
  },

  setup(){
    let dynamicSetupData=ref('setup的数据')
    return {dynamicSetupData}
  },
  components:{CompositionSon}
}
</script>

<style>

</style>