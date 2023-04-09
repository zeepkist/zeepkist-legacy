<script setup lang="ts">
  import AdventureLayout from '~/components/layouts/AdventureLayout.vue'
  import LoadingIndicator from '~/components/LoadingIndicator.vue'
  import ContentSheet from '~/components/sheets/ContentSheet.vue'
</script>

<template>
  <content-sheet>
    <h1>Adventure Mode Levels</h1>
    <suspense>
      <adventure-layout />
      <template #fallback>
        <loading-indicator />
      </template>
    </suspense>
  </content-sheet>
</template>
