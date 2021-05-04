<template>
 <div>
  <div>
    <h6>使用全局属性:{{globalName}}</h6>
    <!-- 扩展组件 -->

    <!--  -->
    <RenderComponent></RenderComponent>
    <DefineComponent></DefineComponent>
    <DefineAsyncComponent></DefineAsyncComponent>
    <!-- <component :is="DefineComponent"></component> -->
  </div>
  <br>
  <!-- 使用指令 -->
  <!-- <div v-myDirective>
    组件级别指令
  </div> -->
  <!-- <div v-AppDirective>
    APP级别的指令
  </div>  -->
  <br>
 </div>
</template>

<!-- script标签添加lang="ts" 则可以支持ts语法 -->
<script lang="ts">
import {defineAsyncComponent, defineComponent, h, nextTick, resolveComponent, resolveDirective, resolveDynamicComponent} from 'vue'
export default {
  name:"App",
  beforeCreate(){
    // 无论是this.$nextTick(()=>{})还是 nextTick(()=>{}) 都是将回调延迟到下次 DOM 更新循环之后执行
    // 如created和mounted,需要操作渲染后的视图 就有可能用到
    nextTick(()=>{/**这里写回调 */});
    this.$nextTick(()=>{/**这里写回调 */})
  },
  // setup函数为组合API的入口
  // 在创建组件实例时，在初始 prop 解析之后立即调用 setup。
  // 在生命周期方面，它是在 beforeCreate 钩子之前调用的。
  // 注意:setup中的this为undefined
  setup(props){
    console.log(props);
    // 解析组件和指令
    console.log(resolveComponent('CommonComponent'))
    console.log(resolveDynamicComponent('CommonComponent'))
    console.log(resolveDirective('AppDirective'))
  },
  // App的props是在createApp时传入的
  props:['data'],
  components:{
    RenderComponent:{
      // 可以使用render和h生成模板进行渲染
      render(){
        return h('div','使用渲染函数h()和render渲染出来的组件')
      }
    },
    // defineComponent和普通定义貌似区别不大
    DefineComponent:defineComponent({
      render(){
        return h('div','defineComponent定义组件 render和h渲染')
      }
    }),
    // defineAsyncComponent还有高阶用法 
    // DefineAsyncComponent:defineAsyncComponent(()=>import('./DefineAsyncComponent.vue')),
    // 
    DefineAsyncComponent:defineAsyncComponent({
    // 工厂函数
    loader: () => import('./DefineAsyncComponent.vue'),
    // 加载异步组件时要使用的组件
    // loadingComponent: LoadingComponent,
    // 加载失败时要使用的组件
    // errorComponent: ErrorComponent,
    // 在显示 loadingComponent 之前的延迟 | 默认值：200（单位 ms）
    delay: 5000,
    // 如果提供了 timeout ，并且加载组件的时间超过了设定值，将显示错误组件
    // 默认值：Infinity（即永不超时，单位 ms）
    timeout: 3000,
    // 定义组件是否可挂起 | 默认值：true
    suspensible: false,
    /**
     *
     * @param {*} error 错误信息对象
     * @param {*} retry 一个函数，用于指示当 promise 加载器 reject 时，加载器是否应该重试
     * @param {*} fail  一个函数，指示加载程序结束退出
     * @param {*} attempts 允许的最大重试次数
     */
    onError(error, retry, fail, attempts) {
      if (error.message.match(/fetch/) && attempts <= 3) {
        // 请求发生错误时重试，最多可尝试 3 次
        retry()
      } else {
        // 注意，retry/fail 就像 promise 的 resolve/reject 一样：
        // 必须调用其中一个才能继续错误处理。
        fail()
      }
    }
  })
  },
}
</script>