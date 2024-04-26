<script setup lang="ts">
  import { RouterLink } from 'vue-router'

  import UserBadge from '~/components/UserBadge.vue'
  import type { Standing } from '~/models/superLeague'
  import { useAuthenticationStore } from '~/stores/authentication'

  const {
    user,
    position,
    isSeasonStandings = false
  } = defineProps<{
    user: Standing
    position: number
    isSeasonStandings?: boolean
  }>()

  const authenticationStore = useAuthenticationStore()

  const steamId = user.steamId
  const points = isSeasonStandings
    ? Math.trunc(user.totalPoints / 10)
    : user.totalPoints
</script>

<template>
  <div
    :class="[
      $style.row,
      { [$style.isCurrentUser]: steamId === authenticationStore.SteamId }
    ]">
    <span>{{ position }}</span>
    <router-link :to="{ name: 'user', params: { steamId } }">
      <user-badge :username="user.username" :team="user.team" />
    </router-link>
    <span>
      <span :class="$style.points" :title="`${points} league points`">
        {{ points }} ✦
      </span>
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
      background: var(--color-bg-1);
    }

    &.isCurrentUser {
      border: 1px solid rgb(var(--link-6));
      border-radius: var(--border-radius-large);
    }

    span {
      text-align: right;
    }
  }

  .points {
    font-weight: 600;
  }
</style>
