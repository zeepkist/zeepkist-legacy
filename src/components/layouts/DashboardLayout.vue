<script setup lang="ts">
  import { useQuery } from '@tanstack/vue-query'
  import { getLevels, getRecords } from '@zeepkist/gtr-api'
  import { ref } from 'vue'

  import ColumnLayout from '~/components/ColumnLayout.vue'
  import LevelList from '~/components/LevelList.vue'
  import PaginatedComponent from '~/components/PaginatedComponent.vue'
  import RecordList from '~/components/RecordList.vue'
  import ContentSheet from '~/components/sheets/ContentSheet.vue'
  import DashboardStatsSheet from '~/components/sheets/DashboardStatsSheet.vue'
  import ZeepkistDiscordSheet from '~/components/sheets/ZeepkistDiscordSheet.vue'
  import { useSteamStore } from '~/stores/steam'

  type RecordType = 'worldRecord' | 'recent'

  const steamStore = useSteamStore()
  const limit = 10

  const worldRecordsPage = ref(1)
  const { data: worldRecords, isPreviousData: isPreviousWorldRecordsData } =
    useQuery({
      queryKey: ['worldRecords', worldRecordsPage],
      queryFn: async () =>
        await getRecords({
          Limit: limit,
          WorldRecordOnly: true,
          Sort: '-id',
          Offset: (worldRecordsPage.value - 1) * limit
        }),
      keepPreviousData: true
    })

  const recentRecordsPage = ref(1)
  const { data: recentRecords, isPreviousData: isPreviousRecentRecordsData } =
    useQuery({
      queryKey: ['recentRecords', recentRecordsPage],
      queryFn: async () =>
        await getRecords({
          Limit: limit,
          ValidOnly: false,
          InvalidOnly: false,
          Sort: '-id',
          Offset: (recentRecordsPage.value - 1) * limit
        }),
      keepPreviousData: true
    })

  const levelsPage = ref(1)
  const { data: levels, isPreviousData: isPreviousLevelsData } = useQuery({
    queryKey: ['levels', levelsPage],
    queryFn: async () =>
      await getLevels({
        Limit: limit * 2,
        Offset: (levelsPage.value - 1) * limit * 2,
        Sort: '-id'
      }),
    keepPreviousData: true
  })

  const handlePageChanged = async (
    type: RecordType | 'level',
    page: number
  ) => {
    switch (type) {
      case 'worldRecord': {
        if (!isPreviousWorldRecordsData.value) {
          worldRecordsPage.value = page
        }
        break
      }
      case 'recent': {
        if (!isPreviousRecentRecordsData.value) {
          recentRecordsPage.value = page
        }
        break
      }
      case 'level': {
        if (!isPreviousLevelsData.value) {
          levelsPage.value = page
        }
        break
      }
    }
  }
</script>

<template>
  <column-layout v-if="!steamStore.steamId">
    <template #left>
      <dashboard-stats-sheet
        :levels="levels?.totalAmount"
        :records="recentRecords?.totalAmount"
        :world-records="worldRecords?.totalAmount" />
    </template>
    <template #right>
      <zeepkist-discord-sheet />
    </template>
  </column-layout>

  <dashboard-stats-sheet
    v-if="steamStore.steamId"
    :levels="levels?.totalAmount"
    :records="recentRecords?.totalAmount"
    :world-records="worldRecords?.totalAmount" />

  <column-layout>
    <template #left>
      <content-sheet>
        <paginated-component
          v-if="worldRecords"
          :current-page="worldRecordsPage"
          :items-per-page="limit"
          :total-items="worldRecords.totalAmount"
          @page-changed="page => handlePageChanged('worldRecord', page)">
          <record-list
            header="World Records"
            :records="worldRecords.records"
            show-user />
        </paginated-component>
      </content-sheet>
    </template>
    <template #right>
      <content-sheet>
        <paginated-component
          v-if="recentRecords"
          :current-page="recentRecordsPage"
          :items-per-page="limit"
          :total-items="recentRecords.totalAmount"
          @page-changed="page => handlePageChanged('recent', page)">
          <record-list
            header="Recent Times"
            :records="recentRecords.records"
            show-user
            show-badges />
        </paginated-component>
      </content-sheet>
    </template>
  </column-layout>

  <content-sheet>
    <paginated-component
      v-if="levels"
      :current-page="levelsPage"
      :items-per-page="limit * 2"
      :total-items="levels.totalAmount"
      @page-changed="page => handlePageChanged('level', page)">
      <level-list header="Recent Levels" :levels="levels.levels" />
    </paginated-component>
  </content-sheet>
</template>
