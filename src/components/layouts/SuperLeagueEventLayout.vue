<script setup lang="ts">
  import { useSeoMeta } from '@unhead/vue'
  import { zonedTimeToUtc } from 'date-fns-tz'
  import { HTTPError } from 'ky'
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'

  import DebugCode from '~/components/DebugCode.vue'
  import StandingsList from '~/components/StandingsList.vue'
  import type { SeasonEvent } from '~/models/superLeague'
  import { getEvent } from '~/services/superLeague'
  import { formatParamToTitleCase, formatRelativeDate } from '~/utils'

  const { eventName } = defineProps<{
    eventName: string
  }>()

  const route = useRoute()

  const season = route.params.season as string
  const event = route.params.event as string
  const date = zonedTimeToUtc(
    `${event}T18:00:00.000`,
    'Europe/London'
  ).getTime()

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

  const seasonTitle = formatParamToTitleCase(season)
  const title = `${eventName} Super League Standings・Zeepkist Records`
  const description = `Check out the ${eventName} tournament standings from ${seasonTitle}'s Super League on Zeepkist Records, the ultimate platform for Zeepkist racing fans!`
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
  <h2>{{ eventName }} Standings ({{ event }})</h2>
  <section>
    <standings-list
      v-if="data && data.users.length > 0"
      :key="event"
      :users="data.users" />
    <p v-else>
      Event starts {{ formatRelativeDate(new Date(date).toISOString()) }} ({{
        Intl.DateTimeFormat().format(date)
      }})
    </p>
  </section>
  <debug-code :data="data" />
</template>
