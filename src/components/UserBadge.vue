<script setup lang="ts">
  import { formatUser } from '~/utils'

  const { username, team } = defineProps<{
    username: string
    team?: string
  }>()

  const formattedUser = formatUser(username, team)
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.user">
      <div v-if="formattedUser.team" :class="$style.team">
        [{{ formattedUser.team }}]
      </div>
      <div>{{ formattedUser.username }}</div>
    </div>
  </div>
</template>

<style module lang="less">
  .container {
    display: inline-block;
  }

  .user {
    display: flex;
    align-items: center;
  }

  .team {
    font-size: 0.8em;
    font-weight: 800;
    vertical-align: middle;
    border-radius: var(--zk-border-radius-medium);
    margin-right: 0.5ch;
  }
</style>
