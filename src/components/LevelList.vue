<script setup lang="ts">
  import LevelRow from '@/components/LevelRow.vue'
  import type { Level } from '@/models/level'

  const { levels } = defineProps<{
    header?: string
    levels: Level[]
  }>()
</script>

<template>
  <div class="levels">
    <h2 v-if="header">{{ header }}</h2>
    <level-row v-for="level in levels" :key="level.uniqueId" :level="level" />
  </div>
</template>

<style scoped lang="less">
  .levels {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
  }
</style>
