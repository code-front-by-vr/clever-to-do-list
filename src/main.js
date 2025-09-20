import '@/assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import { onAuthStateChanged, auth } from '@/api/firebase'
import ToastPlugin from '@/plugins/toast'

const app = createApp(App)

app.use(router).use(store)

onAuthStateChanged(auth, user => {
  if (user) {
    store.commit('auth/setUser', user)
  } else {
    store.commit('auth/clearUser')
  }
})
app.use(ToastPlugin)
app.mount('#app')
