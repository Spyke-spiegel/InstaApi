import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import login from '../views/login.vue'
import brandManager from '../views/brandManager.vue'
import brandPage from '../views/brandPage.vue'
 

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/login',
    name: 'facebookLogin',
    component: login
  },

  {
    path: '/brandManager',
    name: 'brandManager',
    component: brandManager
  },
  {
    path: '/brandPage/:brand',
    name: 'brandPage',
    component: brandPage
  },
  

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
