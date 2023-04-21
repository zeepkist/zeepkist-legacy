<script setup lang="ts">
  import type { User } from '@zeepkist/gtr-api'
  import { RouterLink } from 'vue-router'

  import UserBadge from '~/components/UserBadge.vue'

  const { user, rank, worldRecords } = defineProps<{
    user: User
    rank: number
    worldRecords: number
  }>()
</script>

<template>
  <div class="user">
    <div v-if="rank" class="rank">{{ rank }}</div>
    <div>
      <router-link :to="{ name: 'user', params: { steamId: user.steamId } }">
        <user-badge :username="user.steamName" />
      </router-link>
    </div>
    <div class="records">
      <strong>{{ worldRecords }}</strong> World Records
    </div>
  </div>
</template>

<style scoped lang="less">
  .user {
    display: grid;
    grid-template-columns: 3ch repeat(2, 1fr);
    grid-auto-rows: 50px;
    gap: 1rem;
    align-items: center;
    padding: 0.25rem 1.25rem 0.25rem 0;

    &:nth-of-type(even) {
      background: var(--zk-background-1);
    }

    .rank {
      text-align: right;
      font-family: monospace;
    }

    strong {
      font-weight: 600;
    }

    .records {
      text-align: right;
    }
  }
</style>
