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
      default: 'primary', // primary | outlined | ghost | outlined-ghost | danger
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
  --background-color: var(--background-color);
  --border-color: transparent;
  --text-color: var(--text-color);

  padding: var(--space-md) var(--space-2xl);
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-base);
  font-weight: var(--fw-semibold);
  border-radius: var(--radius-lg);
  background-color: var(--background-color);
  border: var(--border-thin-2) var(--border-color);
  color: var(--text-color);
  transition: all 0.3s ease;
}
.button--primary {
  --background-color: var(--color-primary);
  --border-color: var(--color-primary);
  --text-color: var(--color-text-inverse);
  box-shadow: 0 4px 12px var(--shadow-primary);
}
.button--primary:hover,
.button--primary:focus,
.button--primary:active {
  box-shadow: var(--shadow-button-primary-hover);
  top: calc(-1 * var(--space-2xs));
}

.button--outlined {
  --background-color: transparent;
  --border-color: var(--color-primary);
  --text-color: var(--color-primary);
}
.button--outlined:hover,
.button--outlined:focus,
.button--outlined:active {
  --background-color: var(--color-primary);
  --text-color: var(--color-text-inverse);
  box-shadow: var(--shadow-button-primary-hover);
  top: calc(-1 * var(--space-2xs));
}

.button--ghost {
  --background-color: transparent;
  --text-color: var(--color-primary);
}
.button--ghost:hover,
.button--ghost:focus,
.button--ghost:active {
  --background-color: rgba(108, 99, 255, 0.08);
  --text-color: var(--color-primary);
  top: calc(-1 * var(--space-2xs));
}

.button--outlined-ghost {
  --background-color: transparent;
  --border-color: rgba(108, 99, 255, 0.2);
  --text-color: var(--color-primary);
}
.button--outlined-ghost:hover,
.button--outlined-ghost:focus,
.button--outlined-ghost:active {
  --background-color: rgba(108, 99, 255, 0.08);
  --border-color: var(--color-primary);
  --text-color: var(--color-primary);
  top: calc(-1 * var(--space-2xs));
}

.button--danger {
  --background-color: var(--color-accent-warning);
  --text-color: var(--color-text-inverse);
  --border-color: var(--color-accent-warning);
}
.button--danger:hover,
.button--danger:focus,
.button--danger:active {
  --background-color: var(--color-accent-error);
  --text-color: var(--color-text-inverse);
  top: calc(-1 * var(--space-2xs));
}
</style>
