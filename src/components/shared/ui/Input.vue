<script>
export default {
  name: 'Input',
  props: {
    modelValue: String,
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: () => crypto.randomUUID(),
    },
    name: {
      type: String,
      default: '',
    },
  },

  emits: ['update:modelValue'],
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(val) {
        this.$emit('update:modelValue', val)
      },
    },
  },
}
</script>

<template>
  <div class="input">
    <label class="input__label" :for="id">{{ label }}</label>
    <div class="input__wrapper">
      <input
        :id
        :name
        class="input__field"
        :type
        v-model="value"
        :placeholder
        :required
        :aria-label="label"
      />
      <div class="input__icon" v-if="$slots['show-password-toggle']">
        <slot name="show-password-toggle" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.input {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.input__label {
  font-size: var(--font-size-md);
  font-weight: var(--fw-medium);
  color: var(--color-text-primary);
  margin-bottom: var(--space-md);
}

.input__wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input__field {
  width: 100%;
  padding: var(--space-md);
  border: var(--border-transparent);
  border-bottom: var(--border-thin) var(--color-text-muted);
  font-size: var(--font-size-base);
  transition: all 0.3s ease;
}

.input__field:focus-visible {
  outline: none;
  border: var(--border-thin) var(--color-primary);
  border-radius: var(--radius-md);
  box-shadow: 0 0 0 3px var(--shadow-primary);
}

.input__field::placeholder {
  color: var(--color-text-muted);
}

.input__icon {
  position: absolute;
  right: var(--space-md);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}
</style>
