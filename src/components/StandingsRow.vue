<script setup lang="ts">
  import { RouterLink } from 'vue-router'

  import UserBadge from '~/components/UserBadge.vue'
  import type { Standing } from '~/models/superLeague'

  const {
    user,
    position,
    isSeasonStandings = false
  } = defineProps<{
    user: Standing
    position: number
    isSeasonStandings?: boolean
  }>()

  const steamId = user.steamId
  const points = isSeasonStandings
    ? Math.round(user.totalPoints * 100)
    : user.totalPoints
</script>

<template>
  <div :class="$style.row">
    <span>{{ position }}</span>
    <router-link :to="{ name: 'user', params: { steamId } }">
      <user-badge :username="user.username" :team="user.team" />
    </router-link>
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
      background: var(--zk-background-1);
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
