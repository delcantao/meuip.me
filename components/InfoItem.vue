<template>
  <div class="glass-card-hover p-4 flex items-start gap-3">
    <span class="text-xl shrink-0 mt-0.5" role="img">{{ icon }}</span>
    <div class="min-w-0">
      <p class="text-xs text-slate-500 font-medium uppercase tracking-wider mb-0.5">{{ label }}</p>
      <p
        v-if="!loading && value"
        class="text-sm font-medium text-slate-100 truncate"
        :title="value"
      >
        {{ value }}
      </p>
      <div v-else class="h-4 w-24 bg-slate-800 rounded animate-pulse mt-1" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon:    string
  label:   string
  value?:  string
  loading?: boolean
}>()
</script>
