<template>
  <div>主页</div>
    <input type="text">
</template>

<script>
export default {
  name:"Home",
  // 路由的后置守卫 根据to的不同 决定 
  beforeRouteLeave (to, from, next) {
    if(to.path==='/cart'){
      if(!this.keepAlivePages.includes('Home')){
        this.keepAlivePages.push('Home')
      }
    }else{
      let index=this.keepAlivePages.indexOf('Home')
      this.keepAlivePages.splice(index,1)
    }
    next();
  },
  inject:['keepAlivePages']
}
</script>

<style>

</style>