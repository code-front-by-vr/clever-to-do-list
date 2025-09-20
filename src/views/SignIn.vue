<script>
import { loginUser } from '@/api/auth'
import { RouterLink } from 'vue-router'
import Button from '@/components/common/Button.vue'
import Input from '@/components/common/Input.vue'

export default {
  components: {
    Button,
    RouterLink,
    Input,
  },
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async handleClickSignIn() {
      try {
        const user = await loginUser(this.email, this.password)
        this.$router.push('/tasks')
      } catch (error) {
        this.$toast.showToast({
          title: 'Oh no!',
          message: 'Something went wrong. Try again',
          type: 'error',
        })
      }
    },
  },
}
</script>

<template>
  <div class="sign-in-wrapper">
    <div class="sign-in">
      <h2 class="title">Sign In</h2>
      <form @submit.prevent="handleClickSignIn()" class="form">
        <Input v-model="email" type="email" label="Email" placeholder="Enter your email" required />
        <Input
          v-model="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          required
        />

        <Button type="submit">Sign In</Button>
      </form>

      <p class="auth-link">
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
</style>
