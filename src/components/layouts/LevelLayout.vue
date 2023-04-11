<script setup lang="ts">
  import { getRecords, type Level } from '@zeepkist/gtr-api'
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'

  import ColumnLayout from '~/components/ColumnLayout.vue'
  import PaginatedComponent from '~/components/PaginatedComponent.vue'
  import RecordList from '~/components/RecordList.vue'
  import ContentSheet from '~/components/sheets/ContentSheet.vue'
  import UserBadge from '~/components/UserBadge.vue'

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
  <div :class="$style.coverImageContainer">
    <div
      :style="{ '--thumbnailUrl': `url(${level.thumbnailUrl})` }"
      :class="$style.coverImage" />
  </div>
  <div :class="$style.header">
    <img :src="level.thumbnailUrl" alt="" />
    <div :class="$style.headerTitle">
      <h1>{{ level.name }}</h1>
      <span :class="$style.headerAuthor"
        >By <user-badge :username="level.author"
      /></span>
      <div :class="$style.headerExtra">
        <span
          v-if="recentRecords.totalAmount - invalidRecords.totalAmount > 250"
          :class="$style.badge"
          >POPULAR</span
        >
        <span
          >{{ recentRecords.totalAmount - invalidRecords.totalAmount }} valid
          runs</span
        >
        <span>{{ bestRecords.totalAmount }} players</span>
      </div>
    </div>
  </div>
  <column-layout>
    <template #left>
      <content-sheet>
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
      </content-sheet>
    </template>
    <template #center>
      <content-sheet>
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
      </content-sheet>
    </template>
    <template #right>
      <content-sheet>
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
      </content-sheet>
    </template>
  </column-layout>
</template>

<style module lang="less">
  .coverImageContainer {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 25rem;
    overflow: hidden;
  }

  .coverImage {
    z-index: -2;
    height: calc(100% + 1rem);
    width: calc(100% + 2rem);
    margin: -1rem -1rem 0;
    background-repeat: no-repeat;
    background-image: linear-gradient(
        to top,
        var(--color-bg-1),
        rgba(#222, 0.6)
      ),
      var(--thumbnailUrl);
    // background-image: var(--thumbnailUrl);
    background-size: cover;
    background-position-y: 50%;
    filter: blur(0.5rem) grayscale(0.4);
    overflow: hidden;
  }

  .header {
    display: flex;
    align-items: flex-start;
    margin: 1rem 0;
    height: 100px;
    max-height: 100px;

    img {
      max-height: 100px;
      margin-right: 1rem;
      border-radius: var(--border-radius-large);
    }

    .headerTitle {
      flex: 1;
      margin-top: 0.5rem;
      line-height: 1ex;
      height: calc(100px - 0.5rem);
      max-height: calc(100px - 0.5rem);

      display: flex;
      flex-direction: column;
    }

    .headerAuthor {
      line-height: 1ex;
      font-size: 1rem;
    }

    .headerExtra {
      flex: 1;
      display: flex;
      align-items: flex-end;
      gap: 0.5rem;
      font-size: 0.75rem;

      span {
        padding: 0.25rem 0.5rem;
      }
    }

    .badge {
      border: 1px solid rgb(var(--primary-6));
      border-radius: 0.25rem;
      font-size: 0.675rem;
    }
  }
</style>
