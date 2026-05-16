<template>
  <section class="glass-card p-6 sm:p-8 space-y-6 animate-fade-in">
    <!-- Header -->
    <div class="space-y-1.5">
      <div class="flex items-center gap-2 mb-2">
        <span class="badge bg-blue-500/10 text-blue-500 dark:text-blue-400 border border-blue-500/20">API</span>
        <span class="badge bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">Free</span>
      </div>
      <h2 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{{ t('api.title') }}</h2>
      <p class="text-sm text-slate-500 dark:text-slate-400 max-w-lg">{{ t('api.subtitle') }}</p>
    </div>

    <!-- Features -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div v-for="feat in features" :key="feat.label" class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <span class="text-emerald-500 font-bold shrink-0">✓</span>
        {{ feat.label }}
      </div>
    </div>

    <!-- Examples -->
    <div class="grid sm:grid-cols-2 gap-4">
      <!-- Plain text -->
      <div class="space-y-2">
        <p class="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {{ t('api.plainResponse') }}
        </p>
        <div class="rounded-xl overflow-hidden border" style="border-color: var(--border)">
          <div class="flex items-center justify-between px-3 py-2 border-b text-xs font-mono" style="border-color: var(--border); background-color: var(--bg-surface)">
            <span class="text-slate-500">bash</span>
            <CopyButton :text="'curl https://meuip.me/ip'" size="xs" />
          </div>
          <pre class="px-4 py-3 text-sm font-mono overflow-x-auto" style="background-color: var(--bg-surface)"><span class="text-blue-400 dark:text-blue-400">$</span><span class="text-slate-700 dark:text-slate-200"> curl https://meuip.me/ip</span>
<span class="text-emerald-600 dark:text-emerald-400">{{ currentIp || '45.12.33.90' }}</span></pre>
        </div>
      </div>

      <!-- JSON -->
      <div class="space-y-2">
        <p class="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {{ t('api.jsonResponse') }}
        </p>
        <div class="rounded-xl overflow-hidden border" style="border-color: var(--border)">
          <div class="flex items-center justify-between px-3 py-2 border-b text-xs font-mono" style="border-color: var(--border); background-color: var(--bg-surface)">
            <span class="text-slate-500">bash</span>
            <CopyButton :text="'curl https://meuip.me/api/ip'" size="xs" />
          </div>
          <pre class="px-4 py-3 text-xs font-mono overflow-x-auto leading-relaxed" style="background-color: var(--bg-surface)"><span class="text-slate-400 dark:text-slate-500">{</span>
  <span class="text-blue-500 dark:text-blue-400">"ip"</span><span class="text-slate-500">:</span> <span class="text-emerald-600 dark:text-emerald-400">"{{ currentIp || '45.12.33.90' }}"</span><span class="text-slate-400">,</span>
  <span class="text-blue-500 dark:text-blue-400">"version"</span><span class="text-slate-500">:</span> <span class="text-emerald-600 dark:text-emerald-400">"IPv4"</span><span class="text-slate-400">,</span>
  <span class="text-blue-500 dark:text-blue-400">"country"</span><span class="text-slate-500">:</span> <span class="text-emerald-600 dark:text-emerald-400">"Brazil"</span><span class="text-slate-400">,</span>
  <span class="text-blue-500 dark:text-blue-400">"isp"</span><span class="text-slate-500">:</span> <span class="text-emerald-600 dark:text-emerald-400">"Claro"</span>
<span class="text-slate-400 dark:text-slate-500">}</span></pre>
        </div>
      </div>
    </div>

    <!-- CTA buttons -->
    <div class="flex flex-wrap items-center gap-3 pt-1">
      <CopyButton :text="'https://meuip.me/ip'" :label="t('api.copyEndpoint')" />
      <NuxtLink
        :to="localePath('/what-is-my-ip')"
        class="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors"
        style="border-color: var(--border); color: var(--text-muted)"
        :class="'hover:border-blue-500/50 hover:text-blue-500 dark:hover:text-blue-400'"
      >
        {{ t('api.docs') }}
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const currentIp = ref('')
onMounted(async () => {
  const data = await $fetch<any>('/api/ip').catch(() => null)
  currentIp.value = data?.ip || ''
})

const features = computed(() => [
  { label: t('api.latency') },
  { label: t('api.noAuth') },
  { label: t('api.free') },
  { label: t('api.simple') },
])
</script>
