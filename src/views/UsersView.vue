<script setup lang="ts">
  import { useSeoMeta } from '@vueuse/head'

  import UsersLayout from '~/components/layouts/UsersLayout.vue'
  import LoadingIndicator from '~/components/LoadingIndicator.vue'
  import ContentSheet from '~/components/sheets/ContentSheet.vue'

  const title = 'Users・Zeepkist Records'
  const description =
    'Discover the players with the most World Records on Zeepkist Records, the ultimate platform for Zeepkist racing fans!'
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
    <h1>Users</h1>
    <suspense>
      <users-layout />
      <template #fallback>
        <loading-indicator />
      </template>
    </suspense>
  </content-sheet>
</template>
