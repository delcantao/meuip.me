<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
    <div class="animate-fade-in">
      <h1 class="text-3xl sm:text-4xl font-bold text-white mb-3">{{ t('webrtc.title') }}</h1>
      <p class="text-slate-400">{{ t('webrtc.subtitle') }}</p>
    </div>

    <div class="glass-card p-6 animate-slide-up">
      <div v-if="!tested" class="text-center space-y-4">
        <p class="text-slate-400 text-sm">{{ t('webrtc.subtitle') }}</p>
        <button
          @click="detect"
          class="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-colors"
        >
          {{ t('webrtc.runTest') }}
        </button>
      </div>

      <div v-else class="space-y-4">
        <div class="flex items-center gap-3">
          <span class="text-2xl">{{ leaked ? '⚠️' : '✅' }}</span>
          <div>
            <p class="font-semibold text-white">{{ leaked ? t('webrtc.leaked.status') : t('webrtc.noLeak.status') }}</p>
            <p class="text-sm text-slate-400">{{ leaked ? t('webrtc.leaked.description') : t('webrtc.noLeak.description') }}</p>
          </div>
        </div>

        <div v-if="localIps.length || publicIps.length" class="space-y-2 pt-2">
          <div v-if="localIps.length">
            <p class="text-xs text-slate-500 uppercase tracking-wider font-medium mb-1">{{ t('webrtc.localIps') }}</p>
            <p v-for="ip in localIps" :key="ip" class="font-mono text-sm text-slate-200">{{ ip }}</p>
          </div>
          <div v-if="publicIps.length">
            <p class="text-xs text-slate-500 uppercase tracking-wider font-medium mb-1">{{ t('webrtc.publicIps') }}</p>
            <p v-for="ip in publicIps" :key="ip" class="font-mono text-sm text-yellow-300">{{ ip }}</p>
          </div>
        </div>

        <button @click="detect" class="text-sm text-blue-400 hover:text-blue-300 transition-colors mt-2 block">
          {{ t('webrtc.runAgain') }}
        </button>
      </div>
    </div>

    <div class="glass-card p-5 text-sm text-slate-400 space-y-2">
      <h2 class="text-white font-semibold">{{ t('webrtc.explainer.heading') }}</h2>
      <p>{{ t('webrtc.explainer.p1') }}</p>
      <p>{{ t('webrtc.explainer.p2') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoPage({
  title:       () => t('webrtc.meta.title'),
  description: () => t('webrtc.meta.description'),
  path:        '/webrtc-test',
  keywords:    'webrtc leak test, webrtc leak, vpn leak, real ip address, webrtc ip, browser privacy, hide ip',
  jsonLd: jsonLdWebPage({
    name:        'WebRTC Leak Test',
    description: 'Free WebRTC leak test — detect if your real IP address is exposed by WebRTC.',
    url:         'https://meuip.me/webrtc-test',
    breadcrumbs: [{ name: 'Home', url: 'https://meuip.me' }, { name: 'WebRTC Leak Test', url: 'https://meuip.me/webrtc-test' }],
  }),
})

const { t }  = useI18n()
const tested    = ref(false)
const leaked    = ref(false)
const localIps  = ref<string[]>([])
const publicIps = ref<string[]>([])

async function detect() {
  tested.value    = false
  localIps.value  = []
  publicIps.value = []

  const ips = new Set<string>()

  try {
    const pc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] })
    pc.createDataChannel('')

    await new Promise<void>((resolve) => {
      const timeout = setTimeout(resolve, 3000)
      pc.onicecandidate = (e) => {
        if (!e.candidate) { clearTimeout(timeout); resolve(); return }
        const regex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g
        const match = e.candidate.candidate.match(regex)
        if (match) match.forEach(ip => ips.add(ip))
      }
      pc.createOffer().then(o => pc.setLocalDescription(o))
    })

    pc.close()

    for (const ip of ips) {
      if (/^(10\.|172\.(1[6-9]|2\d|3[01])\.|192\.168\.|127\.|::1|fe80)/i.test(ip)) {
        localIps.value.push(ip)
      } else {
        publicIps.value.push(ip)
      }
    }

    leaked.value = publicIps.value.length > 0
  } catch {
    // WebRTC not supported or blocked
  }

  tested.value = true
}
</script>
