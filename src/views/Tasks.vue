<template>
  <div>
    <h1>Мои задачи</h1>
    <button @click="logout">Выйти</button>
  </div>
</template>

<script>
import { logoutUser } from '@/services/auth'

export default {
  methods: {
    async logout() {
      await logoutUser()
      this.$router.push('/sign-in')
    },
  },
}
</script>
