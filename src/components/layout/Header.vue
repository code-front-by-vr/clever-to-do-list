<script>
import { RouterLink } from 'vue-router'
import { logoutUser } from '@/api/auth'

export default {
  components: {
    RouterLink,
  },
  data() {
    return {
      links: [
        { to: '/', text: 'Home' },
        { to: '/sign-in', text: 'Sign In' },
        { to: '/register', text: 'Register' },
        { to: '/tasks', text: 'Tasks' },
      ],
    }
  },
  methods: {
    async logout() {
      await logoutUser()
      location.href = '/sign-in'
    },
  },
}
</script>

<template>
  <header>
    <RouterLink to="/" class="logo">To-Do List</RouterLink>
    <nav>
      <ul>
        <li v-for="link in links" :key="link.to">
          <RouterLink :to="link.to">{{ link.text }}</RouterLink>
        </li>
        <li @click="logout">Logout</li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
header {
  width: 100%;
  background-color: var(--color-primary);
  padding: var(--space-md) var(--space-xl);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: var(--font-size-xl);
  font-weight: var(--fw-semibold);
  color: var(--color-text-inverse);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.content {
  padding: var(--space-lg) var(--space-2xl);
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-lg);
  font-size: var(--font-size-base);
  text-align: center;
  text-transform: uppercase;
}

nav ul {
  display: flex;
  gap: var(--space-lg);
  align-items: center;
}

nav a.router-link-exact-active {
  color: var(--color-text-inverse);
  font-weight: var(--fw-semibold);
}

nav a.router-link-active {
  color: var(--color-secondary);
  font-weight: var(--fw-semibold);
}

nav a {
  display: inline-block;
  padding: 0 var(--space-lg);
  color: var(--color-text-inverse);
  font-weight: var(--fw-medium);
  transition: color 0.3s ease;
}

nav a:hover {
  color: var(--color-secondary);
}
</style>
