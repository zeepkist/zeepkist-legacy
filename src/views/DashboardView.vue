<script setup lang="ts">
  import { ref } from 'vue'

  import ColumnLayout from '@/components/ColumnLayout.vue'
  import DebugCode from '@/components/DebugCode.vue'
  import LevelList from '@/components/LevelList.vue'
  import RecordList from '@/components/RecordList.vue'
  import { getLevels } from '@/services/levels'
  import { getRecords } from '@/services/records'

  const limit = 15

  const recordDataRecent = ref(
    await getRecords({ Limit: limit, BestOnly: false })
  )
  const recordDataWRs = ref(
    await getRecords({ Limit: limit, WorldRecordOnly: true })
  )
  const levelData = ref(await getLevels({ Limit: limit }))
</script>

<template>
  <h1>Zeepkist Records</h1>
  <p>
    There are currently {{ recordDataRecent.totalAmount }} records on
    {{ levelData.totalAmount }} levels.
  </p>
  <column-layout>
    <template #left>
      <record-list
        header="World Records"
        :records="recordDataWRs.records"
        show-user />
    </template>
    <template #right>
      <record-list
        header="Recent Times"
        :records="recordDataRecent.records"
        show-user />
    </template>
  </column-layout>
  <level-list header="Recent Levels" :levels="levelData.levels" />
  <debug-code :data="recordDataRecent" />
  <debug-code :data="recordDataWRs" />
  <debug-code :data="levelData" />
</template>
