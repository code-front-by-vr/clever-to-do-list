<script>
import { Sun, Moon, Monitor } from 'lucide-vue-next'
import { toggleTheme, loadThemeFromStorage } from '@/lib/utils'

export default {
  name: 'ThemeToggle',
  components: {
    Sun,
    Moon,
    Monitor,
  },
  data() {
    return {
      currentTheme: 'auto',
    }
  },
  computed: {
    themeIcon() {
      switch (this.currentTheme) {
        case 'light':
          return Sun
        case 'dark':
          return Moon
        case 'auto':
        default:
          return Monitor
      }
    },
  },
  mounted() {
    this.currentTheme = loadThemeFromStorage()
  },
  methods: {
    handleToggle() {
      const newTheme = toggleTheme()
      this.currentTheme = newTheme
    },
  },
}
</script>

<template>
  <button @click="handleToggle" class="theme-toggle">
    <component :is="themeIcon" class="theme-toggle__icon" />
  </button>
</template>

<style scoped>
.theme-toggle {
  --btn-background-color: transparent;
  --border-color: var(--color-text-muted-light);
  --text-color: var(--color-text-muted-light);

  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--btn-background-color);
  border: var(--border-thin) var(--border-color);
  border-radius: var(--radius-md);
  padding: 0;
  color: var(--text-color);
  font-family: inherit;
  cursor: pointer;
  transition: all 0.3s ease;
  width: var(--space-3xl);
  height: var(--space-3xl);
}

.theme-toggle:hover,
.theme-toggle:focus {
  --btn-background-color: var(--color-surface-hover);
  --border-color: var(--color-primary);
  --text-color: var(--color-primary);
}

.theme-toggle:active {
  transform: scale(0.95);
}

.theme-toggle__icon {
  width: 1.125rem;
  height: 1.125rem;
  stroke-width: 2;
  display: block;
  flex-shrink: 0;
}
</style>
