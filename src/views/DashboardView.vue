<script setup lang="ts">
  import DashboardLayout from '~/components/layouts/DashboardLayout.vue'
  import LoadingIndicator from '~/components/LoadingIndicator.vue'
  import DownloadLoginSheet from '~/components/sheets/DownloadLoginSheet.vue'
</script>

<template>
  <download-login-sheet />
  <suspense>
    <dashboard-layout />
    <template #fallback>
      <loading-indicator />
    </template>
  </suspense>
</template>
