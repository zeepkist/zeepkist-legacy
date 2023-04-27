<script setup lang="ts">
  import { useQuery, useQueryClient } from '@tanstack/vue-query'
  import { useSeoMeta } from '@unhead/vue'
  import { defineWebPage, useSchemaOrg } from '@vueuse/schema-org'
  import { getLevel, type Level } from '@zeepkist/gtr-api'
  import { addDays } from 'date-fns'
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'

  import ErrorLayout from '~/components/layouts/ErrorLayout.vue'
  import LevelLayout from '~/components/layouts/LevelLayout.vue'
  import LoadingIndicator from '~/components/LoadingIndicator.vue'
  import { formatThumbnailEmbed } from '~/utils'

  const route = useRoute()
  const queryClient = useQueryClient()
  const id = Number(route.params.id)
  const errorMessage = ref<string>()

  const { data: level, isSuccess, isInitialLoading } = useQuery({
    queryKey: ['level', id],
    queryFn: async () => {
      try {
        const level = await getLevel(id)

        if (!level) throw new Error('Level not found')

        return level
      } catch (error) {
        if (error instanceof Error && error.message === 'Level not found') {
          errorMessage.value =
            'Level not found. It may not have been played by a user with Zeepkist GTR installed yet!'
        }

        // eslint-disable-next-line unicorn/no-null
        return null
      }
    },
    suspense: false,
    initialData: queryClient.getQueryData(['level', id]) as Level,
    enabled: !!id,
    staleTime: addDays(0, 1).getTime(),
    cacheTime: addDays(0, 1).getTime()
  })

  if (isSuccess && level.value) {
    const title = `${level.value.name}・Zeepkist Records`
    const description = `Check out ${level.value.name} by ${level.value.author} on Zeepkist Records, the ultimate platform for Zeepkist racing fans!

Play it and see how you stack up against other players!`
    const url = window.location.href.split('?')[0]
    const image = formatThumbnailEmbed(level.value.thumbnailUrl)

    useSeoMeta({
      title,
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

    useSchemaOrg(
      defineWebPage({
        '@type': 'ItemPage',
        url,
        name: title,
        description,
        image,
        publisher: {
          '@type': 'Organization',
          name: 'Zeepkist Records',
          url: 'https://zeepki.st'
        },
        author: {
          '@type': 'Person',
          name: level.value.author
        }
      })
    )
  }
</script>

<template>
  <suspense>
  <loading-indicator v-if="isInitialLoading" />
  <level-layout v-else-if="level" :level="level" />
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
