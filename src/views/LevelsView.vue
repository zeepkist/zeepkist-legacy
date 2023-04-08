<script setup lang="ts">
  import LevelsLayout from '~/components/layouts/LevelsLayout.vue'
  import LoadingIndicator from '~/components/LoadingIndicator.vue'
</script>

<template>
  <h1>Workshop Levels</h1>
  <suspense>
    <levels-layout />
    <template #fallback>
      <loading-indicator />
    </template>
  </suspense>
</template>
