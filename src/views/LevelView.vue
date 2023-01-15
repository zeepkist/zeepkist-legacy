<script setup lang="ts">
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'

  import ColumnLayout from '@/components/ColumnLayout.vue'
  import DebugCode from '@/components/DebugCode.vue'
  import RecordList from '@/components/RecordList.vue'
  import { getRecords } from '@/services/records'

  const route = useRoute()
  const id = route.params.id as string

  const recordDataRecent = ref(await getRecords({ LevelId: id, Limit: 15 }))
  const recordDataBest = ref(
    await getRecords({ LevelId: id, BestOnly: true, Limit: 15 })
  )
  const recordDataAnyPercent = ref(
    await getRecords({ LevelId: id, ValidOnly: false, Limit: 15 })
  )
</script>

<template>
  <div class="header">
    <img :src="recordDataRecent.records[0].level.thumbnailUrl" alt="" />
    <div class="header-title">
      <h1>{{ recordDataRecent.records[0].level.name }}</h1>
      <span class="author"
        >By {{ recordDataRecent.records[0].level.author }}</span
      >
    </div>
  </div>
  <p>
    This level has been played {{ recordDataRecent.totalAmount }} times by
    {{ recordDataBest.totalAmount }} players.
  </p>
  <column-layout>
    <template #left>
      <record-list
        header="Best Times"
        :records="recordDataBest.records"
        show-user />
    </template>
    <template #right>
      <record-list
        header="Recent Times"
        :records="recordDataRecent.records"
        show-user />
      <record-list
        header="Any% Times"
        :records="
          recordDataAnyPercent.records.filter(record => !record.isValid)
        "
        show-user />
    </template>
  </column-layout>
  <debug-code :data="recordDataRecent.records" />
  <debug-code :data="recordDataBest.records" />
  <debug-code :data="recordDataAnyPercent.records" />
</template>

<style scoped lang="less">
  .header {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    img {
      max-height: 100px;
    }

    .header-title {
      flex: 1;
    }

    .author {
      font-size: 1.5rem;
    }
  }
</style>
