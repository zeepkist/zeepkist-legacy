<script setup lang="ts">
  import { RouterLink } from 'vue-router'

  import type { LeagueUser } from '@/models/league'

  const {
    user,
    position,
    isSeasonStandings = false
  } = defineProps<{
    user: LeagueUser
    position: number
    isSeasonStandings?: boolean
  }>()

  const steamId = user[0]
  const username = user[1].username
  const points = isSeasonStandings
    ? Math.round(user[1].totalPoints * 100)
    : user[1].totalPoints
</script>

<template>
  <div :class="$style.row">
    <span>{{ position }}</span>
    <router-link :to="{ name: 'user', params: { steamId } }">{{
      username
    }}</router-link>
    <span>
      <span :class="$style.points">{{ points }}</span>
      <small :class="$style.pointsLabel">pts</small>
    </span>
  </div>
</template>

<style module lang="less">
  .row {
    display: grid;
    grid-template-columns: 3ch 1fr 8ch;
    grid-gap: 1rem;
    align-items: center;
    padding: 0.5rem 1rem 0.5rem 0.25rem;

    &:nth-child(even) {
      background-color: var(--color-background-page);
    }

    span {
      text-align: right;
    }
  }

  .points {
    font-weight: 600;
  }

  .pointsLabel {
    padding-left: 0.5ch;
  }
</style>
