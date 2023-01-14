<script setup lang="ts">
  import { ref } from 'vue'

  import DebugCode from '@/components/DebugCode.vue'
  import { getRecords } from '@/services/records'

  const levelData = ref(await getRecords())
</script>

<template>
  <div class="about">
    <h1>This is an adventure mode levels page</h1>
    <p>{{ levelData.totalAmount }} levels</p>
    <debug-code :data="levelData" />
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
