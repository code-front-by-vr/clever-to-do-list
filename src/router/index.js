import { createRouter, createWebHistory } from 'vue-router'
import { getCurrentUser } from '@/services/auth'
import { ROUTES } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: ROUTES,
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (!requiresAuth) {return next()}

  const user = await getCurrentUser()

  if (user) {
    next()
  } else {
    alert('You must be logged in to access this page')
    next('/sign-in')
  }
})

export default router
