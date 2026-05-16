<template>
  <div class="glass-card p-6 sm:p-8 animate-slide-up glow-border">
    <!-- Label -->
    <p class="text-xs font-medium text-blue-500 dark:text-blue-400 uppercase tracking-widest mb-3">
      {{ t('ip.yourIp') }}
    </p>

    <!-- IP Address -->
    <div class="flex items-center gap-3 flex-wrap">
      <span
        class="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight font-mono break-all"
        :class="{ 'animate-pulse text-slate-400 dark:text-slate-500': !ip }"
      >
        {{ ip || '••••••••••••' }}
      </span>
      <CopyButton v-if="ip" :text="ip" />
    </div>

    <!-- IP type badge -->
    <div class="mt-4 flex items-center gap-2 flex-wrap">
      <span class="badge bg-blue-500/10 text-blue-400 border border-blue-500/20">
        {{ ipVersion }}
      </span>
      <span v-if="vpnStatus !== null" :class="vpnStatus ? 'badge bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 'badge bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'">
        {{ vpnStatus ? '⚠ VPN/Proxy detectado' : '✓ IP residencial' }}
      </span>
    </div>

    <!-- Share button -->
    <button
      @click="share"
      class="mt-5 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
      </svg>
      {{ t('ip.share') }}
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  ip: string
  ipVersion: string
  vpnStatus?: boolean | null
}>()

const { t } = useI18n()

async function share() {
  if (navigator.share) {
    await navigator.share({
      title: 'Meu IP — meuip.me',
      text: `Meu IP público é ${props.ip}`,
      url: window.location.href,
    })
  } else {
    await navigator.clipboard.writeText(window.location.href)
  }
}
</script>
