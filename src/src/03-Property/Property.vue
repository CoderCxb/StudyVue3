<template>
  <div>
    <slot name="mySlot"></slot>
    <div ref="myRef"></div>
  </div>
</template>

<script>
import {ref} from 'vue';
export default {
  data(){
    return {age:20};
  },
  props:['size'],
  setup(){
    let name=ref('marco');
    return {name}
  },
  mounted(){
    // 组件数据 注意：不包含setup中返回的数据 setup的数据直接通过this.就可以使用
    console.log('data:',this.$data);
    // 外部传入的数据
    console.log('props',this.$props);
    // 组件的初始化选项
    console.log('options',this.$options);
    // 组件的attribute 即绑定的非props的属性 
    console.log('attrs',this.$attrs);
    // 组件的ref 可以用来标记元素 便于操作
    console.log('refs',this.$refs.myRef);
    // 组件的插槽 是个函数 返回的是一个数组
    console.log('slots',this.$slots.mySlot());
    // 组件实例的根DOM元素
    console.log('el',this.$el);
    // 父实例对象
    console.log('parent',this.$parent);
    // 当前组件树的根组件实例 如果当前实例没有父实例,此实例将会是其自己
    console.log('root',this.$root);
  }
}
</script>

<style>

</style>