import { registerUser, loginUser, logoutUser } from '@/api/auth'
import { auth, onAuthStateChanged } from '@/api/firebase'

export default {
  namespaced: true,
  state: () => ({
    user: null,
    authInitialized: false,
  }),
  getters: {
    isAuthenticated: state => !!state.user,
    isAuthReady: state => state.authInitialized,
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    clearUser(state) {
      state.user = null
    },
    setAuthReady(state, ready) {
      state.authInitialized = ready
    },
  },
  actions: {
    async register({ commit }, { email, password }) {
      try {
        const user = await registerUser(email, password)
        commit('setUser', user)
        return user
      } catch (err) {
        console.log('Auth/register error: ', err.message)
        throw err
      }
    },
    async login({ commit }, { email, password }) {
      try {
        const user = await loginUser(email, password)
        commit('setUser', user)
        return user
      } catch (err) {
        console.log('Auth/login error: ', err.message)
        throw err
      }
    },
    async logout({ commit }) {
      try {
        await logoutUser()
        commit('clearUser')
      } catch (err) {
        console.log('Auth/logout error: ', err.message)
        throw err
      }
    },
    initializeAuth({ commit }) {
      return new Promise(resolve => {
        onAuthStateChanged(auth, user => {
          if (user) {
            commit('setUser', user)
          } else {
            commit('clearUser')
          }
          commit('setAuthReady', true)
          resolve()
        })
      })
    },
  },
}
