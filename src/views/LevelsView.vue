<script setup lang="ts">
  import { ref } from 'vue'

  import DebugCode from '@/components/DebugCode.vue'
  import LevelList from '@/components/LevelList.vue'
  import PaginatedComponent from '@/components/PaginatedComponent.vue'
  import { getLevels } from '@/services/levels'

  const itemsPerPage = 40

  const levels = ref(await getLevels({ Limit: itemsPerPage }))
  const currentPage = ref(1)

  const handlePageChanged = async (page: number) => {
    currentPage.value = page
    levels.value = await getLevels({
      Limit: itemsPerPage,
      Offset: (page - 1) * itemsPerPage
    })
  }
</script>

<template>
  <h1>Workshop Levels</h1>
  <p>{{ levels.totalAmount }} levels</p>
  <paginated-component
    :current-page="currentPage"
    :items-per-page="itemsPerPage"
    :total-items="levels.totalAmount"
    @page-changed="handlePageChanged">
    <level-list
      :levels="levels.levels.filter(level => level.workshopId !== '0')" />
  </paginated-component>
  <debug-code :data="levels" />
</template>
