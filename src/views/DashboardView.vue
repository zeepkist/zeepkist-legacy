<script setup lang="ts">
  import DashboardLayout from '@/components/layouts/DashboardLayout.vue'
  import LoadingIndicator from '@/components/LoadingIndicator.vue'
</script>

<template>
  <h1>Zeepkist Records</h1>
  <suspense>
    <dashboard-layout />
    <template #fallback>
      <loading-indicator />
    </template>
  </suspense>
</template>
