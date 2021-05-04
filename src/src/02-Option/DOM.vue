<template>
  <div>
      <templateComponent></templateComponent>
      <div>--------------------</div>
  </div>
</template>

<script>
import { h, render } from 'vue'
export default {
  components:{
    templateComponent:{
      render(){
        return h('h4','渲染函数的内容')
      },
      data(){return{name:'marco'}}
    }
  }
}
</script>

<style>

</style>