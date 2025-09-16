import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import { onAuthStateChanged, auth } from '@/api/firebase'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
  ],
})

const getCurrentUser = () => {
  return new Promise(resolve => {
    const removeListener = onAuthStateChanged(auth, user => {
      removeListener()
      resolve(user)
    })
  })
}

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth) {
    if (await getCurrentUser()) {
      next()
    } else {
      alert('You must be logged in to access this page')
      next('/sign-in')
    }
  } else {
    next()
  }
})

export default router
