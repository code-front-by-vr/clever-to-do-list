<script>
import { registerUser } from '@/api/auth'
import { RouterLink } from 'vue-router'
import Button from '@/components/common/Button.vue'
import Input from '@/components/common/Input.vue'

export default {
  name: 'Registration',
  components: {
    RouterLink,
    Button,
    Input,
  },
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      errorMessage: '',
    }
  },

  methods: {
    async handleClickRegister() {
      this.errorMessage = ''

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
        this.errorMessage = error.message
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
        <Input v-model="email" type="email" label="Email" placeholder="Enter your email" required />
        <Input
          v-model="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          required
        />
        <Input
          v-model="confirmPassword"
          type="password"
          label="Confirm Password"
          placeholder="Confirm your password"
          required
        />

        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

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

.error {
  color: var(--color-accent-warning);
  font-size: var(--font-size-sm);
  margin-top: var(--space-xs);
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
</style>
