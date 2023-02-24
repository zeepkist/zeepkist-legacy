<script setup lang="ts">
  import { HTTPError } from 'ky'
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'

  import DebugCode from '@/components/DebugCode.vue'
  import StandingsList from '@/components/StandingsList.vue'
  import type { SeasonEvent } from '@/models/superLeague'
  import { getEvent } from '@/services/superLeague'
  import { formatRelativeDate } from '@/utils'

  const route = useRoute()

  const season = route.params.season as string
  const event = route.params.event as string
  const date = `${event}T18:00:00.000Z`

  const data = ref<SeasonEvent | undefined>()

  try {
    data.value = await getEvent(season, event)
  } catch (error) {
    if (error instanceof HTTPError && error.response?.status === 404) {
      data.value = undefined
    } else {
      console.error(error)
    }
  }

  const toTitleCase = (string: string) =>
    string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
</script>

<template>
  <h2>{{ toTitleCase(event) }} Standings</h2>
  <section>
    <standings-list
      v-if="data && data.users.length > 0"
      :key="event"
      :users="data.users" />
    <p v-else>
      Event starts {{ formatRelativeDate(date) }} ({{
        Intl.DateTimeFormat().format(new Date(date))
      }})
    </p>
  </section>
  <debug-code :data="data" />
</template>
