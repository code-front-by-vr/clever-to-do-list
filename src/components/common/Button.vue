<script>
export default {
  name: 'Button',
  props: {
    type: {
      type: String,
      default: 'button', // button | submit | reset
    },
    variant: {
      type: String,
      default: 'main', // main | light
    },
  },
}
</script>

<template>
  <button :class="['button', `button-${variant}`]" :type>
    <slot></slot>
  </button>
</template>

<style>
.button {
  padding: var(--space-md) var(--space-2xl);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  font-weight: var(--fw-semibold);
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.button.button-main {
  background: var(--color-primary);
  color: var(--color-text-inverse);
  box-shadow: 0 4px 12px var(--shadow-primary);
}
.button.button-main:hover {
  transform: scale(1.03);
  box-shadow: 0 8px 20px var(--shadow-primary-hover);
}

.button.button-light {
  background: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
}
.button.button-light:hover {
  background: rgba(108, 99, 255, 0.1);
  transform: scale(1.03);
}
</style>
