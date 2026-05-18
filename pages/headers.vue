<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
    <div class="animate-fade-in">
      <h1 class="text-3xl sm:text-4xl font-bold text-white mb-3">{{ t('httpHeaders.title') }}</h1>
      <p class="text-slate-400">{{ t('httpHeaders.subtitle') }}</p>
    </div>

    <div class="glass-card overflow-hidden animate-slide-up">
      <div v-if="!headers" class="p-8 text-center">
        <div class="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto" />
      </div>
      <template v-else>
        <div
          v-for="(value, key) in headers"
          :key="key"
          class="flex items-start gap-4 px-5 py-3 border-b border-slate-800/60 last:border-0 hover:bg-slate-800/30 transition-colors"
        >
          <span class="text-blue-400 font-mono text-sm shrink-0 w-52 truncate" :title="key">{{ key }}</span>
          <span class="text-slate-300 font-mono text-sm break-all">{{ value }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoPage({
  title:       () => t('httpHeaders.meta.title'),
  description: () => t('httpHeaders.meta.description'),
  path:        '/headers',
  keywords:    'http headers, request headers, browser headers, http request, user-agent header, check headers, http debugging',
  jsonLd: jsonLdWebPage({
    name:        'HTTP Headers Viewer',
    description: 'View all HTTP request headers sent by your browser.',
    url:         'https://meuip.me/headers',
    breadcrumbs: [{ name: 'Home', url: 'https://meuip.me' }, { name: 'HTTP Headers', url: 'https://meuip.me/headers' }],
  }),
})

const headers = ref<Record<string, string> | null>(null)

onMounted(async () => {
  const data = await $fetch<{ headers: Record<string, string> }>('/api/headers')
  headers.value = data.headers
})
</script>
