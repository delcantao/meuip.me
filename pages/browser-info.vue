<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
    <div class="animate-fade-in">
      <h1 class="text-3xl sm:text-4xl font-bold text-white mb-3">Browser Information</h1>
      <p class="text-slate-400">Detailed information about your browser, operating system and device.</p>
    </div>

    <div v-if="!info" class="space-y-3">
      <div v-for="i in 6" :key="i" class="glass-card p-4 flex gap-3 animate-pulse">
        <div class="w-8 h-8 rounded-lg bg-slate-800" />
        <div class="flex-1 space-y-2">
          <div class="h-3 bg-slate-800 rounded w-24" />
          <div class="h-4 bg-slate-800 rounded w-48" />
        </div>
      </div>
    </div>

    <div v-else class="space-y-3 animate-slide-up">
      <InfoItem v-for="item in items" :key="item.label" v-bind="item" />
    </div>

    <!-- Raw User-Agent -->
    <div v-if="info?.userAgent" class="glass-card p-5 animate-fade-in">
      <p class="text-xs text-slate-500 uppercase tracking-wider font-medium mb-2">Raw User-Agent</p>
      <p class="text-sm font-mono text-slate-300 break-all">{{ info.userAgent }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoPage({
  title:       'Browser Information — Detect your browser, OS & device | meuip.me',
  description: 'Detect your browser, operating system, language, screen resolution and device capabilities. Free browser fingerprint tool.',
  path:        '/browser-info',
  keywords:    'browser information, browser fingerprint, detect browser, browser details, os detection, user agent, screen resolution',
  jsonLd: jsonLdWebPage({
    name:        'Browser Information',
    description: 'Detailed browser, OS and device detection tool.',
    url:         'https://meuip.me/browser-info',
    breadcrumbs: [{ name: 'Home', url: 'https://meuip.me' }, { name: 'Browser Information', url: 'https://meuip.me/browser-info' }],
  }),
})

const info = ref<any>(null)

const items = computed(() => info.value ? [
  { icon: '🌐', label: 'Browser',          value: info.value.browser },
  { icon: '💻', label: 'Operating System', value: info.value.os },
  { icon: '🗣', label: 'Language',         value: info.value.language },
  { icon: '📐', label: 'Screen',           value: `${screen.width}×${screen.height}` },
  { icon: '🎨', label: 'Color Depth',      value: `${screen.colorDepth}-bit` },
  { icon: '🕐', label: 'Timezone',         value: Intl.DateTimeFormat().resolvedOptions().timeZone },
  { icon: '🔌', label: 'Connection',       value: (navigator as any).connection?.effectiveType || 'Unknown' },
  { icon: '🍪', label: 'Cookies',          value: navigator.cookieEnabled ? 'Enabled' : 'Disabled' },
  { icon: '🔒', label: 'Do Not Track',     value: navigator.doNotTrack === '1' ? 'Enabled' : 'Not set' },
] : [])

onMounted(async () => {
  info.value = await $fetch('/api/browser')
})
</script>
