<script setup lang="ts">
  import { ref } from 'vue'

  import DebugCode from '@/components/DebugCode.vue'
  import LevelList from '@/components/LevelList.vue'
  import { getLevels } from '@/services/levels'

  const levels = ref(await getLevels({ Limit: 50 }))
</script>

<template>
  <h1>Workshop Levels</h1>
  <p>{{ levels.totalAmount }} levels</p>
  <level-list header="Recent Levels" :levels="levels.levels" />
  <debug-code :data="levels" />
</template>
