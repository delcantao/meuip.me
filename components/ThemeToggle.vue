<template>
  <div class="relative">
    <button
      @click="cycleTheme"
      :title="label"
      class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm transition-colors"
      :class="isDark
        ? 'text-slate-400 hover:text-white hover:bg-slate-800/60'
        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'"
    >
      <!-- Sun -->
      <svg v-if="currentTheme === 'light'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="5"/>
        <path stroke-linecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
      </svg>
      <!-- Moon -->
      <svg v-else-if="currentTheme === 'dark'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/>
      </svg>
      <!-- Monitor (system) -->
      <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path stroke-linecap="round" d="M8 21h8M12 17v4"/>
      </svg>
      <span class="hidden sm:inline text-xs">{{ label }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
const { currentTheme, setTheme } = useTheme()
const { t } = useI18n()

const isDark = computed(() => {
  if (!import.meta.client) return true
  return document.documentElement.classList.contains('dark')
})

const label = computed(() => {
  if (currentTheme.value === 'light')  return t('theme.light')
  if (currentTheme.value === 'dark')   return t('theme.dark')
  return t('theme.system')
})

function cycleTheme() {
  const next = currentTheme.value === 'light' ? 'dark'
    : currentTheme.value === 'dark' ? 'system'
    : 'light'
  setTheme(next)
}

onMounted(() => {
  const { watchSystem, applyTheme } = useTheme()
  applyTheme(currentTheme.value)
  watchSystem()
})
</script>
