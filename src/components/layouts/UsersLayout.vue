<script setup lang="ts">
  import { getUserRankings, type UserRankingsResponse } from '@zeepkist/gtr-api'
  import { ref } from 'vue'

  import ColumnLayout from '~/components/ColumnLayout.vue'
  import PaginatedComponent from '~/components/PaginatedComponent.vue'
  import UserList from '~/components/UserList.vue'

  const itemsPerPage = 20

  const rankings = ref<UserRankingsResponse>()
  const currentPage = ref(1)

  const handlePageChanged = async (page: number) => {
    rankings.value = await getUserRankings({
      Limit: itemsPerPage,
      Offset: (page - 1) * itemsPerPage
    })
    currentPage.value = page
  }

  await handlePageChanged(1)
</script>

<template>
  <template v-if="rankings">
    <p>{{ rankings.totalAmount }} users</p>
    <paginated-component
      :current-page="currentPage"
      :items-per-page="itemsPerPage"
      :total-items="rankings.totalAmount"
      @page-changed="handlePageChanged">
      <column-layout>
        <template #left>
          <user-list :users="rankings.rankings.slice(0, 10)" />
        </template>
        <template #right>
          <user-list :users="rankings.rankings.slice(10)" />
        </template>
      </column-layout>
    </paginated-component>
  </template>
</template>
