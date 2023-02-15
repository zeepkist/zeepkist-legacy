<script setup lang="ts">
  import ColumnLayout from '@/components/ColumnLayout.vue'
  import StandingsRow from '@/components/StandingsRow.vue'
  import type { LeagueUser } from '@/models/league'

  const { users } = defineProps<{
    users: LeagueUser[]
  }>()

  const offset = Math.ceil(users.length / 3)

  const column1 = users.slice(0, offset)
  const column2 = users.slice(offset, offset * 2)
  const column3 = users.slice(offset * 2)

  const position = (index: number, column = 0) => {
    return index + offset * column + 1
  }
</script>

<template>
  <column-layout>
    <template #left>
      <standings-row
        v-for="(user, index) in column1"
        :key="user[0]"
        :user="user"
        :position="position(index)" />
    </template>
    <template #center>
      <standings-row
        v-for="(user, index) in column2"
        :key="user[0]"
        :user="user"
        :position="position(index, 1)" />
    </template>
    <template #right>
      <standings-row
        v-for="(user, index) in column3"
        :key="user[0]"
        :user="user"
        :position="position(index, 2)" />
    </template>
  </column-layout>
</template>
