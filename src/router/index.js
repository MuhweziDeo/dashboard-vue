import VueRouter from 'vue-router'


const routes = [
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register/RegisterIndex')
  },
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/login/LoginIndex')
  },
  {
    path: '/reset-password',
    name: 'rest-password',
    component: () => import('@/views/reset-password/ResetPassword')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router;