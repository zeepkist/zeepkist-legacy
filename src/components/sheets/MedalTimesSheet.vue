<script setup lang="ts">
  import type { Level } from '@zeepkist/gtr-api'

  import MedalTimesList from '~/components/lists/MedalTimesList.vue'
  import ContentSheet from '~/components/sheets/ContentSheet.vue'

  const { level } = defineProps<{
    level: Level
  }>()
</script>

<template>
  <content-sheet>
    <h2>Medal Times</h2>
    <medal-times-list
      :author="level.timeAuthor"
      :gold="level.timeGold"
      :silver="level.timeSilver"
      :bronze="level.timeBronze" />
  </content-sheet>
</template>
