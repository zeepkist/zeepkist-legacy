<script setup lang="ts">
  import { useRoute, useRouter } from 'vue-router'

  import type { Authentication } from '~/models/authentication'
  import { useAuthenticationStore } from '~/stores/authentication'

  const route = useRoute()
  const router = useRouter()
  const authStore = useAuthenticationStore()

  const handleToken = (rawToken?: string) => {
    if (rawToken) {
      const auth = JSON.parse(atob(rawToken)) as Authentication
      authStore.login(auth)
      router.push({ name: 'user', params: { steamId: auth.SteamId } })
    } else router.push({ name: 'dashboard' })
  }

  handleToken(route.query['token']?.toString())
</script>

<template>
  <div></div>
</template>
