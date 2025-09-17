<script>
import { RouterView } from 'vue-router'
import Header from '@/components/layout/Header.vue'

export default {
  components: {
    Header,
  },
}
</script>

<template>
  <Header />
  <main class="container">
    <RouterView />
  </main>
</template>

<style scoped>
.container {
  max-width: var(--container-wide);
  margin: 0 auto;
  padding: 0 var(--space-lg);
}
</style>
