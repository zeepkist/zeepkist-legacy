<script setup lang="ts">
  import { useQuery } from '@tanstack/vue-query'
  import {
    getHotLevels,
    getLevels,
    getPopularLevels,
    getRecords,
    type PopularLevel
  } from '@zeepkist/gtr-api'
  import { ref } from 'vue'

  import ColumnLayout from '~/components/ColumnLayout.vue'
  import LevelList from '~/components/LevelList.vue'
  import PaginatedComponent from '~/components/PaginatedComponent.vue'
  import RecordList from '~/components/RecordList.vue'
  import ContentSheet from '~/components/sheets/ContentSheet.vue'
  import DashboardStatsSheet from '~/components/sheets/DashboardStatsSheet.vue'
  import ZeepkistDiscordSheet from '~/components/sheets/ZeepkistDiscordSheet.vue'
  import { useAuthenticationStore } from '~/stores/authentication'

  type RecordType = 'worldRecord' | 'recent'

  const authStore = useAuthenticationStore()
  const limit = 10

  const sortByPopularity = (a: PopularLevel, b: PopularLevel) => {
    if (a.recordsCount > b.recordsCount) return -1
    if (a.recordsCount < b.recordsCount) return 1
    return 0
  }

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
        })
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
        })
    })

  const levelsPerPage = 18
  const levelsPage = ref(1)
  const { data: levels, isPreviousData: isPreviousLevelsData } = useQuery({
    queryKey: ['levels', levelsPage],
    queryFn: async () =>
      await getLevels({
        Limit: levelsPerPage,
        Offset: (levelsPage.value - 1) * levelsPerPage * 2,
        Sort: '-id'
      })
  })

  const { data: hotLevels } = useQuery({
    queryKey: ['hotLevels'],
    queryFn: async () => {
      const data = await getHotLevels()
      data.levels = data.levels.sort(sortByPopularity)
      return data
    }
  })

  const popularLevelsPage = ref(1)
  const { data: popularLevels } = useQuery({
    queryKey: ['popularLevels'],
    queryFn: async () => {
      const data = await getPopularLevels()
      data.levels = data.levels.sort(sortByPopularity)
      return data
    }
  })

  const handlePageChanged = async (
    type: RecordType | 'level' | 'popularLevel',
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
      case 'popularLevel': {
        popularLevelsPage.value = page
        break
      }
    }
  }
</script>

<template>
  <column-layout v-if="!authStore.SteamId">
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
    v-if="authStore.SteamId"
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

  <content-sheet v-if="hotLevels">
    <level-list
      header="Trending Today"
      :levels="hotLevels.levels.slice(0, -1)" />
  </content-sheet>

  <content-sheet v-if="popularLevels">
    <paginated-component
      :current-page="popularLevelsPage"
      :items-per-page="9"
      :total-items="popularLevels.levels.length"
      @page-changed="page => handlePageChanged('popularLevel', page)">
      <level-list
        header="Popular This Month"
        :levels="
          popularLevels.levels.slice(
            9 * (popularLevelsPage - 1),
            9 * popularLevelsPage
          )
        " />
    </paginated-component>
  </content-sheet>

  <content-sheet>
    <paginated-component
      v-if="levels"
      :current-page="levelsPage"
      :items-per-page="levelsPerPage"
      :total-items="levels.totalAmount"
      @page-changed="page => handlePageChanged('level', page)">
      <level-list header="New Levels" :levels="levels.levels" />
    </paginated-component>
  </content-sheet>
</template>
