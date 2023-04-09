<script setup lang="ts">
  import UsersLayout from '~/components/layouts/UsersLayout.vue'
  import LoadingIndicator from '~/components/LoadingIndicator.vue'
  import ContentSheet from '~/components/sheets/ContentSheet.vue'
</script>

<template>
  <content-sheet>
    <h1>Users</h1>
    <suspense>
      <users-layout />
      <template #fallback>
        <loading-indicator />
      </template>
    </suspense>
  </content-sheet>
</template>
