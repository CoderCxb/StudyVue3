<template>
  <!-- 使用APP级别的自定义指令  -->
  <!-- params使用:绑定 并且必须直接跟在指令后面 -->
  <!-- .xxx是修饰符  -->
  <div v-AppDirective:[name].once.twice="'polo'">
    <!-- 使用Provide -->
    <p>{{AppProvide}}</p>
  </div>
</template>
<script>
export default {
  data(){
    return {name:'marco'}
  },
  // 接受上级组件的provide传递的数据 可以跨很多级别 这里接收的是APP级别的
  inject:['AppProvide']
}
</script>