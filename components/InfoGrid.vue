<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 animate-fade-in">
    <InfoItem
      v-for="item in items"
      :key="item.label"
      :icon="item.icon"
      :label="item.label"
      :value="item.value"
      :loading="loading"
    />
  </div>
</template>

<script setup lang="ts">
export interface GridItem {
  icon: string
  label: string
  value: string | undefined
}

defineProps<{
  items: GridItem[]
  loading?: boolean
}>()
</script>
