<script>
export default {
  emits: ['close'],
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
  background-color: rgba(0, 0, 0, 0.5);
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
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
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
