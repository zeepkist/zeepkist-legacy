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

  const user = ref(await getUser({ steamId }))

  const bestRecords = ref(
    await getRecords({
      UserSteamId: steamId,
      BestOnly: true,
      Sort: '-id',
      Limit: limit
    })
  )
  const validRecords = ref(
    await getRecords({
      UserSteamId: steamId,
      BestOnly: false,
      ValidOnly: true,
      Sort: '-id',
      Limit: 0
    })
  )
  const worldRecords = ref(
    await getRecords({
      UserSteamId: steamId,
      ValidOnly: true,
      WorldRecordOnly: true,
      Sort: '-id',
      Limit: limit
    })
  )
  const recentRecords = ref(
    await getRecords({ UserSteamId: steamId, Sort: '-id', Limit: limit })
  )
  const invalidRecords = ref(
    await getRecords({
      UserSteamId: steamId,
      InvalidOnly: true,
      Sort: '-id',
      Limit: limit
    })
  )
</script>

<template>
  <h1>{{ user.steamName }}</h1>
  <p>
    {{ user.steamName }} has set times on {{ bestRecords.totalAmount }} levels
    over {{ validRecords.totalAmount }} runs. They currently hold
    <icon-trophy class="inline-svg" /> {{ worldRecords.totalAmount }} world
    records and have done
    {{ invalidRecords.totalAmount - validRecords.totalAmount }} any% attempts.
  </p>
  <column-layout>
    <template #left>
      <record-list header="World Records" :records="worldRecords.records" />
      <record-list header="Best Times" :records="bestRecords.records" />
    </template>
    <template #right>
      <record-list header="Recent Times" :records="recentRecords.records" />
      <record-list header="Any% Times" :records="invalidRecords.records" />
    </template>
  </column-layout>
  <debug-code :data="recentRecords.records" />
</template>
