<script setup lang="ts">
  import { getUserRankings } from '@zeepkist/gtr-api'
  import { ref } from 'vue'

  import ColumnLayout from '@/components/ColumnLayout.vue'
  import DebugCode from '@/components/DebugCode.vue'
  import PaginatedComponent from '@/components/PaginatedComponent.vue'
  import UserList from '@/components/UserList.vue'

  const itemsPerPage = 20

  const rankings = ref(await getUserRankings({ Limit: itemsPerPage }))

  const handlePageChanged = async (page: number) => {
    rankings.value = await getUserRankings({
      Limit: itemsPerPage,
      Offset: (page - 1) * itemsPerPage
    })
    currentPage.value = page
  }

  const currentPage = ref(1)
</script>

<template>
  <h1>Users</h1>
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
  <debug-code :data="rankings" />
</template>
