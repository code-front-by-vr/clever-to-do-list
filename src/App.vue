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
  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped>
.container {
  max-width: var(--container-wide);
  margin: 0 auto;
  padding: 0 var(--space-lg);
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--space-lg); */
}
</style>
