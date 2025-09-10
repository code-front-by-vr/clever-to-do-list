<template>
  <div class="sign-in">
    <h1>Вход</h1>
    <form @submit.prevent="handleSignIn">
      <div class="form-control">
        <label>Email:</label>
        <input type="email" v-model="email" required />
      </div>

      <div class="form-control">
        <label>Пароль:</label>
        <input type="password" v-model="password" required />
      </div>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

      <button type="submit">Войти</button>
    </form>
  </div>
</template>

<script>
import { loginUser } from '@/services/auth'

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    }
  },
  methods: {
    async handleSignIn() {
      try {
        const user = await loginUser(this.email, this.password)
        console.log('Signed in:', user)
        this.$router.push('/tasks')
      } catch (error) {
        this.errorMessage = error.message
      }
    },
  },
}
</script>

<style scoped>
.sign-in {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
}
.error {
  color: red;
  font-size: 14px;
}
</style>
