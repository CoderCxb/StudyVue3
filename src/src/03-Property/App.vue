<template>
  <div>
    <h3>演示 属性Property</h3>
    <Property :size="20" :title="'标题'">
      <template  v-slot:mySlot>使用插槽</template >
    </Property>
  </div>
</template>

<script>
import Property from './Property.vue';
export default {
  components:{
    Property
  },
}
</script>

<style>

</style>