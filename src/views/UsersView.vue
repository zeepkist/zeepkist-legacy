<script setup lang="ts">
  import { ref } from 'vue'

  import DebugCode from '@/components/DebugCode.vue'
  import PaginatedComponent from '@/components/PaginatedComponent.vue'
  import UserList from '@/components/UserList.vue'
  import { getUserRankings } from '@/services/users'

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
    <user-list :users="rankings.rankings" />
  </paginated-component>
  <debug-code :data="rankings" />
</template>
