<script setup lang="ts">
  import { useSeoMeta } from '@unhead/vue'
  import { useRoute } from 'vue-router'

  import LevelsLayout from '~/components/layouts/LevelsLayout.vue'
  import LoadingIndicator from '~/components/LoadingIndicator.vue'
  import ContentSheet from '~/components/sheets/ContentSheet.vue'

  const route = useRoute()
  const id = String(route.params.id)

  const title = 'Workshop Levels・Zeepkist Records'
  const description =
    'Check out the levels in this workshop item on Zeepkist Records, the ultimate platform for Zeepkist racing fans!'
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
    <h1>Levels in {{ id }}</h1>
    <suspense>
      <levels-layout :workshop-id="id" />
      <template #fallback>
        <loading-indicator />
      </template>
    </suspense>
  </content-sheet>
</template>
