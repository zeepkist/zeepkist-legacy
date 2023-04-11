<script setup lang="ts">
  import { useQuery, useQueryClient } from '@tanstack/vue-query'
  import { getLevels, type Level } from '@zeepkist/gtr-api'
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'

  import ErrorLayout from '~/components/layouts/ErrorLayout.vue'
  import LevelLayout from '~/components/layouts/LevelLayout.vue'
  import LoadingIndicator from '~/components/LoadingIndicator.vue'

  const route = useRoute()
  const queryClient = useQueryClient()
  const id = Number(route.params.id)
  const level = ref<Level>(queryClient.getQueryData(['level', id]) as Level)

  const { isLoading } = useQuery({
    queryKey: ['level', route.params.id || 'test'],
    queryFn: async () => {
      const response = await getLevels({ Id: id })
      if (response.levels.length === 1) {
        level.value = response.levels[0]
        return response.levels[0]
      } else {
        throw new Error('Level not found')
      }
    },
    keepPreviousData: true,
    enabled: !!id
  })
</script>

<template>
  <loading-indicator v-if="isLoading" />
  <suspense v-else>
    <level-layout v-if="level" :level="level" />
    <error-layout
      v-else
      message="Level not found. It may not have been played by a user with Zeepkist GTR installed yet!" />
    <template #fallback>
      <loading-indicator />
    </template>
  </suspense>
</template>
