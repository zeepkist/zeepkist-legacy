<script setup lang="ts">
  import { defineProps } from 'vue'

  import RecordRow from '@/components/RecordRow.vue'
  import type { RecordRecord } from '@/models/record'

  const { header = 'Records', records } = defineProps<{
    header: string
    records: RecordRecord[]
  }>()
</script>

<template>
  <div class="records">
    <div class="records-header">
      <h2>{{ header }}</h2>
    </div>
    <record-row
      v-for="record in records"
      :key="record.screenshotUrl"
      :record="record" />
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
