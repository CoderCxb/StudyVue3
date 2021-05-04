import Home from './Home.vue';
import Cart from './Cart.vue';
import Profile from './Profile.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [{
  path: "/home",
  component: Home
}, {
  path: "/cart",
  component: Cart
}, {
  path: "/profile",
  component: Profile
}]

const router = createRouter({
  routes,
  history: createWebHistory(),
})


export default router;