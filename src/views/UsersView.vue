<script setup lang="ts">
  import { ref } from 'vue'
</script>

<template>
  <div class="about">
    <h1>This is a users page</h1>
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
