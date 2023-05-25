<script setup lang="ts">
  import { getRecords, type User } from '@zeepkist/gtr-api'
  import { ref } from 'vue'

  import ColumnLayout from '~/components/ColumnLayout.vue'
  import PaginatedComponent from '~/components/PaginatedComponent.vue'
  import RecordList from '~/components/RecordList.vue'
  import UserBadge from '~/components/UserBadge.vue'
  import { formatOrdinal, formatUser } from '~/utils'

  type RecordType = 'worldRecord' | 'best' | 'invalid' | 'recent'

  const limit = 10

  const { user } = defineProps<{
    user: User
  }>()

  const getPaginatedRecords = async (type: RecordType, page = 1) => {
    switch (type) {
      case 'best': {
        return await getRecords({
          UserSteamId: user.steamId,
          BestOnly: true,
          Sort: '-id',
          Limit: limit,
          Offset: (page - 1) * limit
        })
      }
      case 'worldRecord': {
        return await getRecords({
          UserSteamId: user.steamId,
          ValidOnly: true,
          WorldRecordOnly: true,
          Sort: '-id',
          Limit: limit,
          Offset: (page - 1) * limit
        })
      }
      case 'invalid': {
        return await getRecords({
          UserSteamId: user.steamId,
          InvalidOnly: true,
          Sort: '-id',
          Limit: limit,
          Offset: (page - 1) * limit
        })
      }
      case 'recent': {
        return await getRecords({
          UserSteamId: user.steamId,
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
        bestRecords.value = await getPaginatedRecords('best', page)
        pages.value.best = page
        break
      }
      case 'worldRecord': {
        worldRecords.value = await getPaginatedRecords('worldRecord', page)
        pages.value.worldRecord = page
        break
      }
      case 'invalid': {
        invalidRecords.value = await getPaginatedRecords('invalid', page)
        pages.value.invalid = page
        break
      }
      case 'recent': {
        recentRecords.value = await getPaginatedRecords('recent', page)
        pages.value.recent = page
        break
      }
    }
  }

  const bestRecords = ref(await getPaginatedRecords('best'))
  const validRecords = ref(
    await getRecords({
      UserSteamId: user.steamId,
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
  <!-- eslint-disable-next-line vuejs-accessibility/heading-has-content -->
  <h1><user-badge :username="user.steamName" /></h1>
  <p>
    {{ formatUser(user.steamName).username }} has set times on
    {{ bestRecords.totalAmount }} levels over
    {{ validRecords.totalAmount }} valid runs with
    {{ invalidRecords.totalAmount }} any% attempts.
  </p>
  <p>
    They are ranked {{ formatOrdinal(user.position) }} with
    <span :title="`${user.score} points`"> {{ user.score }} ➤ </span>
    and hold {{ worldRecords.totalAmount }} world records
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
          show-points />
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
</template>
