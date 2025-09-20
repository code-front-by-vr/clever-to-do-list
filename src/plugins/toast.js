import { reactive } from 'vue'

export default {
  install(app) {
    const state = reactive({
      toasts: [],
    })

    function showToast({ title, message, critical = false, duration = 4000 }) {
      const id = crypto.randomUUID()

      const toast = { id, title, message, critical, timeoutId: null }

      if (!critical) {
        toast.timeoutId = setTimeout(() => {
          closeToast(id)
        }, duration)
      }

      state.toasts.push(toast)

      return id
    }

    function closeToast(id) {
      const index = state.toasts.findIndex(t => t.id === id)
      if (index === -1) return

      const toast = state.toasts[index]
      if (toast.timeoutId) clearTimeout(toast.timeoutId)

      state.toasts.splice(index, 1)
    }

    app.config.globalProperties.$toast = { showToast, closeToast, state }
  },
}
