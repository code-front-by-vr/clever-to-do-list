<script>
import { loginUser } from '@/services/auth'
import { RouterLink } from 'vue-router'
import { Button, Input } from '@/components/shared/ui'
import { Eye, EyeOff } from 'lucide-vue-next'

export default {
  components: {
    Button,
    RouterLink,
    Input,
    Eye,
    EyeOff,
  },
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
    }
  },
  async mounted() {
    await this.$nextTick()
    this.$refs.emailInput?.focus()
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword
    },
    async handleClickSignIn() {
      try {
        const user = await loginUser(this.email, this.password)
        this.$router.push('/tasks')
      } catch (error) {
        this.$toast.showToast({
          title: 'Oh no!',
          type: 'error',
          message: 'Something went wrong. Try again' + error,
        })
      }
    },
  },
}
</script>

<template>
  <div class="sign-in-wrapper">
    <div class="sign-in">
      <h2 class="title typography-heading">Sign In</h2>
      <form @submit.prevent="handleClickSignIn()" class="form">
        <Input
          ref="emailInput"
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
          <template #icon>
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
        <Button type="submit">Sign In</Button>
      </form>

      <p class="auth-link typography-body">
        Don't have an account yet?
        <RouterLink to="/register">Register</RouterLink>
      </p>
    </div>
  </div>
</template>

<style scoped>
.sign-in-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
}
.sign-in {
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
