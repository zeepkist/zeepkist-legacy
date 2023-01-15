<script setup lang="ts">
  import { IS_DEV } from '@/configs'

  const { data } = defineProps<{
    data: unknown
  }>()

  const isArray = Array.isArray(data)
</script>

<template>
  <div v-if="IS_DEV && isArray">
    <code v-for="item in data" :key="String(item)">
      {{ item }}
    </code>
  </div>
  <code v-else-if="IS_DEV">{{ data }}</code>
</template>

<style scoped lang="less">
  code {
    padding: 1rem 0;
    white-space: pre;
    display: block;
  }

  code:nth-of-type(even) {
    color: var(--zeepkist-yellow);
  }
</style>
