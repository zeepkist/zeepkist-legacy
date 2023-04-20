<script setup lang="ts">
  import { useQuery, useQueryClient } from '@tanstack/vue-query'
  import { getLevels, type LevelsResponse } from '@zeepkist/gtr-api'
  import { addMinutes } from 'date-fns'
  import { ref } from 'vue'

  import LevelList from '~/components/LevelList.vue'
  import PaginatedComponent from '~/components/PaginatedComponent.vue'

  const { workshopId } = defineProps<{
    workshopId?: string
  }>()

  const queryClient = useQueryClient()

  const itemsPerPage = 24
  const currentPage = ref(1)

  const { data, suspense } = useQuery({
    queryKey: ['levels', currentPage, workshopId],
    queryFn: async () => {
      const levels = await getLevels({
        WorkshopId: workshopId ?? undefined,
        Limit: itemsPerPage,
        Offset: (currentPage.value - 1) * itemsPerPage,
        Sort: workshopId ? 'name' : '-id'
      })

      return levels
    },
    retry: false,
    keepPreviousData: true,
    placeholderData: queryClient.getQueryData([
      'levels',
      currentPage.value
    ]) as LevelsResponse,
    staleTime: addMinutes(new Date(), 5).getTime()
  })

  // Wait for the query to finish before rendering the view
  await suspense()

  const handlePageChanged = async (page: number) => {
    currentPage.value = page
  }
</script>

<template>
  <template v-if="data">
    <p>{{ data.totalAmount }} levels</p>
    <paginated-component
      :current-page="currentPage"
      :items-per-page="itemsPerPage"
      :total-items="data.totalAmount"
      @page-changed="handlePageChanged">
      <level-list :levels="data.levels" />
    </paginated-component>
  </template>
</template>
