<script setup lang="ts">
  import RecordRow from '@/components/RecordRow.vue'
  import type { LevelRecord } from '@/models/record'

  const {
    header = 'Records',
    records,
    showUser,
    hideTrackInfo
  } = defineProps<{
    header: string
    records: LevelRecord[]
    showUser?: boolean
    hideTrackInfo?: boolean
  }>()
</script>

<template>
  <div class="records">
    <h2>{{ header }}</h2>
    <record-row
      v-for="record in records"
      :key="record.screenshotUrl"
      :record="record"
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
