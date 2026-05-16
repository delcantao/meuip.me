export type Theme = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'meuipme_theme'

function getSystemTheme(): 'light' | 'dark' {
  if (!import.meta.client) return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(theme: Theme) {
  if (!import.meta.client) return
  const resolved = theme === 'system' ? getSystemTheme() : theme
  const html = document.documentElement
  html.classList.remove('dark', 'light')
  html.classList.add(resolved)
  html.setAttribute('data-theme', resolved)
}

export function useTheme() {
  const saved = import.meta.client ? (localStorage.getItem(STORAGE_KEY) as Theme | null) : null
  const currentTheme = useState<Theme>('theme', () => (saved ?? 'system'))

  function setTheme(theme: Theme) {
    currentTheme.value = theme
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, theme)
      applyTheme(theme)
    }
  }

  function toggleTheme() {
    const next: Theme = currentTheme.value === 'dark' ? 'light'
      : currentTheme.value === 'light' ? 'system'
      : 'dark'
    setTheme(next)
  }

  function detectSystemTheme() {
    return getSystemTheme()
  }

  // Sync on system preference change
  function watchSystem() {
    if (!import.meta.client) return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    mq.addEventListener('change', () => {
      if (currentTheme.value === 'system') applyTheme('system')
    })
  }

  return { currentTheme, setTheme, toggleTheme, detectSystemTheme, applyTheme, watchSystem }
}
