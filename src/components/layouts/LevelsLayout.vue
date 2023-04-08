<script setup lang="ts">
  import { getLevels, type LevelsResponse } from '@zeepkist/gtr-api'
  import { ref } from 'vue'

  import LevelList from '~/components/LevelList.vue'
  import PaginatedComponent from '~/components/PaginatedComponent.vue'

  const itemsPerPage = 40

  const levels = ref<LevelsResponse>()
  const currentPage = ref(1)

  const handlePageChanged = async (page: number) => {
    levels.value = await getLevels({
      Limit: itemsPerPage,
      Offset: (page - 1) * itemsPerPage,
      Sort: '-id'
    })
    currentPage.value = page
  }

  await handlePageChanged(1)
</script>

<template>
  <template v-if="levels">
    <p>{{ levels.totalAmount }} levels</p>
    <paginated-component
      :current-page="currentPage"
      :items-per-page="itemsPerPage"
      :total-items="levels.totalAmount"
      @page-changed="handlePageChanged">
      <level-list
        :levels="levels.levels.filter(level => level.workshopId !== '0')" />
    </paginated-component>
  </template>
</template>
