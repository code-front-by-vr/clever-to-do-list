<script>
import { Eye, EyeOff } from 'lucide-vue-next'

export default {
  name: 'Input',
  components: { Eye, EyeOff },
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
}
</script>

<template>
  <div class="form-control">
    <label>{{ label }}</label>
    <div class="input-wrapper">
      <input :type="inputType" v-model="value" :placeholder :required />
      <button
        v-if="type === 'password'"
        type="button"
        class="toggle-password"
        @click="handleTogglePassword"
        tabindex="-1"
      >
        <Eye v-if="!showPassword" class="icon" />
        <EyeOff v-else class="icon" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.form-control {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

label {
  font-size: var(--font-size-md);
  font-weight: var(--fw-medium);
  color: var(--color-text-primary);
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

input {
  width: 100%;
  padding: var(--space-md);
  padding-right: 40px;
  border: 1px solid transparent;
  border-bottom: 1px solid var(--color-text-muted);
  font-size: var(--font-size-base);
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-md);
  box-shadow: 0 0 0 3px var(--shadow-primary);
}

input::placeholder {
  color: var(--color-text-muted);
}

.toggle-password {
  position: absolute;
  right: var(--space-md);
  background: none;
  border: none;
  cursor: pointer;
}

.icon {
  width: var(--space-xl);
  height: var(--space-xl);
  color: var(--color-text-muted);
}
</style>
