<script setup lang="ts">
  import { defineProps } from 'vue'

  import type { RecordRecord } from '@/models/record'

  const { record } = defineProps<{
    record: RecordRecord
  }>()
</script>

<template>
  <div class="record">
    <img
      :src="record.level.thumbnailUrl"
      :alt="`Thumbnail of ${record.level.name}`" />
    <div>
      <div>{{ record.level.name }}</div>
      <div>By {{ record.level.author }}</div>
    </div>
    <div>
      <div>{{ record.time.toFixed(4) }}</div>
      <div v-if="record.isBest || record.isWorldRecord" class="record-badges">
        <span v-if="record.isWorldRecord" class="wr" title="World Record"
          >WR</span
        >
        <span v-if="record.isBest" class="pb" title="Personal Best">PB</span>
      </div>
    </div>
    <div>
      <button>View Ghost</button>
      <button>Compare</button>
    </div>
  </div>
</template>

<style scoped lang="less">
  .record {
    display: grid;
    grid-template-columns: 80px 2fr repeat(2, 80px);
    grid-template-rows: 50px;
    gap: 1rem;
    align-items: center;

    &:nth-of-type(even) {
      background: var(--color-background-mute);
    }

    img {
      max-height: 50px;
    }

    .record-badges {
      span {
        border: 1px solid var(--color-button-active);
        border-radius: var(--border-radius);
        padding: 0 0.25rem;
        font-size: 0.75rem;

        &.wr {
          border: 1px solid var(--color-button-hover);
        }

        & ~ span {
          margin-left: 0.25rem;
        }
      }
    }
  }
</style>
