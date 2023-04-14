<script setup lang="ts">
  import { useQuery, useQueryClient } from '@tanstack/vue-query'
  import { useSeoMeta } from '@vueuse/head'
  import { getLevels, type Level } from '@zeepkist/gtr-api'
  import { addHours } from 'date-fns'
  import { HTTPError } from 'ky'
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'

  import ErrorLayout from '~/components/layouts/ErrorLayout.vue'
  import LevelLayout from '~/components/layouts/LevelLayout.vue'
  import LoadingIndicator from '~/components/LoadingIndicator.vue'

  const route = useRoute()
  const queryClient = useQueryClient()
  const id = Number(route.params.id)
  const errorMessage = ref<string>()

  const {
    data: level,
    isSuccess,
    suspense
  } = useQuery({
    queryKey: ['level', id],
    queryFn: async () => {
      try {
        const response = await getLevels({ Id: id })
        if (response.levels.length === 1) {
          return response.levels[0]
        } else {
          throw new Error('Level not found')
        }
      } catch (error) {
        if (error instanceof HTTPError && error.response.status === 404) {
          errorMessage.value =
            'Level not found. It may not have been played by a user with Zeepkist GTR installed yet!'
        }

        // eslint-disable-next-line unicorn/no-null
        return null
      }
    },
    retry: false,
    keepPreviousData: true,
    placeholderData: queryClient.getQueryData(['level', id]) as Level,
    enabled: !!id,
    staleTime: addHours(new Date(), 1).getTime()
  })

  // Wait for the query to finish before rendering the view
  await suspense()

  if (isSuccess && level.value) {
    const title = level.value.name
    const description = `Check out ${level.value.name} by ${level.value.author} on Zeepkist Records, the ultimate platform for Zeepkist racing fans!

Play it and see how you stack up against other players!`
    const url = window.location.href.split('?')[0]
    const image = level.value.thumbnailUrl

    useSeoMeta({
      title: `${title}・Zeepkist Records`,
      description,
      ogTitle: title,
      ogDescription: description,
      ogImage: image,
      ogUrl: url,
      twitterTitle: title,
      twitterDescription: description,
      twitterImage: image,
      twitterCard: 'summary_large_image'
    })
  }
</script>

<template>
  <suspense>
    <level-layout v-if="level" :level="level" />
    <error-layout
      v-else
      :message="
        errorMessage ??
        'An error occurred while fetching the level. Please try again later.'
      " />
    <template #fallback>
      <loading-indicator />
    </template>
  </suspense>
</template>
