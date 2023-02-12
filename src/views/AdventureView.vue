<script setup lang="ts">
  import { ref } from 'vue'

  import DebugCode from '@/components/DebugCode.vue'
  import LevelList from '@/components/LevelList.vue'
  import { getLevels } from '@/services/levels'

  const levels = ref(await getLevels({ WorkshopId: 0 }))
</script>

<template>
  <div class="about">
    <h1>Adventure Mode Levels</h1>
    <p>{{ levels.totalAmount }} levels</p>
    <level-list
      :levels="levels.levels.sort((a, b) => a.name.localeCompare(b.name))" />
    <debug-code :data="levels" />
  </div>
</template>

<style scoped lang="less">
  @media (min-width: 1024px) {
    .about {
      display: flex;
      flex-direction: column;
    }
  }
</style>
