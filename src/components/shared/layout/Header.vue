<script>
import { RouterLink } from 'vue-router'
import { ThemeToggle } from '@/components/shared/ui'

export default {
  components: {
    RouterLink,
    ThemeToggle,
  },
  data() {
    return {
      showUserDropdown: false,
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated']
    },
    userEmail() {
      return this.$store.state.auth.user?.email ?? ''
    },
    userInitial() {
      return this.userEmail?.[0]?.toUpperCase() ?? ''
    },
    navLinks() {
      if (this.isAuthenticated) {
        return [
          { to: '/', text: 'Home' },
          { to: '/tasks', text: 'Tasks' },
        ]
      }
      return [
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
    toggleUserDropdown() {
      this.showUserDropdown = !this.showUserDropdown
    },
    closeUserDropdown() {
      this.showUserDropdown = false
    },
  },
  mounted() {
    this.handleClickOutside = e => {
      if (!this.$refs.userDropdown?.contains(e.target)) {
        this.closeUserDropdown()
      }
    }
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  },
}
</script>

<template>
  <header class="header">
    <nav class="header-nav">
      <RouterLink to="/" class="header-nav__logo typography-title">To-Do List</RouterLink>

      <div class="header-nav__content">
        <ul v-if="isAuthenticated" class="header-nav__menu header-nav__menu--auth">
          <li v-for="link in navLinks" :key="link.to" class="header-nav__item">
            <RouterLink :to="link.to" class="header-nav__link">{{ link.text }}</RouterLink>
          </li>
        </ul>

        <ul class="header-nav__menu header-nav__menu--right">
          <template v-if="!isAuthenticated">
            <li v-for="link in navLinks" :key="link.to" class="header-nav__item">
              <RouterLink :to="link.to" class="header-nav__link">{{ link.text }}</RouterLink>
            </li>
          </template>

          <li class="header-nav__item theme-toggle">
            <ThemeToggle />
          </li>

          <template v-if="isAuthenticated">
            <li class="header-nav__item user-dropdown" ref="userDropdown">
              <button
                @click="toggleUserDropdown"
                class="user-bar__item"
                :title="userEmail"
                :class="{ 'user-bar__item--active': showUserDropdown }"
              >
                {{ userInitial }}
              </button>

              <div v-if="showUserDropdown" class="user-dropdown__menu">
                <div class="user-dropdown__email typography-caption">{{ userEmail }}</div>
                <button @click="handleLogout" class="user-dropdown__logout">Logout</button>
              </div>
            </li>
          </template>
        </ul>
      </div>
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
}

.header-nav__logo {
  font-size: var(--font-size-xl);
  font-weight: var(--fw-semibold);
  color: var(--color-text-inverse);
}

.header-nav__content {
  display: flex;
  align-items: center;
  gap: var(--space-4xl);
  flex: 1;
}

.header-nav__menu {
  display: flex;
  gap: var(--space-3xl);
  align-items: center;
}

.header-nav__menu--auth {
  margin-left: var(--space-4xl);
}

.header-nav__menu--right {
  margin-left: auto;
}

.header-nav__item,
.header-nav__link {
  --color-link: var(--color-nav-link);
  position: relative;
  color: var(--color-link);
  font-weight: var(--fw-medium);
  cursor: pointer;
  transition: color 0.3s ease;
  padding-bottom: var(--space-xs);
}

.header-nav__link:hover {
  --color-link: var(--color-nav-link-active);
}

.header-nav__link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: var(--space-2xs);
  background-color: var(--color-nav-underline);
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
  --color-link: var(--color-nav-link-active);
}

.user-dropdown {
  position: relative;
  padding-bottom: 0;
}

.user-bar__item {
  width: var(--space-3xl);
  height: var(--space-3xl);
  border-radius: var(--radius-full);
  background: var(--color-user-avatar-bg);
  color: var(--color-user-avatar-text);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--fw-bold);
  font-size: var(--font-size-base);
  cursor: pointer;
  padding: 0;
  border: none;
  transition: all 0.3s ease;
}

.user-bar__item:hover,
.user-bar__item--active {
  background: var(--color-surface-hover);
  color: var(--color-text-primary);
  transform: scale(1.05);
  box-shadow: var(--shadow-surface);
}

.user-dropdown__menu {
  position: absolute;
  top: calc(100% + var(--space-sm));
  right: 0;
  background: var(--color-surface);
  border: var(--border-thin) var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-modal);
  padding: var(--space-xl) var(--space-2xl);
  z-index: 60;
  animation: dropdownFadeIn 0.2s ease-out;
}

.user-dropdown__email {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  padding: var(--space-sm) 0;
  border-bottom: var(--border-thin) var(--color-border-muted);
  margin-bottom: var(--space-sm);
  text-transform: none;
  word-break: normal;
}

.user-dropdown__logout {
  background: var(--color-accent-warning);
  color: var(--color-text-inverse);
  border: none;
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  font-weight: var(--fw-medium);
  cursor: pointer;
  width: 100%;
  transition: all 0.3s ease;
}

.user-dropdown__logout:hover {
  background: var(--color-accent-error);
  transform: translateY(-1px);
}

.theme-toggle {
  padding-bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

@keyframes dropdownFadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .header-nav__content {
    gap: var(--space-2xl);
  }

  .header-nav__menu {
    gap: var(--space-2xl);
  }

  .header-nav__menu--auth {
    margin-left: var(--space-2xl);
  }

  .user-dropdown__menu {
    min-width: 180px;
  }
}
</style>
