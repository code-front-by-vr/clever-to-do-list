<script>
import { RouterLink } from 'vue-router'

export default {
  components: {
    RouterLink,
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated']
    },
    userEmail() {
      return this.$store.state.auth.user?.email || ''
    },
    userInitial() {
      return this.userEmail ? this.userEmail[0].toUpperCase() : ''
    },
    navLinks() {
      if (this.isAuthenticated) {
        return [
          { to: '/', text: 'Home' },
          { to: '/tasks', text: 'Tasks' },
        ]
      }
      return [
        { to: '/', text: 'Home' },
        { to: '/sign-in', text: 'Sign In' },
        { to: '/register', text: 'Register' },
      ]
    },
  },
  methods: {
    async handleLogout() {
      try {
        await this.$store.dispatch('auth/logout')
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

        <template v-if="isAuthenticated" class="user-bar">
          <li class="header-nav__item user-bar__item" :title="userEmail">
            {{ userInitial }}
          </li>

          <li class="header-nav__item">
            <button @click="handleLogout" class="header-nav__logout">Logout</button>
          </li>
        </template>
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
  --color-link: var(--color-text-muted-light);
  position: relative;
  color: var(--color-link);
  font-weight: var(--fw-medium);
  cursor: pointer;
  transition: color 0.3s ease;
  padding-bottom: var(--space-xs);
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

.header-nav__link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: var(--space-2xs);
  background-color: var(--color-secondary);
  transition: width 0.3s ease;
}

.header-nav__link:hover::after {
  width: 100%;
}

.header-nav__link.router-link-active::after,
.header-nav__link.router-link-exact-active::after {
  width: 100%;
}

.header-nav__link.router-link-active,
.header-nav__link.router-link-exact-active {
  --color-link: var(--color-text-inverse);
}

.user-bar__item {
  width: var(--space-3xl);
  height: var(--space-3xl);
  border-radius: var(--radius-full);
  background: var(--color-surface);
  color: var(--color-text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--fw-bold);
  font-size: var(--font-size-base);
  text-transform: uppercase;
  cursor: default;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}
</style>
