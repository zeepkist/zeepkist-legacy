<script setup lang="ts">
  import type { LevelRecord } from '@zeepkist/gtr-api'

  import RecordRow from '~/components/RecordRow.vue'

  const {
    header = 'Records',
    records,
    rankOffset,
    showUser,
    showBadges,
    hideTrackInfo
  } = defineProps<{
    header: string
    records: LevelRecord[]
    rankOffset?: number
    showUser?: boolean
    showBadges?: boolean
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
      :show-badges="showBadges"
      :hide-track-info="hideTrackInfo" />
    <p v-if="records.length === 0">
      No records of this type have been recorded yet
    </p>
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
