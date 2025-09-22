import Home from '@/views/Home.vue'

export const ROUTES = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: () => import('@/views/SignIn.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register.vue'),
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: () => import('@/views/Tasks.vue'),
    meta: { requiresAuth: true },
  },
]
