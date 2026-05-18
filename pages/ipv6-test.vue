<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
    <div class="animate-fade-in">
      <h1 class="text-3xl sm:text-4xl font-bold text-white mb-3">{{ t('ipv6Test.title') }}</h1>
      <p class="text-slate-400">{{ t('ipv6Test.subtitle') }}</p>
    </div>

    <div class="grid sm:grid-cols-2 gap-4 animate-slide-up">
      <!-- IPv4 -->
      <div class="glass-card p-5">
        <p class="text-xs text-blue-400 uppercase tracking-widest font-medium mb-2">{{ t('ipv6Test.ipv4Address') }}</p>
        <p class="text-2xl font-bold font-mono text-white break-all">{{ ipv4 || '...' }}</p>
        <span class="mt-2 badge bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">{{ t('home.connected') }}</span>
      </div>

      <!-- IPv6 -->
      <div class="glass-card p-5">
        <p class="text-xs text-blue-400 uppercase tracking-widest font-medium mb-2">{{ t('ipv6Test.ipv6Address') }}</p>
        <p class="text-2xl font-bold font-mono text-white break-all">{{ ipv6 || t('home.notAvailable') }}</p>
        <span
          class="mt-2 badge"
          :class="ipv6 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'"
        >
          {{ ipv6 ? t('home.ipv6Active') : t('home.ipv6Unavailable') }}
        </span>
      </div>
    </div>

    <div class="glass-card p-6 space-y-3 text-sm text-slate-400 animate-fade-in">
      <h2 class="text-white font-semibold text-base">{{ t('ipv6Test.explainer.heading') }}</h2>
      <p>{{ t('ipv6Test.explainer.p1') }}</p>
      <p>{{ t('ipv6Test.explainer.p2') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoPage({
  title:       () => t('ipv6Test.meta.title'),
  description: () => t('ipv6Test.meta.description'),
  path:        '/ipv6-test',
  keywords:    'ipv6 test, my ipv6, check ipv6, ipv6 address, meu ipv6, teste ipv6, ipv6 connectivity, ipv4 vs ipv6',
  jsonLd: [
    jsonLdWebPage({
      name:        'IPv6 Test — Check your IPv6 connectivity',
      description: 'Test if your internet connection supports IPv6 and find your IPv6 address.',
      url:         'https://meuip.me/ipv6-test',
      breadcrumbs: [{ name: 'Home', url: 'https://meuip.me' }, { name: 'IPv6 Test', url: 'https://meuip.me/ipv6-test' }],
    }),
  ],
})

const { t } = useI18n()
const ipv4 = ref('')
const ipv6 = ref('')

onMounted(async () => {
  const data = await $fetch<any>('/api/ip')
  if (data?.version === 'IPv6') {
    ipv6.value = data.ip
  } else {
    ipv4.value = data?.ip || ''
  }
})
</script>
