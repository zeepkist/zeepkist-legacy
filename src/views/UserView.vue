<script setup lang="ts">
  import { IconTrophy } from '@tabler/icons-vue'
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'

  import ColumnLayout from '@/components/ColumnLayout.vue'
  import DebugCode from '@/components/DebugCode.vue'
  import RecordList from '@/components/RecordList.vue'
  import { getRecords } from '@/services/records'
  import { getUser } from '@/services/users'

  const route = useRoute()
  const steamId = route.params.steamId as string
  const limit = 15

  const userData = ref(await getUser({ steamId }))

  const recordDataBest = ref(
    await getRecords({ UserSteamId: steamId, BestOnly: true })
  )
  const recordDataNotBest = ref(
    await getRecords({
      UserSteamId: steamId,
      BestOnly: false,
      ValidOnly: true,
      Limit: limit
    })
  )
  const recordDataWRs = ref(
    await getRecords({
      UserSteamId: steamId,
      ValidOnly: true,
      WorldRecordOnly: true,
      Limit: limit
    })
  )
  const recordDataRecent = ref(
    await getRecords({ UserSteamId: steamId, Limit: limit })
  )
  const recordDataAnyPercent = ref(
    await getRecords({ UserSteamId: steamId, ValidOnly: false, Limit: limit })
  )
</script>

<template>
  <h1>{{ userData.steamName }}</h1>
  <p>
    {{ userData.steamName }} has set times on
    {{ recordDataBest.totalAmount }} levels over
    {{ recordDataBest.totalAmount + recordDataNotBest.totalAmount }} runs. They
    currently hold <icon-trophy class="inline-svg" /> {{ recordDataWRs.totalAmount }} world records.
  </p>
  <column-layout>
    <template #left>
      <record-list header="World Records" :records="recordDataWRs.records" />
      <record-list header="Best Times" :records="recordDataBest.records" />
    </template>
    <template #right>
      <record-list header="Recent Times" :records="recordDataRecent.records" />
      <record-list
        header="Any% Times"
        :records="
          recordDataAnyPercent.records.filter(record => !record.isValid)
        " />
    </template>
  </column-layout>
  <debug-code :data="recordDataRecent.records" />
</template>
