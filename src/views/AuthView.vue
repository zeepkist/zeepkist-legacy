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

  /*
  const {
    'openid.ns': ns,
    'openid.mode': mode,
    'openid.op_endpoint': opEndpoint,
    'openid.claimed_id': claimedId,
    'openid.identity': identity,
    'openid.return_to': returnTo,
    'openid.response_nonce': responseNonce,
    'openid.assoc_handle': assocHandle,
    'openid.signed': signed,
    'openid.sig': sig
  } = route.query

  console.log(
    ns,
    mode,
    opEndpoint,
    claimedId,
    identity,
    returnTo,
    responseNonce,
    assocHandle,
    signed,
    sig
  )*/
</script>

<template>
  <div></div>
</template>
