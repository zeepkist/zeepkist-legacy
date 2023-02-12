<script setup lang="ts">
  import { IconTrophy } from '@tabler/icons-vue'
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'

  import ColumnLayout from '@/components/ColumnLayout.vue'
  import DebugCode from '@/components/DebugCode.vue'
  import PaginatedComponent from '@/components/PaginatedComponent.vue'
  import RecordList from '@/components/RecordList.vue'
  import { getRecords } from '@/services/records'
  import { getUser } from '@/services/users'

  type RecordType = 'worldRecord' | 'best' | 'invalid' | 'recent'

  const route = useRoute()
  const steamId = route.params.steamId as string
  const limit = 15

  const user = ref(await getUser({ steamId }))

  const getPaginatedRecords = async (type: RecordType, page = 1) => {
    switch (type) {
      case 'best': {
        return await getRecords({
          UserSteamId: steamId,
          BestOnly: true,
          Sort: '-id',
          Limit: limit,
          Offset: (page - 1) * limit
        })
      }
      case 'worldRecord': {
        return await getRecords({
          UserSteamId: steamId,
          ValidOnly: true,
          WorldRecordOnly: true,
          Sort: '-id',
          Limit: limit,
          Offset: (page - 1) * limit
        })
      }
      case 'invalid': {
        return await getRecords({
          UserSteamId: steamId,
          InvalidOnly: true,
          Sort: '-id',
          Limit: limit,
          Offset: (page - 1) * limit
        })
      }
      case 'recent': {
        return await getRecords({
          UserSteamId: steamId,
          Sort: '-id',
          Limit: limit,
          Offset: (page - 1) * limit
        })
      }
    }
  }

  const handlePageChanged = async (type: RecordType, page: number) => {
    switch (type) {
      case 'best': {
        pages.value.best = page
        bestRecords.value = await getPaginatedRecords('best', page)
        break
      }
      case 'worldRecord': {
        pages.value.worldRecord = page
        worldRecords.value = await getPaginatedRecords('worldRecord', page)
        break
      }
      case 'invalid': {
        pages.value.invalid = page
        invalidRecords.value = await getPaginatedRecords('invalid', page)
        break
      }
      case 'recent': {
        pages.value.recent = page
        recentRecords.value = await getPaginatedRecords('recent', page)
        break
      }
    }
  }

  const bestRecords = ref(await getPaginatedRecords('best'))
  const validRecords = ref(
    await getRecords({
      UserSteamId: steamId,
      BestOnly: false,
      ValidOnly: true,
      Sort: '-id',
      Limit: 0
    })
  )
  const worldRecords = ref(await getPaginatedRecords('worldRecord'))
  const recentRecords = ref(await getPaginatedRecords('recent'))
  const invalidRecords = ref(await getPaginatedRecords('invalid'))

  const pages = ref({
    best: 1,
    worldRecord: 1,
    invalid: 1,
    recent: 1
  })
</script>

<template>
  <h1>{{ user.steamName }}</h1>
  <p>
    {{ user.steamName }} has set times on {{ bestRecords.totalAmount }} levels
    over {{ validRecords.totalAmount }} runs. They currently hold
    <icon-trophy class="inline-svg" /> {{ worldRecords.totalAmount }} world
    records and have done {{ invalidRecords.totalAmount }} any% attempts.
  </p>
  <column-layout>
    <template #left>
      <paginated-component
        :current-page="pages.worldRecord"
        :items-per-page="limit"
        :total-items="worldRecords.totalAmount"
        @page-changed="page => handlePageChanged('worldRecord', page)">
        <record-list header="World Records" :records="worldRecords.records" />
      </paginated-component>
      <paginated-component
        :current-page="pages.best"
        :items-per-page="limit"
        :total-items="bestRecords.totalAmount"
        @page-changed="page => handlePageChanged('best', page)">
        <record-list header="Best Times" :records="bestRecords.records" />
      </paginated-component>
    </template>
    <template #right>
      <paginated-component
        :current-page="pages.recent"
        :items-per-page="limit"
        :total-items="validRecords.totalAmount"
        @page-changed="page => handlePageChanged('recent', page)">
        <record-list header="Recent Times" :records="recentRecords.records" />
      </paginated-component>
      <paginated-component
        :current-page="pages.invalid"
        :items-per-page="limit"
        :total-items="invalidRecords.totalAmount"
        @page-changed="page => handlePageChanged('invalid', page)">
        <record-list header="Any% Times" :records="invalidRecords.records" />
      </paginated-component>
    </template>
  </column-layout>
  <debug-code :data="recentRecords.records" />
</template>
