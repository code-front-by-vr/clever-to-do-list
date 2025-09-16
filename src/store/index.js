import { createStore } from 'vuex'

import { auth, tasks } from './modules'

const store = createStore({
  modules: {
    auth,
    tasks,
  },
})
export default store
