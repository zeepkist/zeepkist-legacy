<script setup lang="ts">
  import { ref } from 'vue'

  import { getRecords } from '@/services/records'

  const recordData = ref(await getRecords())
</script>

<template>
  <div class="about">
    <h1>This is a levels page</h1>
    <p>{{ recordData.totalAmount }} levels</p>
    <code v-for="record in recordData.records" :key="record.screenshotUrl">
      {{ record }}
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
      padding: 1rem 0;
    }

    code:nth-of-type(even) {
      background: var(--color-text);
      color: var(--color-text-inverted);
    }
  }
</style>
