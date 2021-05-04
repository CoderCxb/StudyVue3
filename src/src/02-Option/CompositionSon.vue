<template>
  <div>
    <h3>演示 组合的子组件</h3>
    <!-- 注入父组件的provide 测试provide使用computed的响应式 -->
    <p>inject父元素data的数据: {{dynamicData.value}}</p>
    <p>inject父元素setup的数据: {{dynamicSetupData.value}}</p>

    <!-- 使用inject的方法 -->
    <button @click="provideMethod">provide注入的method</button>

    <!-- 直接获取的props响应式 默认解构会破坏响应式 -->
    <p>props直接获取:{{tip}}  |  解构props获取：{{dTip}}</p>
  </div>
</template>
<script lang='ts'>
import { toRef, toRefs } from 'vue';
export default { 
  // 当父组件对子组件绑定一个不被认为是props的属性时，默认会被浏览器当作attribute作用于子组件 设置为false则不会
  // 注意：context.attrs还是可以获取到 只是页面上的标签不会显示
  inheritAttrs:false,
  setup(props:any,context){
    console.log(context.attrs);
    
    // 将数据从props中解构 解构出来的结果是非响应式的
    var dTip=props.tip;              // 默认没有响应式
    // var dTip=toRef(props,'tip');  // 响应式
    // var dTip=toRefs(props).tip;   // 响应式
    return {dTip}
  },

  props:['tip'],

  // 可以通过inject可以获取到上层元素的provide数据
  // inject:['provideData','provideMethod'，'dynamicData','dynamicSetupData']
  inject:{
    provideData:{
      default:'默认值',
      from:"Composition"
    },
    provideMethod:{},
    dynamicData:{},
    dynamicSetupData:{}
  }
}
</script>