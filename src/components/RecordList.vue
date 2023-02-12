<script setup lang="ts">
  import RecordRow from '@/components/RecordRow.vue'
  import type { LevelRecord } from '@/models/record'

  const {
    header = 'Records',
    records,
    rankOffset,
    showUser,
    hideTrackInfo
  } = defineProps<{
    header: string
    records: LevelRecord[]
    rankOffset?: number
    showRank?: boolean
    showUser?: boolean
    hideTrackInfo?: boolean
  }>()
</script>

<template>
  <div class="records">
    <h2>{{ header }}</h2>
    <record-row
      v-for="(record, index) in records"
      :key="record.screenshotUrl"
      :record="record"
      :rank="
        typeof rankOffset === 'number' ? rankOffset + index + 1 : undefined
      "
      :show-user="showUser"
      :hide-track-info="hideTrackInfo" />
  </div>
</template>

<style scoped lang="less">
  .records {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
  }
</style>
