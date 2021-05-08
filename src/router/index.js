
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'Post',
    component: () => import('../views/Post.vue')
  },
  {
    path: '/write',
    name: 'write',
    component: () => import('../views/Write.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/saeed',
    name: 'saeed',
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {

  /* if (to.name != "login")
    checkAuth() */

  return next();
});

/* function checkAuth() {

  if (!localStorage.getItem('jwt')) {
    return router.push({ 'name': 'login' });
    // console.log("redirect to login");
  }
} */

export default router
