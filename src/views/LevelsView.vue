<script setup lang="ts">
  import { useSeoMeta } from '@unhead/vue'
  import { ref } from 'vue'

  import LevelsLayout from '~/components/layouts/LevelsLayout.vue'
  import LoadingIndicator from '~/components/LoadingIndicator.vue'
  import ContentSheet from '~/components/sheets/ContentSheet.vue'

  const query = ref({ query: '' })

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
    <h1 :class="$style.searchContainer">
      <span>Workshop Levels</span>
      <input
        v-model.lazy="query.query"
        :class="$style.search"
        placeholder="Search for level or author" />
    </h1>
    <suspense>
      <levels-layout :query="query" />
      <template #fallback>
        <loading-indicator />
      </template>
    </suspense>
  </content-sheet>
</template>

<style module lang="less">
  .searchContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .search {
    width: 50%;
    max-width: 300px;
    margin-left: 1rem;
    font-size: 1rem;
    background: var(--color-bg-1);
    border: none;
    border-radius: 999rem;
    padding: 0 1rem;
    color: var(--color-text-1);
  }
</style>
