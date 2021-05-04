<template>
  <div>
    <router-link to="/home">主页</router-link>
    <router-link to="/cart">购物车</router-link>
    <router-link to="/profile">我的</router-link>
    <!-- router-view配合keep-alive实现根据跳转的不同路由 决定组件是否缓存
        例:  从home(主页)跳转到cart(购物车)时 缓存home页面
             从home(主页)跳转到profile(我的)时 不缓存home页面

         1.主要逻辑就是通过include和路由守卫实现 使用一个数组存储需要缓存的组件名
         当跳转到cart时 在home的后置路由守卫中添加Home到缓存组件的数组 
         当跳转到profile时 在home的后置路由守卫中 从缓存组件数组中删除Home
    -->
    <router-view v-slot="{Component}">
      <!-- keep-alive 可以接收三个props
           1.include:string/正则/数组
           2.exclude:string/正则/数组
           3.max 最大缓存组件个数
       -->
      <keep-alive :include="keepAlivePages">
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
    <br><br>
    <div id="target"></div>
    <UseTeleport></UseTeleport><br>
    <UseSlot>
      <!-- 不写v-solt:xxx 则默认是v-solt:default  可以缩写为 #default形式 -->
      <div>默认插槽</div>
      <template v-slot:namedSlot>
        <div>具名插槽</div>
      </template>
      <!-- props为组件传递给插槽的属性 组件通过:绑定 -->
      <template v-slot:scopedSlot="props">
        <div>作用域插槽: {{props.data}}</div>
      </template>
    </UseSlot>
  </div>
</template>

<script>
import Home from './Home.vue';
import Profile from './Profile.vue';
import Cart from './Cart.vue';
import UseTeleport from './UseTeleport.vue';
import UseSlot from './UseSlot.vue';
import { reactive } from 'vue';
export default {
  components:{Home,Profile,Cart,UseTeleport,UseSlot},
  setup(){
    let keepAlivePages=reactive([])
    return {keepAlivePages}
  },
  provide(){
    return {keepAlivePages:this.keepAlivePages}
  }
}
</script>

<style>

</style>