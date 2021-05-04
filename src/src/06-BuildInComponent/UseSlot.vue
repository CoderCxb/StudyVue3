<template>
  <div>
    <h4>使用插槽</h4>
    <!-- 不写name 默认为default -->
    <slot>默认值</slot>
    <slot name="namedSlot"></slot>
    <!-- 向外部插槽传值 使外部可以使用组件内部的值 -->
    <slot :data="data" name="scopedSlot"></slot>
  </div>
</template>

<script>
export default {
  setup(){
    let data="给外部的插槽传递的数据!"
    return {data}
  }
}
</script>

<style>

</style>