<script>
import { loginUser } from '@/api/auth'
import { RouterLink } from 'vue-router'
import Button from '@/components/common/Button.vue'
import Input from '@/components/common/Input.vue'
import AuthLink from '@/components/auth/AuthLink.vue'

export default {
  components: {
    Button,
    RouterLink,
    Input,
    AuthLink,
  },
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    }
  },
  methods: {
    async handleClickSignIn() {
      try {
        const user = await loginUser(this.email, this.password)
        this.$router.push('/tasks')
      } catch (error) {
        this.errorMessage = error.message
      }
    },
  },
}
</script>

<template>
  <div class="sign-in-wrapper">
    <div class="sign-in">
      <h2 class="title">Sign In</h2>
      <form @submit.prevent="handleClickSignIn" class="form">
        <Input v-model="email" type="email" label="Email" placeholder="Enter your email" required />
        <Input
          v-model="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          required
        />

        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

        <Button type="submit">Sign In</Button>
      </form>

      <AuthLink>
        Don't have an account yet?
        <RouterLink to="/register">Register</RouterLink>
      </AuthLink>
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
</style>
