<script setup lang="ts">
  import { ref } from 'vue'

  const {
    totalItems,
    currentPage = 1,
    itemsPerPage = 15
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
      <button :disabled="currentPage == 1" @click="emit('page-changed', 1)">
        First
      </button>
      <button
        :disabled="currentPage === 1"
        @click="emit('page-changed', currentPage - 1)">
        Previous
      </button>
      <button
        :disabled="currentPage === totalPages"
        @click="emit('page-changed', currentPage + 1)">
        Next
      </button>
      <button
        :disabled="currentPage === totalPages"
        @click="emit('page-changed', totalPages)">
        Last
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
        border-radius: var(--border-radius);
        background: var(--color-button-hover);
        color: var(--color-text-inverted);
        cursor: pointer;

        &:disabled {
          background: var(--color-background-mute);
          color: var(--color-text-mute);
          cursor: not-allowed;
        }

        &:hover:not(:disabled) {
          background: var(--color-hover);
        }
      }
    }
  }
</style>
