<script setup lang="ts">
  import { getLevels } from '@zeepkist/gtr-api'
  import { ref } from 'vue'

  import LevelList from '~/components/LevelList.vue'

  const levels = ref(await getLevels({ WorkshopId: '0' }))
</script>

<template>
  <p>{{ levels.totalAmount }} levels</p>
  <level-list
    :levels="levels.levels.sort((a, b) => a.name.localeCompare(b.name))"
    hide-level-thumbnail />
</template>
