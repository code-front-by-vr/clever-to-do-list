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

  if (scheme === 'light') return 'light'
  if (scheme === 'dark') return 'dark'
  return 'auto'
}

export function systemPrefersDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function toggleTheme() {
  const current = getColorScheme()

  if (current === 'light') {
    setColorScheme('dark')
  } else if (current === 'dark') {
    setColorScheme('light')
  } else {
    const prefersDark = systemPrefersDark()
    setColorScheme(prefersDark ? 'light' : 'dark')
  }
}

if (typeof window !== 'undefined') {
  window.themeUtils = {
    setColorScheme,
    getColorScheme,
    toggleTheme,
    systemPrefersDark,
  }
}
