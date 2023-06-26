<script setup lang="ts">
  import { useQuery, useQueryClient } from '@tanstack/vue-query'
  import {
    getLevels,
    type LevelsResponse,
    searchLevels
  } from '@zeepkist/gtr-api'
  import { ref } from 'vue'

  import LevelList from '~/components/LevelList.vue'
  import PaginatedComponent from '~/components/PaginatedComponent.vue'

  type Sort = 'name' | '-name' | '-id' | 'id' | 'rank'

  const { workshopId, query } = defineProps<{
    query?: {
      query: string
    }
    workshopId?: string
  }>()

  const queryClient = useQueryClient()

  const itemsPerPage = 24
  const currentPage = ref(1)
  const sort = ref<Sort>(workshopId ? 'name' : '-id')

  const { data, isPreviousData } = useQuery({
    queryKey: ['levels', currentPage, workshopId, query, sort],
    queryFn: async () => {
      const levels = query?.query
        ? await searchLevels({
            Query: query.query,
            Limit: itemsPerPage,
            Offset: (currentPage.value - 1) * itemsPerPage,
            Sort: sort.value
          })
        : await getLevels({
            WorkshopId: workshopId ?? undefined,
            Limit: itemsPerPage,
            Offset: (currentPage.value - 1) * itemsPerPage,
            Sort: sort.value
          })

      return levels
    },
    placeholderData: queryClient.getQueryData([
      'levels',
      currentPage.value,
      workshopId,
      query,
      sort
    ]) as LevelsResponse
  })

  const handlePageChanged = async (page: number) => {
    currentPage.value = page
  }

  const handleSortChanged = (newSort: Sort) => {
    currentPage.value = 1
    sort.value = newSort
  }
</script>

<template>
  <template v-if="data">
    <div :class="$style.filterContainer">
      <p>{{ data.totalAmount }} levels</p>
      <div :class="$style.filter">
        <button
          :class="{ [$style.selected]: sort === 'name' }"
          @click="handleSortChanged('name')">
          A-Z
        </button>
        <button
          :class="{ [$style.selected]: sort === '-name' }"
          @click="handleSortChanged('-name')">
          Z-A
        </button>
        <button
          :class="{ [$style.selected]: sort === '-id' }"
          @click="handleSortChanged('-id')">
          Newest First
        </button>
        <button
          :class="{ [$style.selected]: sort === 'id' }"
          @click="handleSortChanged('id')">
          Oldest First
        </button>
        <button
          :class="{ [$style.selected]: sort === 'rank' }"
          @click="handleSortChanged('rank')">
          Popularity
        </button>
      </div>
    </div>
    <paginated-component
      :key="[currentPage, workshopId, query, sort].join('-')"
      :current-page="currentPage"
      :items-per-page="itemsPerPage"
      :total-items="data.totalAmount"
      :disabled-pagination="isPreviousData"
      :is-loading="isPreviousData"
      @page-changed="handlePageChanged">
      <level-list :levels="data.levels" />
    </paginated-component>
  </template>
</template>

<style module lang="less">
  .filterContainer {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  .filter {
    display: flex;
    justify-content: space-between;
    gap: 1rem;

    button {
      height: 2rem;
      background: transparent;
      border: 1px solid transparent;
      color: var(--color-text-1);
      border-radius: var(--border-radius-large);
      cursor: pointer;
      transition: border 0.2s ease-in-out;

      &.selected,
      &:hover {
        border: 1px solid rgba(var(--primary-5));
      }
    }
  }
</style>
