<script>
import { registerUser } from '@/services/auth'
import { RouterLink } from 'vue-router'
import Button from '@/components/shared/ui/Button.vue'
import Input from '@/components/shared/ui/Input.vue'
import { Eye, EyeOff } from 'lucide-vue-next'

export default {
  name: 'Registration',
  components: {
    RouterLink,
    Button,
    Input,
    Eye,
    EyeOff,
  },
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false,
    }
  },

  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword
    },
    toggleConfirmPasswordVisibility() {
      this.showConfirmPassword = !this.showConfirmPassword
    },
    async handleClickRegister() {
      try {
        if (this.password !== this.confirmPassword) {
          throw new Error('Passwords do not match!')
        }

        const user = await registerUser(this.email, this.password)

        this.email = ''
        this.password = ''
        this.confirmPassword = ''

        this.$router.push('/')
      } catch (error) {
        this.$toast.showToast({
          title: 'Oh no!',
          message: 'Something went wrong. Try again',
          critical: true,
        })
      }
    },
  },
}
</script>

<template>
  <div class="register-wrapper">
    <div class="register">
      <h2 class="title">Register</h2>
      <form @submit.prevent="handleClickRegister()" class="form">
        <Input
          v-model="email"
          type="email"
          name="email"
          label="Email"
          placeholder="Enter your email"
          required
        />
        <Input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          name="password"
          label="Password"
          placeholder="Enter your password"
          required
        >
          <template #show-password-toggle>
            <button
              type="button"
              class="password-toggle"
              @click="togglePasswordVisibility"
              :aria-label="showPassword ? 'Hide password' : 'Show password'"
            >
              <Eye v-if="!showPassword" class="password-toggle__icon" />
              <EyeOff v-else class="password-toggle__icon" />
            </button>
          </template>
        </Input>
        <Input
          v-model="confirmPassword"
          :type="showConfirmPassword ? 'text' : 'password'"
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          required
        >
          <template #show-password-toggle>
            <button
              type="button"
              class="password-toggle"
              @click="toggleConfirmPasswordVisibility"
              :aria-label="showConfirmPassword ? 'Hide password' : 'Show password'"
            >
              <Eye v-if="!showConfirmPassword" class="password-toggle__icon" />
              <EyeOff v-else class="password-toggle__icon" />
            </button>
          </template>
        </Input>

        <Button type="submit">Register</Button>
      </form>

      <p class="auth-link">
        Already have an account?
        <RouterLink to="/sign-in">Sign In</RouterLink>
      </p>
    </div>
  </div>
</template>

<style scoped>
.register-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
}
.register {
  width: var(--container-narrow);
  padding: var(--space-3xl);
  background-color: var(--color-surface);
  border-radius: var(--radius-xl);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.title {
  font-size: var(--font-size-2xl);
  font-weight: var(--fw-semibold);
  color: var(--color-primary);
  margin-bottom: var(--space-md);
  text-align: center;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
.form {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: var(--space-2xl);
}

.auth-link {
  text-align: center;
  margin-top: var(--space-md);
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
}

.auth-link a {
  color: var(--color-primary);
  font-weight: var(--fw-semibold);
  text-decoration: none;
  transition: color 0.3s ease;
}

.auth-link a:hover {
  color: var(--color-secondary);
}

.auth-link a:visited {
  color: var(--color-primary);
}

.password-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.password-toggle__icon {
  width: var(--space-xl);
  height: var(--space-xl);
  color: var(--color-text-muted);
  transition: color 0.2s ease;
}

.password-toggle:hover .password-toggle__icon {
  color: var(--color-text-primary);
}
</style>
