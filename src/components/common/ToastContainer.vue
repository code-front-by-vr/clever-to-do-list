<script>
import { LucideX } from 'lucide-vue-next'
export default {
  name: 'ToastContainer',
  components: {
    LucideX,
  },
}
</script>

<template>
  <div class="toast">
    <transition-group name="toast" tag="div">
      <div
        v-for="toast in $toast.state.toasts"
        :key="toast.id"
        class="toast__item"
        :class="{ error: toast.critical, success: !toast.critical }"
      >
        <div class="toast__content">
          <h4 class="toast__title">{{ toast.title }}</h4>
          <p class="toast__message">{{ toast.message }}</p>
        </div>
        <button v-if="toast.critical" @click="$toast.closeToast(toast.id)" class="toast__close">
          <LucideX class="toast__close-icon" />
        </button>
      </div>
    </transition-group>
  </div>
</template>

<style scoped>
.toast {
  position: fixed;
  top: var(--space-2xl);
  left: 50%;
  transform: translateX(-50%);
  gap: var(--space-md);
  z-index: 9999;
}

.toast__item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-md);
  background: var(--color-surface);
  padding: var(--space-md) var(--space-lg);
  border-radius: var(--radius-lg);
  border: 1px solid transparent;
}

.toast__item.error {
  border: 1px solid rgba(var(--color-accent-warning-rgb), 0.4);
}

.toast__item.success {
  border: 1px solid rgba(var(--color-task-done-rgb), 0.4);
}

.toast__content {
  flex: 1;
}

.toast__title {
  font-weight: var(--fw-semibold);
  margin-bottom: var(--space-xs);
}

.toast__message {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.toast__close {
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-text-secondary);
}

.toast__close-icon {
  width: var(--space-xl);
  height: var(--space-xl);
}
.toast__close-icon:hover {
  color: var(--color-text-primary);
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.toast-enter-to,
.toast-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
</style>
