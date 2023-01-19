<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useRoute } from 'vue-router'

  import ColumnLayout from '@/components/ColumnLayout.vue'
  import DebugCode from '@/components/DebugCode.vue'
  import RecordList from '@/components/RecordList.vue'
  import { getRecords } from '@/services/records'

  const route = useRoute()
  const id = route.params.id as string

  const recentRecords = ref(
    await getRecords({ LevelId: id, Sort: '-id', Limit: 15 })
  )
  const bestRecords = ref(
    await getRecords({ LevelId: id, BestOnly: true, Limit: 15 })
  )
  const invalidRecords = ref(
    await getRecords({ LevelId: id, ValidOnly: false, Sort: '-id', Limit: 15 })
  )

  const unknownLevel = {
    name: 'Unknown',
    thumbnailUrl: '',
    author: 'Bouwerman'
  }

  const levelData = computed(
    () =>
      recentRecords.value?.records[0]?.level ??
      invalidRecords.value?.records[0]?.level ??
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
    This level has been played {{ recentRecords.totalAmount }} times by
    {{ bestRecords.totalAmount }} players.
  </p>
  <column-layout>
    <template #left>
      <record-list
        header="Best Times"
        :records="bestRecords.records"
        show-user
        hide-track-info />
    </template>
    <template #center>
      <record-list
        header="Recent Times"
        :records="recentRecords.records"
        show-user
        hide-track-info />
    </template>
    <template #right>
      <record-list
        header="Any% Times"
        :records="invalidRecords.records.filter(record => !record.isValid)"
        show-user
        hide-track-info />
    </template>
  </column-layout>
  <debug-code :data="recentRecords.records" />
  <debug-code :data="bestRecords.records" />
  <debug-code :data="invalidRecords.records" />
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
