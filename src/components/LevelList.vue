<script setup lang="ts">
  import type { Level } from '@zeepkist/gtr-api'

  import LevelRow from '~/components/LevelRow.vue'

  const { header, levels, hideLevelThumbnail } = defineProps<{
    header?: string
    levels: Level[]
    hideLevelThumbnail?: boolean
  }>()
</script>

<template>
  <div class="levels">
    <h2 v-if="header">{{ header }}</h2>
    <level-row
      v-for="level in levels"
      :key="level.uniqueId"
      :level="level"
      :hide-level-thumbnail="hideLevelThumbnail" />
  </div>
</template>

<style scoped lang="less">
  .levels {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h2 {
      margin: 0.5rem 0 1rem;
    }
  }
</style>
