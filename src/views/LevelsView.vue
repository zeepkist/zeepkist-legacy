<script setup lang="ts">
  import { ref } from 'vue'

  import { getRecords } from '@/services/records'

  const data = ref(await getRecords())
</script>

<template>
  <div class="about">
    <h1>This is a levels page</h1>
    <code>
      {{ data }}
    </code>
  </div>
</template>

<style scoped lang="less">
  @media (min-width: 1024px) {
    .about {
      display: flex;
      flex-direction: column;
    }

    code {
      white-space: pre;
    }
  }
</style>
