import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import login from '../views/login.vue'
import brandManager from '../views/brandManager.vue'
import brandPage from '../views/brandPage.vue'
import postView from '../views/postView.vue'


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
  {
    path: '/postView',
    name: 'postView',
    component: postView
  },
 

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
