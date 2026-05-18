<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
    <div class="animate-fade-in">
      <h1 class="text-3xl sm:text-4xl font-bold text-white mb-3">{{ t('browserInfo.title') }}</h1>
      <p class="text-slate-400">{{ t('browserInfo.subtitle') }}</p>
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
      <p class="text-xs text-slate-500 uppercase tracking-wider font-medium mb-2">{{ t('browserInfo.rawUserAgent') }}</p>
      <p class="text-sm font-mono text-slate-300 break-all">{{ info.userAgent }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoPage({
  title:       () => t('browserInfo.meta.title'),
  description: () => t('browserInfo.meta.description'),
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
  { icon: '🌐', label: t('browserInfo.labels.browser'),    value: info.value.browser },
  { icon: '💻', label: t('browserInfo.labels.os'),         value: info.value.os },
  { icon: '🗣', label: t('browserInfo.labels.language'),   value: info.value.language },
  { icon: '📐', label: t('browserInfo.labels.screen'),     value: `${screen.width}×${screen.height}` },
  { icon: '🎨', label: t('browserInfo.labels.colorDepth'), value: `${screen.colorDepth}-bit` },
  { icon: '🕐', label: t('browserInfo.labels.timezone'),   value: Intl.DateTimeFormat().resolvedOptions().timeZone },
  { icon: '🔌', label: t('browserInfo.labels.connection'), value: (navigator as any).connection?.effectiveType || t('home.notAvailable') },
  { icon: '🍪', label: t('browserInfo.labels.cookies'),    value: navigator.cookieEnabled ? t('browserInfo.cookies.enabled') : t('browserInfo.cookies.disabled') },
  { icon: '🔒', label: t('browserInfo.labels.doNotTrack'), value: navigator.doNotTrack === '1' ? t('browserInfo.doNotTrack.enabled') : t('browserInfo.doNotTrack.notSet') },
] : [])

onMounted(async () => {
  info.value = await $fetch('/api/browser')
})
</script>
