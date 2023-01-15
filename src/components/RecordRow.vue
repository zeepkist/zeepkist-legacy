<script setup lang="ts">
  import { RouterLink } from 'vue-router'

  import type { LevelRecord } from '@/models/record'
  import { formatDate, formatRelativeDate, formatResultTime } from '@/utils'

  const {
    record,
    showUser = false,
    hideTrackInfo = false
  } = defineProps<{
    record: LevelRecord
    showUser?: boolean
    hideTrackInfo?: boolean
  }>()
</script>

<template>
  <div class="record" :class="{ 'hide-track-info': hideTrackInfo }">
    <img
      v-if="!hideTrackInfo"
      :src="record.level.thumbnailUrl"
      :alt="`Thumbnail of ${record.level.name}`" />
    <div v-if="!hideTrackInfo">
      <router-link :to="{ name: 'level', params: { id: record.level.id } }">
        {{ record.level.name }}
      </router-link>
      <div>By {{ record.level.author }}</div>
    </div>
    <div>
      <router-link
        v-if="showUser"
        :to="{ name: 'user', params: { steamId: record.user.steamId } }">
        {{ record.user.steamName }}
      </router-link>
      <div :title="formatDate(record.dateCreated)">
        {{ formatRelativeDate(record.dateCreated) }}
      </div>
    </div>
    <div>
      <div>{{ formatResultTime(record.time) }}</div>
      <div
        v-if="record.isBest || record.isWorldRecord || !record.isValid"
        class="record-badges">
        <span v-if="record.isWorldRecord" class="wr" title="World Record"
          >WR</span
        >
        <span v-if="record.isBest" class="pb" title="Personal Best">PB</span>
        <span v-if="!record.isValid" class="any" title="Any Percentage"
          >any%</span
        >
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
    grid-template-columns: 80px 2fr 1fr repeat(2, 80px);
    grid-template-rows: 50px;
    gap: 1rem;
    align-items: center;

    &.hide-track-info {
      grid-template-columns: 2fr repeat(2, 80px);
    }

    &:nth-of-type(even) {
      background: var(--color-background-mute);
    }

    img {
      max-height: 50px;
      overflow: hidden;
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

        &.any {
          border: 1px solid var(--color-disabled);
        }

        & ~ span {
          margin-left: 0.25rem;
        }
      }
    }
  }
</style>
