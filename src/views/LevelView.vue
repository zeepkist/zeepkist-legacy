<script setup lang="ts">
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'

  import DebugCode from '@/components/DebugCode.vue'
  import { getRecords } from '@/services/records'

  const route = useRoute()
  const levelId = route.params.levelId as string

  const recordData = ref(await getRecords({ LevelId: levelId }))
</script>

<template>
  <div class="about">
    <h1>This is a level page</h1>
    <p>{{ recordData.totalAmount }} levels</p>
    <debug-code :data="recordData.records" />
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
