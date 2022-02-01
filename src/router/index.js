import VueRouter from 'vue-router'


const routes = [
  {
    path: '/register',
    component: () => import('@/views/register/RegisterIndex')
  },
  {
    path: '/',
    component: () => import('@/views/login/LoginIndex')
  },
  {
    path: '/reset-password',
    component: () => import('@/views/reset-password/ResetPassword')
  }
]

const router = new VueRouter({
  routes
})

export default router;