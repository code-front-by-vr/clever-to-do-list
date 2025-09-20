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
      default: 'primary', // primary | outlined | ghost
    },
  },
}
</script>

<template>
  <button :class="['button', `button--${variant}`]" :type>
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
  border: var(--border-transparent-2);
}
.button--primary {
  background: var(--color-primary);
  color: var(--color-text-inverse);
  border-color: var(--color-primary);
  box-shadow: 0 4px 12px var(--shadow-primary);
}
.button--primary:hover,
.button--primary:focus,
.button--primary:active {
  box-shadow: 0 8px 20px var(--shadow-primary-hover);
  transform: scale(1.03);
}

.button--outlined {
  background-color: transparent;
  color: var(--color-primary);
  border-color: var(--color-primary);
}
.button--outlined:hover,
.button--outlined:focus,
.button--outlined:active {
  background-color: var(--color-primary);
  color: var(--color-text-inverse);
  box-shadow: 0 8px 20px var(--shadow-primary-hover);
  transform: scale(1.03);
}

.button--ghost {
  background-color: transparent;
  color: var(--color-primary);
  border-color: transparent;
}
.button--ghost:hover,
.button--ghost:focus,
.button--ghost:active {
  background-color: rgba(108, 99, 255, 0.08);
  color: var(--color-primary);
  transform: scale(1.03);
}
</style>
