import '@/assets/main.css'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import ToastPlugin from '@/plugins/toast/toast'
import VueVirtualScroller from 'vue-virtual-scroller'

const app = createApp(App)

app.use(ToastPlugin).use(store).use(router)

await store.dispatch('auth/initAuth')

app.use(VueVirtualScroller)
app.mount('#app')
