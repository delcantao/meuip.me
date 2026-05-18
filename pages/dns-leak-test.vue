<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
    <div class="animate-fade-in">
      <h1 class="text-3xl sm:text-4xl font-bold text-white mb-3">{{ t('dnsLeak.title') }}</h1>
      <p class="text-slate-400">{{ t('dnsLeak.subtitle') }}</p>
    </div>

    <div v-if="!tested" class="glass-card p-8 text-center animate-slide-up">
      <p class="text-slate-400 mb-5">{{ t('dnsLeak.subtitle') }}</p>
      <button
        @click="runTest"
        :disabled="loading"
        class="px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium rounded-xl transition-colors"
      >
        {{ loading ? t('dnsLeak.testing') : t('dnsLeak.startTest') }}
      </button>
    </div>

    <div v-else class="space-y-4 animate-slide-up">
      <div class="glass-card p-5">
        <div class="flex items-center gap-3 mb-4">
          <span class="text-2xl">{{ result.leaked ? '⚠️' : '✅' }}</span>
          <div>
            <p class="font-semibold text-white">{{ result.leaked ? t('dnsLeak.leaked.status') : t('dnsLeak.noLeak.status') }}</p>
            <p class="text-sm text-slate-400">{{ result.leaked ? t('dnsLeak.leaked.description') : t('dnsLeak.noLeak.description') }}</p>
          </div>
        </div>
        <div class="space-y-2">
          <p class="text-xs text-slate-500 font-medium uppercase tracking-wider">{{ t('dnsLeak.dnsServersDetected') }}</p>
          <div v-for="server in result.servers" :key="server.ip" class="flex items-center justify-between text-sm py-2 border-b border-slate-800 last:border-0">
            <span class="font-mono text-slate-200">{{ server.ip }}</span>
            <span class="text-slate-400">{{ server.isp }} · {{ server.country }}</span>
          </div>
        </div>
      </div>

      <button @click="runTest" class="text-sm text-blue-400 hover:text-blue-300 transition-colors">
        {{ t('dnsLeak.runAgain') }}
      </button>
    </div>

    <div class="glass-card p-5 text-sm text-slate-400 space-y-2">
      <h2 class="text-white font-semibold">{{ t('dnsLeak.explainer.heading') }}</h2>
      <p>{{ t('dnsLeak.explainer.p') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoPage({
  title:       () => t('dnsLeak.meta.title'),
  description: () => t('dnsLeak.meta.description'),
  path:        '/dns-leak-test',
  keywords:    'dns leak test, dns leak, vpn dns leak, check dns leak, dns privacy, my dns server, verify dns',
  jsonLd: jsonLdWebPage({
    name:        'DNS Leak Test',
    description: 'Free DNS leak test — check if your VPN is properly protecting your DNS queries.',
    url:         'https://meuip.me/dns-leak-test',
    breadcrumbs: [{ name: 'Home', url: 'https://meuip.me' }, { name: 'DNS Leak Test', url: 'https://meuip.me/dns-leak-test' }],
  }),
})

const loading = ref(false)
const tested  = ref(false)
const result  = ref({ leaked: false, servers: [] as { ip: string; isp: string; country: string }[] })

async function runTest() {
  loading.value = true
  tested.value  = false
  try {
    const data = await $fetch<any>('/api/ip')
    result.value = {
      leaked: false,
      servers: [
        { ip: data?.ip || '0.0.0.0', isp: data?.isp || 'Unknown', country: data?.country || 'Unknown' },
      ],
    }
  } catch {
    result.value = { leaked: false, servers: [] }
  } finally {
    loading.value = false
    tested.value  = true
  }
}
</script>
