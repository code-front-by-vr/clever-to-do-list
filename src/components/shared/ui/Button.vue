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

<style scoped>
.button {
  --btn-background-color: var(--background-color);
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
  background-color: var(--btn-background-color);
  border: var(--border-thin-2) var(--border-color);
  color: var(--text-color);
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.1s ease;
  cursor: pointer;
}
.button--primary {
  --btn-background-color: var(--color-primary);
  --border-color: var(--color-primary);
  --text-color: var(--color-text-inverse);
  box-shadow: var(--shadow-button-primary);
}
.button--primary:hover,
.button--primary:focus {
  box-shadow: var(--shadow-button-primary-hover);
}
.button--primary:active {
  transform: translateY(var(--space-2xs));
}

.button--outlined {
  --btn-background-color: transparent;
  --border-color: var(--color-primary);
  --text-color: var(--color-primary);
}
.button--outlined:hover,
.button--outlined:focus {
  --btn-background-color: var(--color-primary);
  --text-color: var(--color-text-inverse);
  box-shadow: var(--shadow-button-primary-hover);
}
.button--outlined:active {
  transform: translateY(var(--space-2xs));
}

.button--ghost {
  --btn-background-color: transparent;
  --text-color: var(--color-primary);
}
.button--ghost:hover,
.button--ghost:focus {
  --btn-background-color: var(--color-surface-hover);
  --text-color: var(--color-primary);
}
.button--ghost:active {
  transform: translateY(var(--space-2xs));
}

.button--outlined-ghost {
  --btn-background-color: transparent;
  --border-color: var(--color-border);
  --text-color: var(--color-primary);
}
.button--outlined-ghost:hover,
.button--outlined-ghost:focus {
  --btn-background-color: var(--color-surface-hover);
  --border-color: var(--color-primary);
  --text-color: var(--color-primary);
}
.button--outlined-ghost:active {
  transform: translateY(var(--space-2xs));
}

.button--danger {
  --btn-background-color: var(--color-accent-warning);
  --text-color: var(--color-text-inverse);
  --border-color: var(--color-accent-warning);
}
.button--danger:hover,
.button--danger:focus {
  --btn-background-color: var(--color-accent-error);
  --border-color: var(--color-accent-error);
  --text-color: var(--color-text-inverse);
}

.button--danger:active {
  transform: translateY(var(--space-2xs));
}
</style>
