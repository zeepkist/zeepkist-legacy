<script setup lang="ts">
  import { useQuery, useQueryClient } from '@tanstack/vue-query'
  import { useSeoMeta } from '@unhead/vue'
  import { getUserBySteamId, type User } from '@zeepkist/gtr-api'
  import { HTTPError } from 'ky'
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'

  import ErrorLayout from '~/components/layouts/ErrorLayout.vue'
  import UserLayout from '~/components/layouts/UserLayout.vue'
  import LoadingIndicator from '~/components/LoadingIndicator.vue'
  import ContentSheet from '~/components/sheets/ContentSheet.vue'
  import { formatUser } from '~/utils'

  const route = useRoute()
  const queryClient = useQueryClient()
  const steamId = route.params.steamId as string
  const errorMessage = ref<string>()

  const { data: user, isSuccess } = useQuery({
    queryKey: ['user', steamId],
    queryFn: async () => {
      try {
        const user = await getUserBySteamId(steamId)

        if (!user) throw new Error('User not found')

        return user
      } catch (error) {
        if (
          (error instanceof Error && error.message === 'User not found') ||
          (error instanceof HTTPError && error.response.status === 404)
        ) {
          errorMessage.value =
            'User not found. They may not have the Zeepkist GTR mod installed!'
        }

        // eslint-disable-next-line unicorn/no-null
        return null
      }
    },
    placeholderData: queryClient.getQueryData(['user', steamId]) as User,
    enabled: !!steamId
  })

  if (isSuccess && user.value) {
    const { username } = formatUser(user.value.steamName)
    const title = `${username}・Zeepkist Records`
    const description = `Check out ${username}'s stats on Zeepkist Records, the ultimate platform for Zeepkist racing fans!`
    const url = window.location.href.split('?')[0]

    useSeoMeta({
      title,
      description,
      ogTitle: title,
      ogDescription: description,
      ogUrl: url,
      twitterTitle: title,
      twitterDescription: description
    })
  }
</script>

<template>
  <content-sheet>
    <suspense>
      <user-layout v-if="user" :user="user" />
      <error-layout
        v-else
        :message="
          errorMessage ??
          'An error occurred while fetching the user. Please try again later.'
        " />
      <template #fallback>
        <loading-indicator />
      </template>
    </suspense>
  </content-sheet>
</template>
