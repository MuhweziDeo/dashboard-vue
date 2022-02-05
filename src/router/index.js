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
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/layouts/DashboardLayout.vue'),
    children: [
      {
        path: '/apps',
        name: 'app-list',
        component: () => import('@/views/app/AppList.vue')
      },
      {
        path: '/apps/create',
        name: 'app-create',
        component: () => import('@/views/app/AppCreate.vue')
      }
    ],
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router;
