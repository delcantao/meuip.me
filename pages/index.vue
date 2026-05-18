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

    <!-- ═══════════════════════════════════════════════════════════════════
         SEO CONTENT BLOCK — human-readable, keyword-rich, crawlable
         Kept visually subtle so it doesn't disrupt the tool UX.
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="mt-12 border-t border-slate-800/50 pt-10 space-y-8 text-slate-400 text-sm leading-relaxed">

      <!-- What is an IP address -->
      <div class="space-y-3">
        <h2 class="text-base font-semibold text-slate-200">{{ t('seo.whatIsIp.heading') }}</h2>
        <p>{{ t('seo.whatIsIp.p1') }}</p>
        <p>{{ t('seo.whatIsIp.p2') }}</p>
      </div>

      <!-- IPv4 vs IPv6 -->
      <div class="space-y-3">
        <h2 class="text-base font-semibold text-slate-200">{{ t('seo.ipv4vsIpv6.heading') }}</h2>
        <p>{{ t('seo.ipv4vsIpv6.p1') }}</p>
        <p>{{ t('seo.ipv4vsIpv6.p2') }}</p>
      </div>

      <!-- Why know your IP -->
      <div class="space-y-3">
        <h2 class="text-base font-semibold text-slate-200">{{ t('seo.whyKnow.heading') }}</h2>
        <p>{{ t('seo.whyKnow.p1') }}</p>
        <ul class="list-disc list-inside space-y-1 pl-2">
          <li>{{ t('seo.whyKnow.li1') }}</li>
          <li>{{ t('seo.whyKnow.li2') }}</li>
          <li>{{ t('seo.whyKnow.li3') }}</li>
          <li>{{ t('seo.whyKnow.li4') }}</li>
        </ul>
      </div>

      <!-- VPN & Privacy -->
      <div class="space-y-3">
        <h2 class="text-base font-semibold text-slate-200">{{ t('seo.vpn.heading') }}</h2>
        <p>{{ t('seo.vpn.p1') }}</p>
        <p>{{ t('seo.vpn.p2') }}</p>
      </div>

      <!-- Internal tool links -->
      <nav aria-label="Related tools" class="pt-2">
        <p class="text-slate-500 mb-3 text-xs uppercase tracking-widest font-medium">{{ t('seo.tools.heading') }}</p>
        <ul class="flex flex-wrap gap-3">
          <li>
            <NuxtLink :to="localePath('/what-is-my-ip')" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 text-slate-300 hover:text-white transition-colors text-xs">
              🌐 {{ t('seo.tools.whatIsMyIp') }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/ipv6-test')" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 text-slate-300 hover:text-white transition-colors text-xs">
              🔢 {{ t('seo.tools.ipv6Test') }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/dns-leak-test')" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 text-slate-300 hover:text-white transition-colors text-xs">
              🔒 {{ t('seo.tools.dnsLeak') }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/webrtc-test')" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 text-slate-300 hover:text-white transition-colors text-xs">
              📡 {{ t('seo.tools.webrtc') }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/browser-info')" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 text-slate-300 hover:text-white transition-colors text-xs">
              💻 {{ t('seo.tools.browser') }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/headers')" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 text-slate-300 hover:text-white transition-colors text-xs">
              📋 {{ t('seo.tools.headers') }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

    </section>

  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const { data: info, loading, refresh } = useNetworkInfo()
const { history, add: addHistory, clear: clearHistory } = useIpHistory()
const localePath = useLocalePath()

// SEO — uses composable for canonical, hreflang, OG, Twitter, JSON-LD
useSeoPage({
  title:       () => t('meta.home.title'),
  description: () => t('meta.home.description'),
  path:        '/',
  keywords:    'qual meu ip, meu ip, descobrir ip, verificar ip, what is my ip, public ip checker, ip address lookup, meu endereço ip, ip público, my public ip',
  jsonLd: [
    jsonLdWebSite(),
    jsonLdWebApplication({
      name:        'meuip.me — IP Address Lookup',
      description: computed(() => t('meta.home.description')).value,
      url:         'https://meuip.me',
    }),
    jsonLdOrganization(),
  ],
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
