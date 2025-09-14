import { createStore } from 'vuex'

import auth from '@/store/modules/auth'
import tasks from '@/store/modules/tasks'

const store = createStore({
  modules: {
    auth,
    tasks,
  },
})
export default store
