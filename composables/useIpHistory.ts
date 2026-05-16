export interface HistoryEntry {
  ip:   string
  date: string
  isp?: string
}

const STORAGE_KEY = 'meuipme_history'
const MAX_ENTRIES = 10

export function useIpHistory() {
  const history = ref<HistoryEntry[]>([])

  function load() {
    if (!import.meta.client) return
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      history.value = raw ? JSON.parse(raw) : []
    } catch {
      history.value = []
    }
  }

  function add(entry: HistoryEntry) {
    if (!import.meta.client) return
    load()
    const exists = history.value.find(e => e.ip === entry.ip)
    if (!exists) {
      history.value.unshift(entry)
      if (history.value.length > MAX_ENTRIES) history.value.pop()
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history.value))
    }
  }

  function clear() {
    if (!import.meta.client) return
    history.value = []
    localStorage.removeItem(STORAGE_KEY)
  }

  onMounted(load)

  return { history, add, clear, load }
}
