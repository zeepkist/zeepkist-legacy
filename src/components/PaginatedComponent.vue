<script setup lang="ts">
  import {
    IconPlayerSkipBackFilled,
    IconPlayerSkipForwardFilled,
    IconPlayerTrackNextFilled,
    IconPlayerTrackPrevFilled
  } from '@tabler/icons-vue'
  import { ref } from 'vue'

  import LoadingIndicator from '~/components/LoadingIndicator.vue'

  const {
    totalItems,
    currentPage = 1,
    itemsPerPage = 10,
    disabledPagination = false,
    isLoading = false
  } = defineProps<{
    currentPage?: number
    totalItems: number
    itemsPerPage?: number
    disabledPagination?: boolean
    isLoading?: boolean
  }>()

  const totalPages = ref(Math.ceil(totalItems / itemsPerPage))

  const iconSize = 16

  const emit = defineEmits<{
    (event: 'page-changed', page: number): void
  }>()
</script>

<template>
  <slot />
  <div v-if="totalItems > itemsPerPage" class="pagination">
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <div class="pagination-actions">
      <loading-indicator v-if="isLoading" inline />
      <button
        :disabled="disabledPagination || currentPage == 1"
        title="First"
        @click="emit('page-changed', 1)">
        <icon-player-skip-back-filled :size="iconSize" />
      </button>
      <button
        :disabled="disabledPagination || currentPage === 1"
        title="Previous"
        @click="emit('page-changed', currentPage - 1)">
        <icon-player-track-prev-filled :size="iconSize" />
      </button>
      <button
        :disabled="disabledPagination || currentPage === totalPages"
        title="Next"
        @click="emit('page-changed', currentPage + 1)">
        <icon-player-track-next-filled :size="iconSize" />
      </button>
      <button
        :disabled="disabledPagination || currentPage === totalPages"
        title="Last"
        @click="emit('page-changed', totalPages)">
        <icon-player-skip-forward-filled :size="iconSize" />
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
