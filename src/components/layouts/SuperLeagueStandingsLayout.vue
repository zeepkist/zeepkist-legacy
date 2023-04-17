<script setup lang="ts">
  import { useSeoMeta } from '@vueuse/head'
  import { useRoute } from 'vue-router'

  import DebugCode from '~/components/DebugCode.vue'
  import StandingsList from '~/components/StandingsList.vue'
  import { getSeasonStandings } from '~/services/superLeague'
  import { formatParamToTitleCase } from '~/utils'

  defineProps<{
    eventName?: string
  }>()

  const route = useRoute()

  const season = route.params.season as string

  const standings = await getSeasonStandings(season)

  const seasonTitle = formatParamToTitleCase(season)
  const title = `${seasonTitle} Super League Standings・Zeepkist Records`
  const description = `Check out the ${seasonTitle} Super League standings on Zeepkist Records, the ultimate platform for Zeepkist racing fans!`
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
</script>

<template>
  <h2>Season Standings</h2>
  <standings-list
    v-if="standings.length > 0"
    :users="standings"
    is-season-standings />
  <p v-else>Standings not available</p>
  <debug-code :data="standings" />
</template>
