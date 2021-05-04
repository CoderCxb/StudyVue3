<template>
  <div>
    <h1>选项:Options内容展示</h1>
    <!-- 修改str的值 观察子组件是否响应 -->
    <button @click="str='newStr'">修改传入Data组件的props的str的值</button>
    <!-- @自定义事件时 不要带() 否则接收的参数就变成undefined -->
    <Data :str="str" @login="getSonEvent"></Data>

    <!-- DOM 使用了一下渲染函数 仅此而已 -->
    <DOM></DOM>

    <!-- 这个组件是演示生命周期钩子 -->
    <!-- 切换生命周期组件的显示 触发actived和deactived周期函数 -->
    <div><button @click="showCycleComponent=!showCycleComponent">显示/隐藏生命周期组件</button></div>
    <!-- 使用keep-alive缓存组件 则input输入的内容会被缓存下来 -->
    <!-- 需要注意的是 v-if隐藏组件可以触发deactivated 但是hidden不行 -->
    <keep-alive>
      <LifeCycleComponent v-if="showCycleComponent" :pValue="'传递给LifeCycle组件的value'"></LifeCycleComponent>
    </keep-alive>
    <!-- 资源 主要是演示了自定义指令的使用 -->
    <Asset></Asset>
    <!-- 组合  -->
    <Composition></Composition>
    <!-- <div v-myDirective>普通元素使用指令</div>
    <p>data的动态数据:{{dynamicData}}</p>
    <p>setup的动态数据:{{dynamicSetupData}}</p>
    <button @click="changeDynamicData">修改dynamicData</button> -->
  </div>
</template>

<script lang="ts">
import Data from './Data.vue';
import DOM from './DOM.vue';
import LifeCycleComponent from './LifeCycle.vue';
import Asset from './Asset.vue';
import Composition from './Composition.vue';
export default {
  name:"App",
  inheritAttrs:false,
  data(){
    return{
      str:'父组件给子组件props数据str',
      dynamicData:'data的动态数据',
      showCycleComponent:true
    }
  },
  // 组合API 无法通过this的方式访问组件实例
  // props就是传递进来的参数对象
  // context包含 attrs slots emit三个实例方法 
  // console.log('参数context:',context)
  setup(props,{attrs,emit,slots}){
    // console.log('setup中的this:',this);  // undefined
    // 默认情况下 props是响应式的 但是如果去解构他 解构出来的数据就不是响应式的了 可以使用toRef/toRefs解构
    console.log('setup的props:',props);
    console.log('setup的context包含:',attrs,emit,slots);
  },

  // 使用到的子组件
  components:{
    Data,DOM,LifeCycleComponent,Asset,Composition
  },

  // 有组件的绝大部分属性以及生命周期
  mixins:[
    {created(){console.log('组件级别mixins的created');}}
  ],


  // 在setup中就是onErrorCaptured(()=>{})
  // 当捕获一个来自子孙组件的错误时被调用。此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。
  // 如果此 errorCaptured 钩子自身抛出了一个错误，则这个新错误和原本被捕获的错误都会发送给全局的 config.errorHandler
  errorCaptured(err,instance,info){
      console.log('onErrorCaptured捕获异常',err,instance,info)
      // 此钩子可以返回 false 以阻止该错误继续向上传播
      return false;
  },
  methods:{
    getSonEvent(value){
      console.log('父组件接收的值:',value)
    },
    changeDynamicData(){
      this.$data.dynamicData='新data的动态数据';
      this.dynamicSetupData='新setup的动态数据';
      console.log(this.dynamicSetupData);
    }
  }
}
</script>