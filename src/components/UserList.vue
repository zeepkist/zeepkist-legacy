<script setup lang="ts">
  import type { UserRankings } from '@zeepkist/gtr-api'

  import UserRow from '@/components/UserRow.vue'

  const { users } = defineProps<{
    users: UserRankings[]
  }>()
</script>

<template>
  <div class="users">
    <user-row
      v-for="rank in users"
      :key="rank.user.steamId"
      :user="rank.user"
      :rank="rank.position"
      :world-records="rank.amountOfWorldRecords" />
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
