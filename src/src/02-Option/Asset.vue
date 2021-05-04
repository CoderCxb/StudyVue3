<template>
  <div>
    <h4>演示 选项/资源</h4>
    <!-- 当元素是div是隐藏 -->
    <div v-hideDiv>使用自定义指令</div>
    <span v-hideDiv>使用自定义指令</span>
    <br>
    <Hello></Hello>
  </div>
</template>

<script>
import { h } from 'vue';
export default {
  // 定义组件
  components:{
    Hello:{
      render(){return h('div','自定义组件')}
    }
  },
  // 自定义指令 与main.ts中指令定义一致 仅仅只是作用域不同 这里定义仅仅只能在这个组件使用 
  directives:{
    hideDiv:{
      mounted(el,binding,vNode) {
        if(vNode.type==='div'){
          el.style.display='none';
        }
        // console.log(el,binding,vNode);
      },
    }
  },
}
</script>

<style>

</style>