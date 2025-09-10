<template>
  <div class="register">
    <h1>Регистрация</h1>

    <form @submit.prevent="handleRegister">
      <div class="form-control">
        <label>Email:</label>
        <input type="email" v-model="email" required />
      </div>

      <div class="form-control">
        <label>Пароль:</label>
        <input type="password" v-model="password" required minlength="6" />
      </div>

      <div class="form-control">
        <label>Повторите пароль:</label>
        <input type="password" v-model="confirmPassword" required />
      </div>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

      <button type="submit">Зарегистрироваться</button>
    </form>
  </div>
</template>

<script>
import { registerUser } from '@/services/auth'

export default {
  name: 'Registration',

  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      errorMessage: '',
    }
  },

  methods: {
    async handleRegister() {
      this.errorMessage = ''

      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Пароли не совпадают!'
        return
      }

      try {
        const user = await registerUser(this.email, this.password)
        console.log('Зарегистрирован:', user)

        this.email = ''
        this.password = ''
        this.confirmPassword = ''

        this.$router.push('/tasks')
      } catch (error) {
        console.error('Ошибка регистрации:', error)
        this.errorMessage = error.message
      }
    },
  },
}
</script>

<style scoped>
.register {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
}

.form-control {
  margin-bottom: 15px;
}

.error {
  color: red;
  font-size: 14px;
}
</style>
