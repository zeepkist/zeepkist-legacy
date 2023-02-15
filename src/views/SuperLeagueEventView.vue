<script setup lang="ts">
  import { AxiosError } from 'axios'
  import { useRoute } from 'vue-router'

  import DebugCode from '@/components/DebugCode.vue'
  import StandingsList from '@/components/StandingsList.vue'
  import type { LeagueEvent } from '@/models/league'
  import { superLeagueApi } from '@/services/api'
  import { formatRelativeDate } from '@/utils'

  interface EventMetadata {
    theme?: string // Deprecated in favor of name
    name: string
    workshopId: string
  }

  interface Metadata {
    [key: string]: EventMetadata
  }

  const route = useRoute()

  const season = route.params.season as string
  const event = route.params.event as string
  const date = `${event}T18:00:00.000Z`

  const { data: metadata }: { data: Metadata } = await superLeagueApi.get(
    `${season}/metadata.json`
  )

  let data: LeagueEvent = {
    users: [],
    levels: []
  }

  try {
    const response = await superLeagueApi.get(`${season}/${event}.json`)
    if (response.headers['Content-Type'] === 'application/json') {
      data = response.data
    }
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 404) {
      console.warn(`Event ${event} not found`)
    } else {
      console.error(error)
    }
  }

  const toTitleCase = (string: string) =>
    string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
</script>

<template>
  <h1>
    {{ toTitleCase(season.replace('-', ' ')) }} /
    {{ metadata[event]?.name ?? metadata[event]?.theme }}
  </h1>
  <section>
    <h2>Event Standings</h2>
    <standings-list v-if="data.users.length > 0" :users="data.users" />
    <p v-else>
      Event starts {{ formatRelativeDate(date) }} ({{
        Intl.DateTimeFormat().format(new Date(date))
      }})
    </p>
  </section>
  <debug-code :data="data" />
</template>
