<script setup lang="ts">
  import { ref } from 'vue'

  import { getUser } from '@/services/users'

  const data = ref(await getUser({ id: 1 }))
</script>

<template>
  <div class="about">
    <h1>This is a user page</h1>
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
