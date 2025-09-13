<script>
import { RouterLink } from 'vue-router'
import Button from '@/components/common/Button.vue'

export default {
  components: { Button, RouterLink },
  methods: {
    goToTasks() {
      this.$router.push('/tasks')
    },
    goToSignIn() {
      this.$router.push('/sign-in')
    },
  },
}
</script>

<template>
  <div class="home">
    <div class="content">
      <div class="title-container">
        <h1 class="title">Clever To-Do List</h1>
        <div class="title-decoration"></div>
      </div>
      <p class="description">
        Organize your tasks, boost your focus and stay productive every day.
      </p>

      <div class="buttons">
        <Button variant="main" @click="goToTasks">Get Started</Button>
        <Button variant="light" @click="goToSignIn">Sign In</Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  padding: var(--space-3xl) var(--space-lg);
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: var(--container-normal);
}

.title-container {
  position: relative;
  margin-bottom: var(--space-xl);
}

.title {
  font-size: var(--font-size-5xl);
  font-weight: var(--fw-bold);
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
  margin-bottom: var(--space-lg);
}

.title-decoration {
  width: var(--space-6xl);
  height: var(--space-xs);
  background: var(--gradient-primary);
  border-radius: var(--radius-sm);
  margin: 0 auto;
  position: relative;
}

.title-decoration::after {
  content: '';
  position: absolute;
  top: calc(-1 * 2px);
  left: 50%;
  transform: translateX(-50%);
  width: var(--space-4xl);
  height: var(--space-sm);
  background: var(--gradient-primary);
  border-radius: var(--radius-sm);
  opacity: 0.6;
}

.description {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-2xl);
  line-height: 1.7;
  max-width: var(--container-normal);
}

.buttons {
  display: flex;
  justify-content: center;
  gap: var(--space-lg);
  flex-wrap: wrap;
}
</style>
