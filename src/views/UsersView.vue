<script setup lang="ts">
  import UsersLayout from '~/components/layouts/UsersLayout.vue'
  import LoadingIndicator from '~/components/LoadingIndicator.vue'
</script>

<template>
  <h1>Users</h1>
  <suspense>
    <users-layout />
    <template #fallback>
      <loading-indicator />
    </template>
  </suspense>
</template>
