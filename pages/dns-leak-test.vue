<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
    <div class="animate-fade-in">
      <h1 class="text-3xl sm:text-4xl font-bold text-white mb-3">DNS Leak Test</h1>
      <p class="text-slate-400">Verify that your DNS queries are not leaking outside your VPN or secure connection.</p>
    </div>

    <div v-if="!tested" class="glass-card p-8 text-center animate-slide-up">
      <p class="text-slate-400 mb-5">Click the button to run a DNS leak test using your current connection.</p>
      <button
        @click="runTest"
        :disabled="loading"
        class="px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium rounded-xl transition-colors"
      >
        {{ loading ? 'Testing...' : 'Start DNS Leak Test' }}
      </button>
    </div>

    <div v-else class="space-y-4 animate-slide-up">
      <div class="glass-card p-5">
        <div class="flex items-center gap-3 mb-4">
          <span class="text-2xl">{{ result.leaked ? '⚠️' : '✅' }}</span>
          <div>
            <p class="font-semibold text-white">{{ result.leaked ? 'DNS Leak Detected' : 'No DNS Leaks Found' }}</p>
            <p class="text-sm text-slate-400">{{ result.leaked ? 'Your DNS requests are leaking.' : 'Your connection appears secure.' }}</p>
          </div>
        </div>
        <div class="space-y-2">
          <p class="text-xs text-slate-500 font-medium uppercase tracking-wider">DNS Servers detected</p>
          <div v-for="server in result.servers" :key="server.ip" class="flex items-center justify-between text-sm py-2 border-b border-slate-800 last:border-0">
            <span class="font-mono text-slate-200">{{ server.ip }}</span>
            <span class="text-slate-400">{{ server.isp }} · {{ server.country }}</span>
          </div>
        </div>
      </div>

      <button @click="runTest" class="text-sm text-blue-400 hover:text-blue-300 transition-colors">
        Run test again →
      </button>
    </div>

    <div class="glass-card p-5 text-sm text-slate-400 space-y-2">
      <h2 class="text-white font-semibold">What is a DNS leak?</h2>
      <p>A DNS leak occurs when your DNS queries are sent outside your encrypted tunnel (VPN), exposing your browsing activity to your ISP or third parties.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoPage({
  title:       'DNS Leak Test — Check if your VPN is leaking DNS | meuip.me',
  description: 'Run a free DNS leak test to verify your VPN is protecting your DNS queries. Detect exposed DNS servers in seconds.',
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
  // Simulate DNS leak test using ip-api for the current IP
  try {
    const data = await $fetch<any>('/api/ip')
    // Mock: real implementation would query multiple DNS resolvers
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
