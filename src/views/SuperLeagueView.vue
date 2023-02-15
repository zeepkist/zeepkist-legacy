<script setup lang="ts">
  import { ref } from 'vue'
  import { RouterLink } from 'vue-router'

  import DebugCode from '@/components/DebugCode.vue'
  import StandingsList from '@/components/StandingsList.vue'
  import type { LeagueStanding, LeagueUser } from '@/models/league'
  import { superLeagueApi } from '@/services/api'

  interface EventMetadata {
    name: string
    workshopId: string
  }

  interface SeasonMetadata {
    [key: string]: EventMetadata
  }

  type Metadata = [string, SeasonMetadata]

  interface LeagueSeasonStanding {
    [key: string]: LeagueUser[]
  }

  const { data }: { data: Metadata[] } = await superLeagueApi.get(
    'metadata.json'
  )

  const standings = ref<LeagueSeasonStanding>({})

  const getStandings = async (season: string) => {
    try {
      const response = await superLeagueApi.get(`${season}/standings.json`)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  for (const [season] of data) {
    const standingsData: LeagueStanding[] = await getStandings(season)
    standings.value[season] = standingsData.map(standing => {
      const steamId = standing.steamId
      return [steamId, standing]
    })
  }

  const toTitleCase = (string: string) =>
    string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()

  const formatTitle = (string: string) => toTitleCase(string.replace('-', ' '))
</script>

<template>
  <h1>Super League</h1>
  <section v-for="[season, events] in data" :key="season">
    <h2>{{ formatTitle(season) }} Events</h2>
    <div :class="$style.cardContainer">
      <div
        v-for="[eventName, event] in Object.entries(events)"
        :key="eventName"
        :class="$style.card">
        <h3>{{ event.name }}</h3>
        <router-link
          :to="{
            name: 'super-league-event',
            params: { season, event: eventName }
          }"
          >View event</router-link
        >
        <!--
        <a
          :href="`https://steamcommunity.com/workshop/filedetails/?id=${event.workshopId}`"
          rel="noopener noreferrer"
          target="_blank"
          >Subscribe to levels</a
        >
        -->
      </div>
    </div>
    <h2>{{ formatTitle(season) }} Standings</h2>
    <standings-list :users="standings[season]" />
  </section>
  <debug-code :data="data" />
</template>

<style module lang="less">
  .cardContainer {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 1rem;
  }

  .card {
    background-color: var(--color-background-mute);
    border-radius: 0.5rem;
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
    padding: 1rem;

    a {
      display: block;
      margin-top: 0.5rem;
      padding: 0.5rem 0;
    }
  }
</style>
