import { registerUser, loginUser, logoutUser } from '@/api/auth'

export default {
  namespaced: true,
  state: () => ({
    user: null,
  }),
  getters: {
    isAuthenticated: state => !!state.user,
    userId: state => state.user?.uid || null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    clearUser(state) {
      state.user = null
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
  },
}
