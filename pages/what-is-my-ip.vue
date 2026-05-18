<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
    <div class="space-y-3 animate-fade-in">
      <h1 class="text-3xl sm:text-4xl font-bold text-white">What is my IP?</h1>
      <p class="text-slate-400 text-lg">
        Your public IP address is the unique identifier assigned to your internet connection by your ISP.
      </p>
    </div>

    <div class="glass-card p-6 animate-slide-up">
      <p class="text-xs text-blue-400 uppercase tracking-widest font-medium mb-2">Your public IP</p>
      <p class="text-4xl font-bold font-mono text-white">{{ ip || '...' }}</p>
      <div class="mt-3 flex gap-2 flex-wrap">
        <CopyButton v-if="ip" :text="ip" />
      </div>
    </div>

    <div class="prose prose-invert prose-sm max-w-none space-y-4 text-slate-400">
      <h2 class="text-xl font-semibold text-white">What is an IP address?</h2>
      <p>
        An IP address (Internet Protocol address) is a numerical label assigned to each device connected to a computer network.
        It serves two main functions: host or network interface identification and location addressing.
      </p>
      <h2 class="text-xl font-semibold text-white">IPv4 vs IPv6</h2>
      <p>
        IPv4 uses 32-bit addresses (e.g. <code>203.0.113.1</code>), while IPv6 uses 128-bit addresses
        (e.g. <code>2001:db8::1</code>). IPv6 was created to address the exhaustion of IPv4 addresses.
      </p>
      <h2 class="text-xl font-semibold text-white">Why does my IP change?</h2>
      <p>
        Most residential ISPs assign dynamic IPs that change periodically. Static IPs are fixed and
        usually require a business plan.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoPage({
  title:       'What is my IP address? | meuip.me',
  description: 'Learn what an IP address is, how it works, and discover your public IPv4/IPv6 address instantly. Free, accurate lookup with no tracking.',
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
