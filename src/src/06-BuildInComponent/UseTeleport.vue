<template>
  <!-- 将子元素移动到指定位置  -->
  <!-- 需要确保移动时 目标元素已经渲染完毕 否则会无效并警告 -->
  <!-- 用于子组件使用本组件的数据 但是要渲染到别的地方去的情况 -->
  <div>使用teleport</div>
  <teleport v-if="loaded" to="#target">
    <div>将要移动的元素</div>
  </teleport>
</template>

<script>
import {ref} from 'vue';
export default {
  setup(){
    let loaded=ref(false);
    setTimeout(()=>{
      loaded.value=true;
    },2000)
    return {loaded}
  }
}
</script>

<style>

</style>