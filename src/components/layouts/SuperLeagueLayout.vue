<script setup lang="ts">
  import { RouterLink } from 'vue-router'

  import { getSeasons } from '~/services/superLeague'

  const seasons = await getSeasons()

  const toTitleCase = (string: string) =>
    string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()

  const formatTitle = (string: string) => toTitleCase(string.replace('-', ' '))
</script>

<template>
  <section v-for="[season, events] in seasons" :key="season">
    <h2>{{ formatTitle(season) }}</h2>
    <div v-if="events.events" :class="$style.cardContainer">
      <div :class="$style.card">
        <h3>Season Standings</h3>
        <router-link
          :to="{
            name: 'super-league-standings',
            params: { season }
          }"
          >View standings</router-link
        >
      </div>
      <div
        v-for="[eventName, event] in Object.entries(events.events)"
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
      </div>
    </div>
  </section>
</template>

<style module lang="less">
  .cardContainer {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 1rem;
  }

  .card {
    background: var(--color-bg-1);
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
