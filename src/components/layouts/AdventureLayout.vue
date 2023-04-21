<script setup lang="ts">
  import { useQuery, useQueryClient } from '@tanstack/vue-query'
  import { getLevels, type LevelsResponse } from '@zeepkist/gtr-api'

  import LevelList from '~/components/LevelList.vue'

  const queryClient = useQueryClient()

  const { data, suspense } = useQuery({
    queryKey: ['adventureLevels'],
    queryFn: async () => {
      const levels = await getLevels({ WorkshopId: '0' })

      // Sort levels by name alphabetically
      levels.levels = levels.levels.sort((a, b) => a.name.localeCompare(b.name))

      return levels
    },
    placeholderData: queryClient.getQueryData([
      'adventureLevels'
    ]) as LevelsResponse
  })

  // Wait for the query to finish before rendering the view
  await suspense()
</script>

<template>
  <template v-if="data">
    <p>{{ data.totalAmount }} levels</p>
    <level-list :levels="data.levels" />
  </template>
</template>
