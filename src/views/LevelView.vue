<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useRoute } from 'vue-router'

  import ColumnLayout from '@/components/ColumnLayout.vue'
  import DebugCode from '@/components/DebugCode.vue'
  import PaginatedComponent from '@/components/PaginatedComponent.vue'
  import RecordList from '@/components/RecordList.vue'
  import { getRecords } from '@/services/records'

  type RecordType = 'recent' | 'best' | 'invalid'

  const route = useRoute()
  const id = route.params.id as string
  const limit = 10

  const getPaginatedRecords = async (type: RecordType, page = 1) => {
    switch (type) {
      case 'recent': {
        return await getRecords({
          LevelId: id,
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
          Sort: '-time',
          Limit: limit,
          Offset: (page - 1) * limit
        })
      }
    }
  }

  const handlePageChanged = async (type: RecordType, page: number) => {
    switch (type) {
      case 'recent': {
        pages.value.recent = page
        recentRecords.value = await getPaginatedRecords('recent', page)
        break
      }
      case 'best': {
        pages.value.best = page
        bestRecords.value = await getPaginatedRecords('best', page)
        break
      }
      case 'invalid': {
        pages.value.invalid = page
        invalidRecords.value = await getPaginatedRecords('invalid', page)
        break
      }
    }
  }

  const recentRecords = ref(await getPaginatedRecords('recent'))
  const bestRecords = ref(await getPaginatedRecords('best'))
  const invalidRecords = ref(await getPaginatedRecords('invalid'))

  const unknownLevel = {
    name: 'Unknown',
    thumbnailUrl: '',
    author: 'Bouwerman'
  }

  const levelData = computed(
    () =>
      recentRecords.value?.records[0]?.level ??
      invalidRecords.value?.records[0]?.level ??
      unknownLevel
  )

  const pages = ref({
    best: 1,
    worldRecord: 1,
    invalid: 1,
    recent: 1
  })
</script>

<template>
  <div class="header">
    <img :src="levelData.thumbnailUrl" alt="" />
    <div class="header-title">
      <h1>{{ levelData.name }}</h1>
      <span class="author">By {{ levelData.author }}</span>
    </div>
  </div>
  <p>
    This level has been played {{ recentRecords.totalAmount }} times by
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
          hide-track-info />
      </paginated-component>
    </template>
  </column-layout>
  <debug-code :data="recentRecords.records" />
  <debug-code :data="bestRecords.records" />
  <debug-code :data="invalidRecords.records" />
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
