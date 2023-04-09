<script setup lang="ts">
  import { getUser, type User } from '@zeepkist/gtr-api'
  import { HTTPError } from 'ky'
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'

  import ErrorLayout from '~/components/layouts/ErrorLayout.vue'
  import UserLayout from '~/components/layouts/UserLayout.vue'
  import LoadingIndicator from '~/components/LoadingIndicator.vue'
  import ContentSheet from '~/components/sheets/ContentSheet.vue'

  const route = useRoute()
  const steamId = route.params.steamId as string

  const user = ref<User>()

  try {
    user.value = await getUser({ SteamId: steamId })
  } catch (error) {
    if (error instanceof HTTPError && error.response.status === 404) {
      user.value = undefined
    } else {
      console.error(error)
    }
  }
</script>

<template>
  <content-sheet>
    <suspense>
      <user-layout v-if="user" :user="user" />
      <error-layout
        v-else
        message="User not found. They may not have the Zeepkist GTR mod installed!" />
      <template #fallback>
        <loading-indicator />
      </template>
    </suspense>
  </content-sheet>
</template>
