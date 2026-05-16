<template>
  <button
    @click="copy"
    :title="copied ? t('copy.copied') : t('copy.copy')"
    class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150"
    :class="copied
      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
      : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 hover:text-white'"
  >
    <svg v-if="!copied" class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
    </svg>
    <svg v-else class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
    </svg>
    {{ copied ? t('copy.copied') : t('copy.copy') }}
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{ text: string }>()
const { t } = useI18n()
const copied = ref(false)

async function copy() {
  await navigator.clipboard.writeText(props.text)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>
