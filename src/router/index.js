import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import login from '../views/login.vue'
import brandManager from '../views/brandManager.vue'
import brandPage from '../views/brandPage.vue'
import posting from '../views/posting.vue'
import insight from '../views/insight.vue'

import firebase from 'firebase';
import "firebase/auth";
 

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {requiresAuth: true}
  },

  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {requiresAuth: false}
  },

  {
    path: '/brandManager',
    name: 'brandManager',
    component: brandManager,
    meta: {requiresAuth: true}
  },
  {
    path: '/brandPage/:brand',
    name: 'brandPage',
    component: brandPage,
    meta: {requiresAuth: true}
  },
  {
    path: '/posting',
    name: 'posting',
    component: posting,
    meta: {requiresAuth: true}
  },
  {
    path: '/insight',
    name: 'insight',
    component: insight,
    meta: {requiresAuth: true}
  },
  

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;
  if(requiresAuth && !isAuthenticated) {
    next("/login")
  } else {
    next();
  }
})

export default router
