<script setup lang="ts">
  import { IconMedal } from '@tabler/icons-vue'
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'

  import DebugCode from '@/components/DebugCode.vue'
  import RecordList from '@/components/RecordList.vue'
  import { getRecords } from '@/services/records'

  const route = useRoute()
  const steamId = route.params.steamId as string

  const recordDataBest = ref(
    await getRecords({ UserSteamId: steamId, BestOnly: true })
  )
  const recordDataNotBest = ref(
    await getRecords({ UserSteamId: steamId, BestOnly: false, Limit: 0 })
  )
  const recordDataWRs = ref(
    await getRecords({ UserSteamId: steamId, WorldRecordOnly: true, Limit: 10 })
  )
  const recordDataRecent = ref(
    await getRecords({ UserSteamId: steamId, Limit: 10 })
  )
</script>

<template>
  <h1>{{ steamId }}</h1>
  <p>
    <icon-medal /> {{ steamId }} has set times on
    {{ recordDataBest.totalAmount }} levels over
    {{ recordDataBest.totalAmount + recordDataNotBest.totalAmount }} runs. They
    currently hold {{ recordDataWRs.totalAmount }} world records.
  </p>
  <div class="columns">
    <div class="column">
      <record-list header="World Records" :records="recordDataWRs.records" />
    </div>
    <div class="column">
      <record-list header="Recent Times" :records="recordDataRecent.records" />
    </div>
  </div>
  <record-list header="Best Times" :records="recordDataBest.records" />
  <debug-code :data="recordDataRecent.records" />
</template>

<style scoped lang="less">
  @media (min-width: 1024px) {
    .columns {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr;
      gap: 1rem;
      .columns {
        display: flex;
        flex-direction: column;
      }
    }
  }
</style>
