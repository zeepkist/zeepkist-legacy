<script setup lang="ts">
  import { ref } from 'vue'

  import ColumnLayout from '@/components/ColumnLayout.vue'
  import DebugCode from '@/components/DebugCode.vue'
  import LevelList from '@/components/LevelList.vue'
  import PaginatedComponent from '@/components/PaginatedComponent.vue'
  import RecordList from '@/components/RecordList.vue'
  import { getLevels } from '@/services/levels'
  import { getRecords } from '@/services/records'

  type RecordType = 'worldRecord' | 'recent'

  const limit = 15

  const getPaginatedRecords = async (type: RecordType, page = 1) => {
    switch (type) {
      case 'worldRecord': {
        return await getRecords({
          Limit: limit,
          WorldRecordOnly: true,
          Sort: '-id',
          Offset: (page - 1) * limit
        })
      }
      case 'recent': {
        return await getRecords({
          Limit: limit,
          Sort: '-id',
          Offset: (page - 1) * limit
        })
      }
    }
  }

  const handlePageChanged = async (type: RecordType, page: number) => {
    switch (type) {
      case 'worldRecord': {
        pages.value.worldRecord = page
        worldRecords.value = await getPaginatedRecords('worldRecord', page)
        break
      }
      case 'recent': {
        pages.value.best = page
        recentRecords.value = await getPaginatedRecords('recent', page)
        break
      }
    }
  }

  const recentRecords = ref(await getPaginatedRecords('recent'))
  const worldRecords = ref(await getPaginatedRecords('worldRecord'))

  const levels = ref(await getLevels({ Limit: limit }))

  const pages = ref({
    best: 1,
    worldRecord: 1
  })
</script>

<template>
  <h1>Zeepkist Records</h1>
  <p>
    There are currently {{ recentRecords.totalAmount }} records on
    {{ levels.totalAmount }} levels.
  </p>
  <column-layout>
    <template #left>
      <paginated-component
        :current-page="pages.worldRecord"
        :items-per-page="limit"
        :total-items="worldRecords.totalAmount"
        @page-changed="page => handlePageChanged('worldRecord', page)">
        <record-list
          header="World Records"
          :records="worldRecords.records"
          show-user />
      </paginated-component>
    </template>
    <template #right>
      <paginated-component
        :current-page="pages.best"
        :items-per-page="limit"
        :total-items="recentRecords.totalAmount"
        @page-changed="page => handlePageChanged('recent', page)">
        <record-list
          header="Recent Times"
          :records="recentRecords.records"
          show-user />
      </paginated-component>
    </template>
  </column-layout>
  <level-list header="Levels" :levels="levels.levels" />
  <debug-code :data="recentRecords" />
  <debug-code :data="worldRecords" />
  <debug-code :data="levels" />
</template>
