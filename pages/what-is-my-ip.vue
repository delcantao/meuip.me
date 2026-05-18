<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
    <div class="space-y-3 animate-fade-in">
      <h1 class="text-3xl sm:text-4xl font-bold text-white">{{ t('whatIsMyIp.title') }}</h1>
      <p class="text-slate-400 text-lg">{{ t('whatIsMyIp.subtitle') }}</p>
    </div>

    <div class="glass-card p-6 animate-slide-up">
      <p class="text-xs text-blue-400 uppercase tracking-widest font-medium mb-2">{{ t('whatIsMyIp.yourPublicIp') }}</p>
      <p class="text-4xl font-bold font-mono text-white">{{ ip || '...' }}</p>
      <div class="mt-3 flex gap-2 flex-wrap">
        <CopyButton v-if="ip" :text="ip" />
      </div>
    </div>

    <div class="prose prose-invert prose-sm max-w-none space-y-4 text-slate-400">
      <h2 class="text-xl font-semibold text-white">{{ t('whatIsMyIp.whatIsIp.heading') }}</h2>
      <p>{{ t('whatIsMyIp.whatIsIp.p') }}</p>

      <h2 class="text-xl font-semibold text-white">{{ t('whatIsMyIp.ipv4vsIpv6.heading') }}</h2>
      <p>
        {{ t('whatIsMyIp.ipv4vsIpv6.p') }}
      </p>

      <h2 class="text-xl font-semibold text-white">{{ t('whatIsMyIp.whyChange.heading') }}</h2>
      <p>{{ t('whatIsMyIp.whyChange.p') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoPage({
  title:       () => `${t('whatIsMyIp.title')} | meuip.me`,
  description: () => t('whatIsMyIp.subtitle'),
  path:        '/what-is-my-ip',
  keywords:    'what is my ip, my ip address, public ip, ip lookup, ip checker, find my ip, what is my public ip',
  jsonLd: [
    jsonLdWebPage({
      name:        'What is my IP address?',
      description: 'Find your public IP address and learn how IP addressing works.',
      url:         'https://meuip.me/what-is-my-ip',
      breadcrumbs: [{ name: 'Home', url: 'https://meuip.me' }, { name: 'What is my IP', url: 'https://meuip.me/what-is-my-ip' }],
    }),
    jsonLdWebApplication({
      name:        'IP Address Lookup — meuip.me',
      description: 'Free public IP address checker. Instant IPv4 and IPv6 detection with geolocation.',
      url:         'https://meuip.me/what-is-my-ip',
    }),
  ],
})

const ip = ref('')
onMounted(async () => {
  const data = await $fetch<any>('/api/ip')
  ip.value = data?.ip || ''
})
</script>
