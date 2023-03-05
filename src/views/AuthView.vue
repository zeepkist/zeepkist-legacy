<script setup lang="ts">
  import { useRoute, useRouter } from 'vue-router'

  import { useSteamStore } from '@/stores/steam'

  const route = useRoute()
  const router = useRouter()
  const steamStore = useSteamStore()

  const steamId = route.query['openid.claimed_id']
    ?.toString()
    .replace('https://steamcommunity.com/openid/id/', '')

  if (steamId) {
    steamStore.setSteamId(steamId)
    router.push({ name: 'user', params: { steamId } })
  } else {
    router.push({ name: 'dashboard' })
  }
</script>

<template>
  <div></div>
</template>
