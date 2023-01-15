<script setup lang="ts">
  import { computed, ref } from 'vue'
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

  const unknownLevel = {
    name: 'Unknown',
    thumbnailUrl: '',
    author: 'Bouwerman'
  }

  const levelData = computed(
    () =>
      recordDataRecent.value?.records[0]?.level ??
      recordDataAnyPercent.value?.records[0]?.level ??
      unknownLevel
  )
</script>

<template>
  <div class="header">
    <img :src="levelData.thumbnailUrl" alt="" />
    <div class="header-title">
      <h1>{{ levelData.name }}</h1>
      <span class="author">By {{ levelData.author }}</span>
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
        show-user
        hide-track-info />
    </template>
    <template #center>
      <record-list
        header="Recent Times"
        :records="recordDataRecent.records"
        show-user
        hide-track-info />
    </template>
    <template #right>
      <record-list
        header="Any% Times"
        :records="
          recordDataAnyPercent.records.filter(record => !record.isValid)
        "
        show-user
        hide-track-info />
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
      margin-right: 1rem;
    }

    .header-title {
      flex: 1;
    }

    .author {
      font-size: 1.5rem;
    }
  }
</style>
