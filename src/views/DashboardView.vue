<script setup lang="ts">
  import { useSeoMeta } from '@unhead/vue'

  import DashboardLayout from '~/components/layouts/DashboardLayout.vue'
  import LoadingIndicator from '~/components/LoadingIndicator.vue'
  import DownloadLoginSheet from '~/components/sheets/DownloadLoginSheet.vue'

  const title = 'Zeepkist Records'
  const description = `The ultimate platform for Zeepkist racing fans!

Track records, view player stats, create/join tournaments and view Super League event results!`
  const url = window.location.href.split('?')[0]
  const image = '/banner.webp'

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogUrl: url,
    ogImage: image,
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
    twitterCard: 'summary_large_image'
  })
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
