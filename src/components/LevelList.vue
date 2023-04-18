<script setup lang="ts">
  import type { Level } from '@zeepkist/gtr-api'

  import LevelRow from '~/components/LevelRow.vue'

  const { header, levels } = defineProps<{
    header?: string
    levels: Level[]
    hideLevelThumbnail?: boolean
  }>()
</script>

<template>
  <div :class="$style.levels">
    <h2 v-if="header">{{ header }}</h2>
    <div :class="$style.levelGrid">
      <level-row v-for="level in levels" :key="level.uniqueId" :level="level" />
    </div>
  </div>
</template>

<style module lang="less">
  .levels {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h2 {
      margin: 0.5rem 0 1rem;
    }
  }

  .levelGrid {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
  }
</style>
