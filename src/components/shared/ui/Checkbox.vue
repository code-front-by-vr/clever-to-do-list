<script>
export default {
  name: 'Checkbox',
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: () => crypto.randomUUID(),
    },
    label: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
  },
  emits: ['update:checked'],
  computed: {
    value: {
      get() {
        return this.checked
      },
      set(val) {
        this.$emit('update:checked', val)
      },
    },
  },
}
</script>

<template>
  <div class="checkbox">
    <input type="checkbox" :id="id" :name="name" class="checkbox__input" v-model="value" />
    <label :for="id" class="checkbox__label">{{ label }}</label>
  </div>
</template>

<style scoped>
.checkbox {
  display: inline-flex;
  align-items: center;
}

.checkbox__input {
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
}
.checkbox__label {
  display: inline-block;
  width: var(--space-2xl);
  height: var(--space-2xl);
  border: var(--border-thin-2) var(--color-border);
  border-radius: var(--radius-sm);
  background-color: var(--color-surface);
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
}

.checkbox__label::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  width: var(--space-sm);
  height: var(--space-lg);
  border: solid var(--color-text-inverse);
  border-width: 0 2px 2px 0;
  transform: translate(-50%, -70%) rotate(45deg) scale(0);
  opacity: 0;
  transition: all 0.2s ease;
}

.checkbox__input:checked + .checkbox__label {
  background-color: var(--color-task-done);
  border-color: var(--color-task-done);
}

.checkbox__input:checked + .checkbox__label::after {
  transform: translate(-50%, -70%) rotate(45deg) scale(1);
  opacity: 1;
}

.checkbox__label:hover {
  border-color: var(--color-primary);
}

.checkbox__input:focus-visible + .checkbox__label {
  box-shadow: 0 0 0 3px var(--shadow-primary);
}
</style>
