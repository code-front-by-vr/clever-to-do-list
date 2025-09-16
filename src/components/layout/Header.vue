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
      try {
        await this.logout()
        location.href = '/sign-in'
      } catch (err) {
        console.error('Header/handleLogout error:', err)
      }
    },
  },
}
</script>

<template>
  <header class="header">
    <nav class="header-nav">
      <RouterLink to="/" class="header-nav__logo">To-Do List</RouterLink>
      <ul class="header-nav__menu">
        <li v-for="link in navLinks" :key="link.to" class="header-nav__item">
          <RouterLink :to="link.to" class="header-nav__link">{{ link.text }}</RouterLink>
        </li>

        <li v-if="isAuthenticated" class="header-nav__item">
          <button @click="handleLogout" class="header-nav__logout">Logout</button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.header {
  width: 100%;
  background-color: var(--color-primary);
  padding: var(--space-md) var(--space-xl);
}

.header-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-2xl);
  font-size: var(--font-size-base);
  text-align: center;
  text-transform: uppercase;
}

.header-nav__logo {
  font-size: var(--font-size-xl);
  font-weight: var(--fw-semibold);
  color: var(--color-text-inverse);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.header-nav__menu {
  display: flex;
  gap: var(--space-3xl);
  align-items: center;
  margin-left: auto;
}

.header-nav__item,
.header-nav__link {
  color: var(--color-text-inverse);
  font-weight: var(--fw-medium);
  cursor: pointer;
  transition: color 0.3s ease;
}

.header-nav__logout {
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

.header-nav__link:hover:not(.header-nav__logo),
.header-nav__item:hover,
.header-nav__item:hover .header-nav__logout {
  color: var(--color-secondary);
}

.header-nav__link.router-link-active:not(.header-nav__logo) {
  color: var(--color-secondary);
  font-weight: var(--fw-semibold);
}
</style>
