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
      const toast = toasts.find(t => t.id === id)
      if (!toast) return

      if (toast.timeoutId) clearTimeout(toast.timeoutId)

      const idx = toasts.indexOf(toast)
      if (idx !== -1) {
        toasts.splice(idx, 1)
      }
    }

    app.config.globalProperties.$toast = { showToast, closeToast, toasts }
  },
}
