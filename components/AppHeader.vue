<template>
  <header class="sticky top-0 z-50 border-b border-slate-800/60 bg-[#020617]/80 backdrop-blur-md">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
      <!-- Logo -->
      <NuxtLink :to="localePath('/')" class="flex items-center gap-2 text-white font-semibold tracking-tight">
        <span class="text-blue-400">⬡</span>
        <span>meuip<span class="text-blue-400">.me</span></span>
      </NuxtLink>

      <!-- Nav -->
      <nav class="hidden sm:flex items-center gap-1 text-sm text-slate-400">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="localePath(link.to)"
          class="px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/60 transition-colors"
          active-class="text-white bg-slate-800/60"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <!-- Lang switcher -->
      <LangSwitcher />
    </div>
  </header>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const navLinks = computed(() => [
  { to: '/',              label: t('nav.home') },
  { to: '/ipv6-test',     label: 'IPv6' },
  { to: '/browser-info',  label: t('nav.browser') },
  { to: '/headers',       label: 'Headers' },
  { to: '/dns-leak-test', label: 'DNS Leak' },
  { to: '/webrtc-test',   label: 'WebRTC' },
])
</script>
