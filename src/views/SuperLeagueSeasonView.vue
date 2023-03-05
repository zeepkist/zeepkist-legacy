<script setup lang="ts">
  import { useRoute } from 'vue-router'

  import SuperLeagueSeasonLayout from '@/components/layouts/SuperLeagueSeasonLayout.vue'
  import LoadingIndicator from '@/components/LoadingIndicator.vue'

  const route = useRoute()

  const season = route.params.season as string

  const toTitleCase = (string: string) =>
    string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()

  const formatTitle = (string: string) => toTitleCase(string.replace('-', ' '))
</script>

<template>
  <div>
    <h1>Super League: {{ formatTitle(season) }}</h1>
    <router-link :to="{ name: 'super-league' }"
      >Back to Super League</router-link
    >
  </div>
  <suspense>
    <super-league-season-layout />
    <template #fallback>
      <loading-indicator />
    </template>
  </suspense>
</template>
