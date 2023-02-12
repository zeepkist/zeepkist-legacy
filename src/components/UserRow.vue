<script setup lang="ts">
  import { RouterLink } from 'vue-router'

  import type { User } from '@/models/user'

  const { user } = defineProps<{
    user: User
  }>()
</script>

<template>
  <div class="user">
    <div>
      <router-link :to="{ name: 'user', params: { steamId: user.steamId } }">
        {{ user.steamName }}
      </router-link>
    </div>
  </div>
</template>

<style scoped lang="less">
  .user {
    display: grid;
    grid-template-columns: 80px 2fr repeat(5, 1fr) 80px;
    grid-auto-rows: 50px;
    gap: 1rem;
    align-items: center;
    padding: 0.25rem;
    padding-left: 0;

    &:nth-of-type(even) {
      background: var(--color-background-mute);
    }
  }
</style>
