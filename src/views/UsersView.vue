<script setup lang="ts">
  import { ref } from 'vue'

  import DebugCode from '@/components/DebugCode.vue'
  import PaginatedComponent from '@/components/PaginatedComponent.vue'
  import UserList from '@/components/UserList.vue'
  import { getUsers } from '@/services/users'

  const itemsPerPage = 15

  const users = ref(await getUsers({ Limit: itemsPerPage }))

  const handlePageChanged = async (page: number) => {
    users.value = await getUsers({
      Limit: itemsPerPage,
      Offset: (page - 1) * itemsPerPage
    })
  }
</script>

<template>
  <h1>Users</h1>
  <p>{{ users.totalAmount }} users</p>
  <paginated-component
    :items-per-page="itemsPerPage"
    :total-items="users.totalAmount"
    @page-changed="handlePageChanged">
    <user-list :users="users.users" />
  </paginated-component>
  <debug-code :data="users" />
</template>
