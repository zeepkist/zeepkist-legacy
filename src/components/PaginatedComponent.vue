<script setup lang="ts">
  import { ref } from 'vue'

  const {
    totalItems,
    currentPage = 1,
    itemsPerPage = 10
  } = defineProps<{
    currentPage?: number
    totalItems: number
    itemsPerPage?: number
  }>()

  const totalPages = ref(Math.ceil(totalItems / itemsPerPage))

  const emit = defineEmits<{
    (event: 'page-changed', page: number): void
  }>()
</script>

<template>
  <slot />
  <div v-if="totalItems > itemsPerPage" class="pagination">
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <div class="pagination-actions">
      <button
        :disabled="currentPage == 1"
        title="First"
        @click="emit('page-changed', 1)">
        ⏮
      </button>
      <button
        :disabled="currentPage === 1"
        title="Previous"
        @click="emit('page-changed', currentPage - 1)">
        ⏴
      </button>
      <button
        :disabled="currentPage === totalPages"
        title="Next"
        @click="emit('page-changed', currentPage + 1)">
        ⏵
      </button>
      <button
        :disabled="currentPage === totalPages"
        title="Last"
        @click="emit('page-changed', totalPages)">
        ⏭
      </button>
    </div>
  </div>
</template>

<style scoped lang="less">
  .pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;

    &-actions {
      display: flex;
      gap: 0.5rem;

      button {
        font-size: 1rem;
        padding: 0.25rem 0.75rem;
        border: none;
        border-radius: var(--border-radius-medium);
        background: none;
        color: rgb(var(--link-6));
        cursor: pointer;

        &:disabled {
          color: var(--color-text-4);
          cursor: not-allowed;
        }

        &:hover:not(:disabled) {
          color: rgb(var(--link-10));
        }
      }
    }
  }
</style>
