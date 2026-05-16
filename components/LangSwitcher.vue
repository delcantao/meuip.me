<template>
  <div class="relative" ref="dropdownRef">
    <button
      @click="open = !open"
      class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm transition-colors"
      style="color: var(--text-muted)"
      :style="{ color: 'var(--text-muted)' }"
      :class="'hover:bg-black/5 dark:hover:bg-white/5 dark:hover:text-white hover:text-slate-900'"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
      </svg>
      {{ currentLocale?.name }}
      <svg class="w-3 h-3 transition-transform" :class="{ 'rotate-180': open }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </button>

    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="open"
        class="absolute right-0 mt-1 w-36 glass-card py-1 z-50 origin-top-right"
      >
        <NuxtLink
          v-for="locale in availableLocales"
          :key="locale.code"
          :to="switchLocalePath(locale.code)"
          @click="open = false"
          class="block px-3 py-2 text-sm transition-colors hover:bg-black/5 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
          :style="{ color: locale.code === currentLocale?.code ? 'var(--brand)' : 'var(--text-muted)' }"
        >
          {{ locale.name }}
        </NuxtLink>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const open = ref(false)
const dropdownRef = ref<HTMLElement>()

const currentLocale  = computed(() => locales.value.find((l: any) => l.code === locale.value) as any)
const availableLocales = computed(() => locales.value as any[])

function handleOutside(e: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    open.value = false
  }
}

onMounted(() => document.addEventListener('click', handleOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleOutside))
</script>
