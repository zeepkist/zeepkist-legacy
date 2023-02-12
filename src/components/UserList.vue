<script setup lang="ts">
  import UserRow from '@/components/UserRow.vue'
  import type { User } from '@/models/user'

  const { users } = defineProps<{
    users: User[]
  }>()
</script>

<template>
  <div class="users">
    <user-row v-for="user in users" :key="user.steamId" :user="user" />
  </div>
</template>

<style scoped lang="less">
  .levels {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
  }
</style>
