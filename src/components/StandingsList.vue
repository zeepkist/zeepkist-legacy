<script setup lang="ts">
  import ColumnLayout from '~/components/ColumnLayout.vue'
  import StandingsRow from '~/components/StandingsRow.vue'
  import type { Standing } from '~/models/superLeague'

  const { users, isSeasonStandings } = defineProps<{
    users: Standing[]
    isSeasonStandings?: boolean
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
        :key="user.steamId"
        :user="user"
        :position="position(index)"
        :is-season-standings="isSeasonStandings" />
    </template>
    <template #center>
      <standings-row
        v-for="(user, index) in column2"
        :key="user.steamId"
        :user="user"
        :position="position(index, 1)"
        :is-season-standings="isSeasonStandings" />
    </template>
    <template #right>
      <standings-row
        v-for="(user, index) in column3"
        :key="user.steamId"
        :user="user"
        :position="position(index, 2)"
        :is-season-standings="isSeasonStandings" />
    </template>
  </column-layout>
</template>
