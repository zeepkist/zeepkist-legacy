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
      <div>{{ record.time }}</div>
      <div v-if="record.isBest || record.isWorldRecord" class="record-badges">
        <span v-if="record.isWorldRecord">WR</span>
        <span v-if="record.isBest">PB</span>
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
    max-width: 50%;
    display: grid;
    grid-template-columns: 80px 2fr 1fr 80px;
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

        &~span {
          margin-left: 0.25rem;
        }
      }
    }
  }
</style>
