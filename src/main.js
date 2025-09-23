import '@/assets/main.css'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import ToastPlugin from '@/plugins/toast/toast'
import VueVirtualScroller from 'vue-virtual-scroller'
import { onAuthStateChanged, auth } from '@/api/firebase'

const app = createApp(App)

app.use(ToastPlugin).use(store).use(router)

onAuthStateChanged(auth, user => {
  if (user) {
    store.commit('auth/SET_USER', user)
  } else {
    store.commit('auth/CLEAR_USER')
  }
})

app.use(VueVirtualScroller)
app.mount('#app')
