<script setup lang="ts">
  import { ref } from 'vue'

  import DebugCode from '@/components/DebugCode.vue'
  import { getRecords } from '@/services/records'

  const recordData = ref(await getRecords())
</script>

<template>
  <div class="about">
    <h1>This is a dashboard page</h1>
    <p>{{ recordData.totalAmount }} levels</p>
    <debug-code :data="recordData" />
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
