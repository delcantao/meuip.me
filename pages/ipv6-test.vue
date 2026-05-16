<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
    <div class="animate-fade-in">
      <h1 class="text-3xl sm:text-4xl font-bold text-white mb-3">IPv6 Test</h1>
      <p class="text-slate-400">Check if your connection supports IPv6 and see your IPv6 address.</p>
    </div>

    <div class="grid sm:grid-cols-2 gap-4 animate-slide-up">
      <!-- IPv4 -->
      <div class="glass-card p-5">
        <p class="text-xs text-blue-400 uppercase tracking-widest font-medium mb-2">IPv4 Address</p>
        <p class="text-2xl font-bold font-mono text-white break-all">{{ ipv4 || '...' }}</p>
        <span class="mt-2 badge bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">✓ Conectado</span>
      </div>

      <!-- IPv6 -->
      <div class="glass-card p-5">
        <p class="text-xs text-blue-400 uppercase tracking-widest font-medium mb-2">IPv6 Address</p>
        <p class="text-2xl font-bold font-mono text-white break-all">{{ ipv6 || 'Não disponível' }}</p>
        <span
          class="mt-2 badge"
          :class="ipv6 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'"
        >
          {{ ipv6 ? '✓ IPv6 ativo' : '✗ IPv6 indisponível' }}
        </span>
      </div>
    </div>

    <div class="glass-card p-6 space-y-3 text-sm text-slate-400 animate-fade-in">
      <h2 class="text-white font-semibold text-base">What is IPv6?</h2>
      <p>IPv6 (Internet Protocol version 6) is the latest version of the Internet Protocol, designed to address the exhaustion of IPv4 addresses. It uses 128-bit addresses, allowing for 340 undecillion unique addresses.</p>
      <p>Most modern networks support dual-stack (both IPv4 and IPv6). If your ISP hasn't enabled IPv6, you'll only see your IPv4 address above.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title:       'IPv6 Test — Check your IPv6 connectivity | meuip.me',
  description: 'Test if your internet connection supports IPv6. Find your IPv4 and IPv6 addresses instantly.',
  ogUrl:       'https://meuip.me/ipv6-test',
  robots:      'index, follow',
})

useHead({ link: [{ rel: 'canonical', href: 'https://meuip.me/ipv6-test' }] })

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
