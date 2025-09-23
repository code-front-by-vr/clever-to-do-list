import { registerUser, loginUser, logoutUser } from '@/services/auth'
import { auth, onAuthStateChanged } from '@/api/firebase'

export default {
  namespaced: true,
  state: () => ({
    user: null,
    isReady: false,
  }),
  getters: {
    isAuthenticated: state => !!state.user,
    userId: state => state.user?.uid || null,
    isReady: state => state.isReady,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    CLEAR_USER(state) {
      state.user = null
    },
    SET_AUTH_READY(state) {
      state.isReady = true
    },
  },
  actions: {
    async register({ commit }, { email, password }) {
      try {
        const user = await registerUser(email, password)
        commit('SET_USER', user)
        return user
      } catch (err) {
        console.log('Auth/register error: ', err.message)
        throw err
      }
    },
    async login({ commit }, { email, password }) {
      try {
        const user = await loginUser(email, password)
        commit('SET_USER', user)
        return user
      } catch (err) {
        console.log('Auth/login error: ', err.message)
        throw err
      }
    },
    async logout({ commit }) {
      try {
        await logoutUser()
        commit('CLEAR_USER')
      } catch (err) {
        console.log('Auth/logout error: ', err.message)
        throw err
      }
    },
  },
}
