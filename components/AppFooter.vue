<template>
  <footer class="border-t border-slate-800/60 py-8 mt-16">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
      <p>
        © {{ new Date().getFullYear() }}
        <span class="text-slate-400 font-medium">meuip.me</span>
        — {{ t('footer.rights') }}
      </p>
      <div class="flex items-center gap-4">
        <NuxtLink :to="localePath('/what-is-my-ip')" class="hover:text-slate-300 transition-colors">What is my IP?</NuxtLink>
        <NuxtLink :to="localePath('/ipv6-test')"     class="hover:text-slate-300 transition-colors">IPv6 Test</NuxtLink>
        <NuxtLink :to="localePath('/webrtc-test')"   class="hover:text-slate-300 transition-colors">WebRTC</NuxtLink>
      </div>
    </div>

    <!-- AdSense placeholder: footer -->
    <div id="adsense-footer" class="mt-6 max-w-5xl mx-auto px-4" aria-hidden="true" />
  </footer>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>
