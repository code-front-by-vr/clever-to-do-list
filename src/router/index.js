import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import { ROUTES } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: ROUTES,
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (!requiresAuth) return next()

  if (!store.getters['auth/isReady']) return next('/sign-in')

  if (store.getters['auth/isAuthenticated']) return next()

  alert('You must be logged in to access this page')
  next('/sign-in')
})

export default router
