// Runs before hydration to prevent flash of wrong theme
export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    const saved = localStorage.getItem('meuipme_theme') as 'light' | 'dark' | 'system' | null
    const theme = saved ?? 'system'
    const resolved = theme === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme
    const html = document.documentElement
    html.classList.remove('dark', 'light')
    html.classList.add(resolved)
    html.setAttribute('data-theme', resolved)
  }
})
