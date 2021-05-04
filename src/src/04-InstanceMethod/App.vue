<template>
  <div>
    <h3>演示 实例方法</h3>
    <InstanceMethod @myEvent="getMyEvent"></InstanceMethod>
  </div>
</template>

<script>
import InstanceMethod from './InstanceMethod.vue';
export default {
  components:{
    InstanceMethod
  },
  methods:{
    getMyEvent(payload){
      console.log('子组件自定义事件触发,参数为:',payload);
    }
  }
}
</script>

<style>

</style>