<script>
import { Eye, EyeOff } from 'lucide-vue-next'

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
  },

  emits: ['update:modelValue'],
  data() {
    return {
      showPassword: false,
    }
  },
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(val) {
        this.$emit('update:modelValue', val)
      },
    },
    inputType() {
      if (this.type === 'password') {
        return this.showPassword ? 'text' : 'password'
      }
      return this.type
    },
  },

  methods: {
    handleTogglePassword() {
      this.showPassword = !this.showPassword
    },
  },
  components: { Eye, EyeOff },
}
</script>

<template>
  <div class="input">
    <label class="input__label" :for="id">{{ label }}</label>
    <div class="input__wrapper">
      <input
        :id
        class="input__field"
        :type="inputType"
        v-model="value"
        :placeholder
        :required
        :aria-label="label"
      />
      <button
        v-if="type === 'password'"
        type="button"
        class="toggle-password"
        @click="handleTogglePassword"
      >
        <Eye v-if="!showPassword" class="toggle-password__icon" />
        <EyeOff v-else class="toggle-password__icon" />
      </button>
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
  border: 1px solid transparent;
  border-bottom: 1px solid var(--color-text-muted);
  font-size: var(--font-size-base);
  transition: all 0.3s ease;
}

.input__field:focus-visible {
  outline: none;
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-md);
  box-shadow: 0 0 0 3px var(--shadow-primary);
}

.input__field::placeholder {
  color: var(--color-text-muted);
}

.toggle-password {
  position: absolute;
  right: var(--space-md);
  background: none;
  border: none;
  cursor: pointer;
}

.toggle-password__icon {
  width: var(--space-xl);
  height: var(--space-xl);
  color: var(--color-text-muted);
}
</style>
