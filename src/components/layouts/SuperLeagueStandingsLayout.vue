<script setup lang="ts">
  import { useRoute } from 'vue-router'

  import DebugCode from '~/components/DebugCode.vue'
  import StandingsList from '~/components/StandingsList.vue'
  import { getSeasonStandings } from '~/services/superLeague'

  const route = useRoute()

  const season = route.params.season as string

  const standings = await getSeasonStandings(season)
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
