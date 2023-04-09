<script setup lang="ts">
  import SuperLeagueLayout from '~/components/layouts/SuperLeagueLayout.vue'
  import LoadingIndicator from '~/components/LoadingIndicator.vue'
  import ContentSheet from '~/components/sheets/ContentSheet.vue'
</script>

<template>
  <content-sheet>
    <h1>Super League</h1>
    <suspense>
      <super-league-layout />
      <template #fallback>
        <loading-indicator />
      </template>
    </suspense>
  </content-sheet>
</template>
