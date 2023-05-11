<script setup lang="ts">
  import { useQuery } from '@tanstack/vue-query'
  import { getHotLevels, getPopularLevels } from '@zeepkist/gtr-api'
  import { addHours } from 'date-fns'
  import { computed, reactive } from 'vue'

  const { levelId, popular = false } = defineProps<{
    levelId: number
    popular?: boolean
  }>()

  const { data } = reactive(
    useQuery({
      queryKey: [popular ? 'popularLevels' : 'hotLevels'],
      queryFn: async () => {
        const popularLevels = popular
          ? await getPopularLevels()
          : await getHotLevels()

        return popularLevels
      },
      cacheTime: addHours(0, 1).getTime(),
      staleTime: addHours(0, 1).getTime()
    })
  )

  const isLevelPopular = computed(() => {
    if (!data) return false

    return data.levels.some(level => level.level.id === levelId)
  })
</script>

<template>
  <span v-if="isLevelPopular" :class="$style.badge">{{
    popular ? 'Popular' : 'Hot'
  }}</span>
</template>

<style module lang="less">
  span.badge {
    border: 1px solid var(--zk-primary-5);
    border-radius: 0.25rem;
    font-size: 0.675rem;
    margin-bottom: -0.375rem;
    padding: 0.25rem 0.5rem 0.375rem !important;
  }
</style>
