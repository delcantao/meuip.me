<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">

    <!-- AdSense top placeholder -->
    <div id="adsense-top" aria-hidden="true" class="hidden" />

    <!-- Heading -->
    <div class="text-center space-y-2 animate-fade-in">
      <h1 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">{{ t('home.title') }}</h1>
      <p class="text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-md mx-auto">{{ t('home.subtitle') }}</p>
    </div>

    <!-- IP Card -->
    <IpCard
      :ip="info.ip || ''"
      :ip-version="info.version || 'IPv4'"
      :vpn-status="null"
    />

    <!-- Info Grid -->
    <InfoGrid :items="gridItems" :loading="loading" />

    <!-- AdSense sidebar placeholder (desktop) -->
    <div id="adsense-side" class="hidden lg:block" aria-hidden="true" />

    <!-- IP History -->
    <div v-if="history.length" class="glass-card p-5 animate-fade-in">
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-sm font-semibold text-slate-700 dark:text-slate-300">{{ t('home.history') }}</h2>
        <button @click="clearHistory" class="text-xs text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors">
          {{ t('home.clearHistory') }}
        </button>
      </div>
      <ul class="space-y-1.5">
        <li
          v-for="entry in history"
          :key="entry.ip + entry.date"
          class="flex items-center justify-between text-sm"
        >
          <span class="font-mono text-slate-800 dark:text-slate-200">{{ entry.ip }}</span>
          <span class="text-xs text-slate-400 dark:text-slate-500">{{ entry.isp }} · {{ formatDate(entry.date) }}</span>
        </li>
      </ul>
    </div>

    <!-- API CTA -->
    <ApiSection />

  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const { data: info, loading, refresh } = useNetworkInfo()
const { history, add: addHistory, clear: clearHistory } = useIpHistory()
const localePath = useLocalePath()

// SEO
useSeoMeta({
  title:          () => t('meta.home.title'),
  description:    () => t('meta.home.description'),
  ogTitle:        () => t('meta.home.title'),
  ogDescription:  () => t('meta.home.description'),
  ogUrl:          'https://meuip.me',
  ogType:         'website',
  ogImage:        'https://meuip.me/og-image.png',
  twitterCard:    'summary_large_image',
  twitterTitle:   () => t('meta.home.title'),
  twitterDescription: () => t('meta.home.description'),
  robots:         'index, follow',
})

useHead({
  link: [{ rel: 'canonical', href: 'https://meuip.me' }],
  script: [{
    type: 'application/ld+json',
    innerHTML: computed(() => JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'meuip.me',
      url: 'https://meuip.me',
      description: t('meta.home.description'),
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
    })),
  }],
})

// Grid items
const flagEmoji = (code: string) => {
  if (!code || code.length !== 2) return '🌐'
  const offset = 127397
  return String.fromCodePoint(...[...code.toUpperCase()].map(c => c.charCodeAt(0) + offset))
}

const gridItems = computed(() => {
  const d = info.value
  return [
    { icon: flagEmoji(d?.countryCode || ''), label: t('home.country'),   value: d?.country },
    { icon: '🏙',  label: t('home.city'),      value: d?.city },
    { icon: '📡',  label: t('home.isp'),       value: d?.isp },
    { icon: '🔢',  label: t('home.asn'),       value: d?.asn },
    { icon: '🕐',  label: t('home.timezone'),  value: d?.timezone },
    { icon: '💻',  label: t('home.os'),        value: d?.os },
    { icon: '🌐',  label: t('home.browser'),   value: d?.browser },
    { icon: '🌍',  label: t('home.language'),  value: d?.language },
    {
      icon: d?.ipv6Available ? '✅' : '❌',
      label: t('home.ipv6'),
      value: d?.ipv6Available ? t('home.available') : (d ? t('home.unavailable') : undefined),
    },
  ]
})

// Load data on mount
onMounted(async () => {
  await refresh()
  if (info.value?.ip) {
    addHistory({ ip: info.value.ip, date: new Date().toISOString(), isp: info.value.isp })
  }
})

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(locale.value, { day: '2-digit', month: 'short' })
}
</script>
