
import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from '../middleware/auth';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Post',
    component: () => import('../views/Post.vue')
  },
  {
    path: '/liked',
    name: 'Liked',
    component: () => import('../views/Post.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Post.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeResolve(auth);

export default router
