<script>
export default {
  emits: ['close'],
  methods: {
    handleEscapeKey(event) {
      if (event.key === 'Escape') {
        this.$emit('close')
      }
    },
  },
  mounted() {
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', this.handleEscapeKey)
  },
  beforeUnmount() {
    document.body.style.overflow = 'auto'
    document.removeEventListener('keydown', this.handleEscapeKey)
  },
}
</script>

<template>
  <div class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal">
      <div class="modal__title">
        <slot name="header" />
      </div>
      <div class="modal__content">
        <slot />
      </div>

      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--shadow-modal-backdrop);
  backdrop-filter: blur(var(--space-xs));
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
}

.modal {
  width: var(--container-narrow);
  padding: var(--space-3xl);
  background-color: var(--color-surface);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-modal);
  border: var(--border-thin-1) var(--color-border);
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  z-index: 50;
}

.modal__title {
  font-size: var(--font-size-2xl);
  font-weight: var(--fw-semibold);
  color: var(--color-primary);
  margin-bottom: var(--space-md);
  text-align: center;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.modal__content {
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
}
</style>
