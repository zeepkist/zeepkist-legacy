<script setup lang="ts">
  import { getRecords, type Level } from '@zeepkist/gtr-api'
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'

  import ColumnLayout from '@/components/ColumnLayout.vue'
  import PaginatedComponent from '@/components/PaginatedComponent.vue'
  import RecordList from '@/components/RecordList.vue'
  import UserBadge from '@/components/UserBadge.vue'

  type RecordType = 'recent' | 'best' | 'invalid'

  const { level } = defineProps<{
    level: Level
  }>()

  const route = useRoute()
  const id = Number(route.params.id)
  const limit = 10

  const getPaginatedRecords = async (type: RecordType, page = 1) => {
    switch (type) {
      case 'recent': {
        return await getRecords({
          LevelId: id,
          ValidOnly: false,
          InvalidOnly: false,
          Sort: '-id',
          Limit: limit,
          Offset: (page - 1) * limit
        })
      }
      case 'best': {
        return await getRecords({
          LevelId: id,
          BestOnly: true,
          Limit: limit,
          Offset: (page - 1) * limit
        })
      }
      case 'invalid': {
        return await getRecords({
          LevelId: id,
          InvalidOnly: true,
          Sort: 'time',
          Limit: limit,
          Offset: (page - 1) * limit
        })
      }
    }
  }

  const handlePageChanged = async (type: RecordType, page: number) => {
    switch (type) {
      case 'recent': {
        recentRecords.value = await getPaginatedRecords('recent', page)
        pages.value.recent = page
        break
      }
      case 'best': {
        bestRecords.value = await getPaginatedRecords('best', page)
        pages.value.best = page
        break
      }
      case 'invalid': {
        invalidRecords.value = await getPaginatedRecords('invalid', page)
        pages.value.invalid = page
        break
      }
    }
  }

  const recentRecords = ref(await getPaginatedRecords('recent'))
  const bestRecords = ref(await getPaginatedRecords('best'))
  const invalidRecords = ref(await getPaginatedRecords('invalid'))

  const pages = ref({
    best: 1,
    worldRecord: 1,
    invalid: 1,
    recent: 1
  })
</script>

<template>
  <div class="header">
    <img :src="level.thumbnailUrl" alt="" />
    <div class="header-title">
      <h1>{{ level.name }}</h1>
      <span class="author">By <user-badge :username="level.author" /></span>
    </div>
  </div>
  <p>
    This level has been played {{ recentRecords.totalAmount - invalidRecords.totalAmount }} times by
    {{ bestRecords.totalAmount }} players.
  </p>
  <column-layout>
    <template #left>
      <paginated-component
        :current-page="pages.best"
        :items-per-page="limit"
        :total-items="bestRecords.totalAmount"
        @page-changed="page => handlePageChanged('best', page)">
        <record-list
          header="Best Times"
          :records="bestRecords.records"
          :rank-offset="(pages.best - 1) * limit"
          show-user
          hide-track-info />
      </paginated-component>
    </template>
    <template #center>
      <paginated-component
        :current-page="pages.recent"
        :items-per-page="limit"
        :total-items="recentRecords.totalAmount"
        @page-changed="page => handlePageChanged('recent', page)">
        <record-list
          header="Recent Times"
          :records="recentRecords.records"
          show-user
          show-badges
          hide-track-info />
      </paginated-component>
    </template>
    <template #right>
      <paginated-component
        :current-page="pages.invalid"
        :items-per-page="limit"
        :total-items="invalidRecords.totalAmount"
        @page-changed="page => handlePageChanged('invalid', page)">
        <record-list
          header="Any% Times"
          :records="invalidRecords.records"
          :rank-offset="(pages.invalid - 1) * limit"
          show-user
          show-badges
          hide-track-info />
      </paginated-component>
    </template>
  </column-layout>
</template>

<style scoped lang="less">
  .header {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    img {
      max-height: 100px;
      margin-right: 1rem;
    }

    .header-title {
      flex: 1;
    }

    .author {
      font-size: 1.5rem;
    }
  }
</style>
