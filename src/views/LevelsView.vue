<script setup lang="ts">
  import { useSeoMeta } from '@vueuse/head'

  import LevelsLayout from '~/components/layouts/LevelsLayout.vue'
  import LoadingIndicator from '~/components/LoadingIndicator.vue'
  import ContentSheet from '~/components/sheets/ContentSheet.vue'

  const title = 'Workshop Levels・Zeepkist Records'
  const description =
    'Check out the latest levels in the Workshop on Zeepkist Records, the ultimate platform for Zeepkist racing fans!'
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
    <h1>Workshop Levels</h1>
    <suspense>
      <levels-layout />
      <template #fallback>
        <loading-indicator />
      </template>
    </suspense>
  </content-sheet>
</template>
