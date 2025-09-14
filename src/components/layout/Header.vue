<script>
import { RouterLink } from 'vue-router'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    RouterLink,
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
    navLinks() {
      if (this.isAuthenticated) {
        return [
          { to: '/', text: 'Home' },
          { to: '/tasks', text: 'Tasks' },
        ]
      } else {
        return [
          { to: '/', text: 'Home' },
          { to: '/sign-in', text: 'Sign In' },
          { to: '/register', text: 'Register' },
        ]
      }
    },
  },
  methods: {
    ...mapActions('auth', ['logout']),
    async handleLogout() {
      await this.logout()
      location.href = '/'
    },
  },
}
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/" class="logo">To-Do List</RouterLink>
      <ul class="nav-menu">
        <li v-for="link in navLinks" :key="link.to">
          <RouterLink :to="link.to">{{ link.text }}</RouterLink>
        </li>

        <li v-if="isAuthenticated">
          <button @click="handleLogout" class="logout-btn">Logout</button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
header {
  width: 100%;
  background-color: var(--color-primary);
  padding: var(--space-md) var(--space-xl);
}

.logo {
  font-size: var(--font-size-xl);
  font-weight: var(--fw-semibold);
  color: var(--color-text-inverse);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-2xl);
  font-size: var(--font-size-base);
  text-align: center;
  text-transform: uppercase;
}

.nav-menu {
  display: flex;
  gap: var(--space-3xl);
  align-items: center;
  margin-left: auto;
}

nav li,
nav a {
  color: var(--color-text-inverse);
  font-weight: var(--fw-medium);
  cursor: pointer;
  transition: color 0.3s ease;
}

.logout-btn {
  background: none;
  border: none;
  font-size: inherit;
  text-transform: uppercase;
  padding: 0;
  font-family: inherit;
  text-decoration: none;
  display: inline-block;
  color: inherit;
  font-weight: inherit;
  cursor: inherit;
  transition: inherit;
}

nav a:hover:not(.logo),
nav li:hover,
nav li:hover .logout-btn {
  color: var(--color-secondary);
}

nav a.router-link-active:not(.logo) {
  color: var(--color-secondary);
  font-weight: var(--fw-semibold);
}
</style>
