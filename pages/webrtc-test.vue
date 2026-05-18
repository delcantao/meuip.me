<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
    <div class="animate-fade-in">
      <h1 class="text-3xl sm:text-4xl font-bold text-white mb-3">WebRTC Leak Test</h1>
      <p class="text-slate-400">Detect if WebRTC is exposing your real IP address, even when using a VPN.</p>
    </div>

    <div class="glass-card p-6 animate-slide-up">
      <div v-if="!tested" class="text-center space-y-4">
        <p class="text-slate-400 text-sm">WebRTC can reveal your real IP address to websites, bypassing VPNs and proxies.</p>
        <button
          @click="detect"
          class="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-colors"
        >
          Run WebRTC Test
        </button>
      </div>

      <div v-else class="space-y-4">
        <div class="flex items-center gap-3">
          <span class="text-2xl">{{ leaked ? '⚠️' : '✅' }}</span>
          <div>
            <p class="font-semibold text-white">{{ leaked ? 'WebRTC Leak Detected' : 'No WebRTC Leak' }}</p>
            <p class="text-sm text-slate-400">{{ leaked ? 'Your real IP may be exposed.' : 'Your IP is properly hidden.' }}</p>
          </div>
        </div>

        <div v-if="localIps.length || publicIps.length" class="space-y-2 pt-2">
          <div v-if="localIps.length">
            <p class="text-xs text-slate-500 uppercase tracking-wider font-medium mb-1">Local IPs (via WebRTC)</p>
            <p v-for="ip in localIps" :key="ip" class="font-mono text-sm text-slate-200">{{ ip }}</p>
          </div>
          <div v-if="publicIps.length">
            <p class="text-xs text-slate-500 uppercase tracking-wider font-medium mb-1">Public IPs (via WebRTC)</p>
            <p v-for="ip in publicIps" :key="ip" class="font-mono text-sm text-yellow-300">{{ ip }}</p>
          </div>
        </div>

        <button @click="detect" class="text-sm text-blue-400 hover:text-blue-300 transition-colors mt-2 block">
          Run again →
        </button>
      </div>
    </div>

    <div class="glass-card p-5 text-sm text-slate-400 space-y-2">
      <h2 class="text-white font-semibold">What is a WebRTC leak?</h2>
      <p>WebRTC is a browser feature for real-time communication. It can expose your local and public IP addresses to websites without your knowledge, even when you're using a VPN.</p>
      <p>To prevent WebRTC leaks, you can disable WebRTC in your browser settings or use a browser extension.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoPage({
  title:       'WebRTC Leak Test — Check if WebRTC exposes your real IP | meuip.me',
  description: 'Detect WebRTC IP leaks in your browser. Check if your real IP address is being exposed to websites even while using a VPN.',
  path:        '/webrtc-test',
  keywords:    'webrtc leak test, webrtc leak, vpn leak, real ip address, webrtc ip, browser privacy, hide ip',
  jsonLd: jsonLdWebPage({
    name:        'WebRTC Leak Test',
    description: 'Free WebRTC leak test — detect if your real IP address is exposed by WebRTC.',
    url:         'https://meuip.me/webrtc-test',
    breadcrumbs: [{ name: 'Home', url: 'https://meuip.me' }, { name: 'WebRTC Leak Test', url: 'https://meuip.me/webrtc-test' }],
  }),
})

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
