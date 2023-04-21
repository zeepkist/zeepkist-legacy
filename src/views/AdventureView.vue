<script setup lang="ts">
  import { useSeoMeta } from '@unhead/vue'

  import AdventureLayout from '~/components/layouts/AdventureLayout.vue'
  import LoadingIndicator from '~/components/LoadingIndicator.vue'
  import ContentSheet from '~/components/sheets/ContentSheet.vue'

  const title = 'Adventure Mode Levels・Zeepkist Records'
  const description =
    'Check out the latest levels in Adventure Mode on Zeepkist Records, the ultimate platform for Zeepkist racing fans!'
  const url = window.location.href.split('?')[0]

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogUrl: url,
    twitterTitle: title,
    twitterDescription: description
  })
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
