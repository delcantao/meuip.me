<template>
  <header class="sticky top-0 z-50 border-b backdrop-blur-md transition-colors duration-200 header-bg">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
      <!-- Logo -->
      <NuxtLink :to="localePath('/')" class="flex items-center gap-2 font-semibold tracking-tight" style="color: var(--text)">
        <span class="text-blue-400">⬡</span>
        <span>meuip<span class="text-blue-400">.me</span></span>
      </NuxtLink>

      <!-- Nav -->
      <nav class="hidden sm:flex items-center gap-1 text-sm" style="color: var(--text-muted)">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="localePath(link.to)"
          class="px-3 py-1.5 rounded-lg transition-colors hover:bg-black/5 dark:hover:bg-white/5"
          style="color: inherit"
          active-class="!text-[var(--text)] bg-black/5 dark:bg-white/5"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <!-- Right controls -->
      <div class="flex items-center gap-1">
        <ThemeToggle />
        <LangSwitcher />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const navLinks = computed(() => [
  { to: '/',              label: t('nav.home') },
  { to: '/ipv6-test',     label: t('nav.ipv6') },
  { to: '/browser-info',  label: t('nav.browser') },
  { to: '/headers',       label: t('nav.headers') },
  { to: '/dns-leak-test', label: t('nav.dnsLeak') },
  { to: '/webrtc-test',   label: t('nav.webrtc') },
])
</script>
