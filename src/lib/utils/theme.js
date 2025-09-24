const THEME_STORAGE_KEY = 'clever-todo-theme'

export function setColorScheme(scheme) {
  const root = document.documentElement

  switch (scheme) {
    case 'light':
      root.style.colorScheme = 'light'
      break
    case 'dark':
      root.style.colorScheme = 'dark'
      break
    case 'auto':
    default:
      root.style.colorScheme = 'light dark'
      break
  }
}

export function getColorScheme() {
  const root = document.documentElement
  const scheme = root.style.colorScheme

  if (scheme === 'light dark') return 'auto'
  return scheme || 'auto'
}

export function systemPrefersDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function toggleTheme() {
  const current = getColorScheme()
  let newTheme

  if (current === 'light') {
    newTheme = 'dark'
  } else if (current === 'dark') {
    newTheme = 'light'
  } else {
    const prefersDark = systemPrefersDark()
    newTheme = prefersDark ? 'light' : 'dark'
  }

  applyTheme(newTheme)
  return newTheme
}

export function saveThemeToStorage(theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch (error) {
    console.warn('Failed to save theme to localStorage:', error)
  }
}

export function loadThemeFromStorage() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) || 'auto'
  } catch (error) {
    console.warn('Failed to load theme from localStorage:', error)
    return 'auto'
  }
}

export function applyTheme(theme) {
  setColorScheme(theme)
  saveThemeToStorage(theme)
}

export function initializeTheme() {
  const savedTheme = loadThemeFromStorage()
  setColorScheme(savedTheme)
  return savedTheme
}
