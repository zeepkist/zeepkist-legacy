<script setup lang="ts">
  import { ref } from 'vue'

  import ColumnLayout from '@/components/ColumnLayout.vue'
  import DebugCode from '@/components/DebugCode.vue'
  import LevelList from '@/components/LevelList.vue'
  import RecordList from '@/components/RecordList.vue'
  import { getLevels } from '@/services/levels'
  import { getRecords } from '@/services/records'

  const limit = 15

  const recentRecords = ref(await getRecords({ Limit: limit, BestOnly: false }))
  const worldRecords = ref(
    await getRecords({ Limit: limit, WorldRecordOnly: true })
  )
  const levels = ref(await getLevels({ Limit: limit }))
</script>

<template>
  <h1>Zeepkist Records</h1>
  <p>
    There are currently {{ recentRecords.totalAmount }} records on
    {{ levels.totalAmount }} levels.
  </p>
  <column-layout>
    <template #left>
      <record-list
        header="World Records"
        :records="worldRecords.records"
        show-user />
    </template>
    <template #right>
      <record-list
        header="Recent Times"
        :records="recentRecords.records"
        show-user />
    </template>
  </column-layout>
  <level-list header="Recent Levels" :levels="levels.levels" />
  <debug-code :data="recentRecords" />
  <debug-code :data="worldRecords" />
  <debug-code :data="levels" />
</template>
