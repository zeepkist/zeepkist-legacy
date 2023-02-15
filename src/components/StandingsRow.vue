<script setup lang="ts">
  import { RouterLink } from 'vue-router'

  import type { LeagueUser } from '@/models/league'

  const { user, position } = defineProps<{
    user: LeagueUser
    position: number
  }>()

  const steamId = user[0]
  const username = user[1].username
  const totalPoints = user[1].totalPoints
</script>

<template>
  <div :class="$style.row">
    <span>{{ position }}</span>
    <router-link :to="{ name: 'user', params: { steamId } }">{{
      username
    }}</router-link>
    <span>
      {{ totalPoints }}
      <small>pts</small>
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
</style>
