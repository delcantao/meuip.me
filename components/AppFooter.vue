<template>
  <footer class="border-t border-slate-800/60 py-10 mt-16">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">

      <!-- SEO nav grid -->
      <nav aria-label="Site navigation" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-sm">
        <NuxtLink
          v-for="link in footerLinks"
          :key="link.to"
          :to="localePath(link.to)"
          class="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition-colors"
        >
          <span>{{ link.icon }}</span>
          <span>{{ link.label }}</span>
        </NuxtLink>
      </nav>

      <!-- Divider -->
      <div class="border-t border-slate-800/50" />

      <!-- Bottom row -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm" style="color: var(--text-muted)">
        <p>
          © {{ new Date().getFullYear() }}
          <span class="font-medium" style="color: var(--text)">meuip.me</span>
          — {{ t('footer.rights') }}
        </p>

        <!-- Long-tail keyword anchors (visually subtle, crawlable) -->
        <p class="text-xs text-slate-600 text-center sm:text-right leading-relaxed hidden sm:block" aria-label="Quick actions">
          <NuxtLink :to="localePath('/')"              class="hover:text-slate-400 transition-colors">{{ t('home.title') }}</NuxtLink>
          <span class="mx-1.5 text-slate-800">·</span>
          <NuxtLink :to="localePath('/what-is-my-ip')" class="hover:text-slate-400 transition-colors">What is my IP?</NuxtLink>
          <span class="mx-1.5 text-slate-800">·</span>
          <NuxtLink :to="localePath('/ipv6-test')"     class="hover:text-slate-400 transition-colors">Meu IPv6</NuxtLink>
          <span class="mx-1.5 text-slate-800">·</span>
          <NuxtLink :to="localePath('/dns-leak-test')" class="hover:text-slate-400 transition-colors">DNS Leak Test</NuxtLink>
        </p>
      </div>

    </div>

    <!-- AdSense placeholder: footer -->
    <div id="adsense-footer" class="mt-6 max-w-5xl mx-auto px-4" aria-hidden="true" />
  </footer>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const footerLinks = computed(() => [
  { to: '/',              icon: '🌐', label: t('nav.home') },
  { to: '/what-is-my-ip', icon: '🔍', label: 'What is my IP?' },
  { to: '/ipv6-test',     icon: '🔢', label: 'IPv6 Test' },
  { to: '/dns-leak-test', icon: '🔒', label: 'DNS Leak Test' },
  { to: '/webrtc-test',   icon: '📡', label: 'WebRTC Test' },
  { to: '/browser-info',  icon: '💻', label: t('nav.browser') },
])
</script>
