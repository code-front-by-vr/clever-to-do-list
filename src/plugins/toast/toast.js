import { reactive } from 'vue'

export default {
  install(app) {
    const toasts = reactive([])

    function showToast({ title, message, type = 'info', critical = false, duration = 4000 }) {
      const id = crypto.randomUUID()

      const toast = { id, title, message, type, critical, timeoutId: null }

      if (!critical) {
        toast.timeoutId = setTimeout(() => {
          closeToast(id)
        }, duration)
      }

      toasts.push(toast)

      return id
    }

    function closeToast(id) {
      const index = toasts.findIndex(t => t.id === id)
      if (index === -1) return

      const toast = toasts[index]
      if (toast.timeoutId) {
        clearTimeout(toast.timeoutId)
      }

      toasts.splice(index, 1)
    }

    app.config.globalProperties.$toast = { showToast, closeToast, toasts }
  },
}
