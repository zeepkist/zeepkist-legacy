<script setup lang="ts">
  import { HTTPError } from 'ky'
  import { useRoute, useRouter } from 'vue-router'

  import type { MetadataEvent, MetadataEvents } from '~/models/superLeague'
  import { getSeason } from '~/services/superLeague'

  const route = useRoute()
  const router = useRouter()

  const season = route.params.season as string

  let metadata: MetadataEvents
  try {
    metadata = await getSeason(season)
  } catch (error) {
    if (error instanceof HTTPError && error.response?.status === 404) {
      console.warn(`Season ${season} not found, redirecting to Super League`)
      router.push({ name: 'super-league' })
    } else {
      console.error(error)
    }
  }

  const getActiveEventName = (event: string) =>
    (metadata?.events[event] as unknown as MetadataEvent)?.name
</script>

<template>
  <nav v-if="metadata" :class="$style.navigation">
    <router-link :to="{ name: 'super-league-standings', params: { season } }">
      Season Standings
    </router-link>
    <router-link
      v-for="[path, event] in Object.entries(metadata.events)"
      :key="path"
      :to="{
        name: 'super-league-event',
        params: { season, event: path }
      }"
      >{{ event.name }}</router-link
    >
  </nav>
  <router-view
    :key="route.params"
    :event-name="getActiveEventName(route.params.event as string)" />
</template>

<style module lang="less">
  .navigation {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 1rem;

    a:global {
      padding: 0.25rem 0.5rem;
      background: var(--color-bg-1);
      color: rgb(var(--color-text-1));
    }

    a:hover:global,
    a:global.router-link-exact-active {
      background: var(--color-bg-1);
      color: rgb(var(--primary-6));
      border-radius: var(--border-radius-medium);
    }
  }
</style>
