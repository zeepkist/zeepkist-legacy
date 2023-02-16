<script setup lang="ts">
  import { useElementVisibility } from '@vueuse/core'
  import { ref } from 'vue'
  import { RouterLink } from 'vue-router'

  import { PLAY_URL, WORKSHOP_URL } from '@/configs'
  import type { Level } from '@/models/level'
  import type { LevelRecord } from '@/models/record'
  import { getRecords } from '@/services/records'
  import { formatResultTime } from '@/utils'

  const { level, hideLevelThumbnail = false } = defineProps<{
    level: Level
    hideLevelThumbnail?: boolean
  }>()

  const target = ref<HTMLElement>()
  const isTargetVisible = useElementVisibility(target)
  const isWorldRecordLoading = ref(true)
  const worldRecord = ref<LevelRecord>()

  const getWorldRecord = async () => {
    const { records } = await getRecords({
      LevelId: level.id,
      WorldRecordOnly: true,
      Limit: 1
    })
    if (records.length > 0) {
      worldRecord.value = records[0]
    }
    isWorldRecordLoading.value = false
  }

  if (isTargetVisible && !worldRecord.value) {
    getWorldRecord()
  }
</script>

<template>
  <div ref="target" class="level" :class="{ hideLevelThumbnail }">
    <img
      v-if="!hideLevelThumbnail"
      :src="level.thumbnailUrl"
      alt=""
      class="contain" />
    <div class="author">
      <router-link :to="{ name: 'level', params: { id: level.id } }">
        {{ level.name }}
      </router-link>
      <div class="subtext">By {{ level.author }}</div>
    </div>
    <div v-if="worldRecord" class="author">
      <div>{{ formatResultTime(worldRecord.time) }}</div>
      <router-link
        :to="{ name: 'user', params: { steamId: worldRecord.user.steamId } }"
        class="subtext"
        >By {{ worldRecord.user.steamName }}</router-link
      >
    </div>
    <div v-else-if="!worldRecord && !isWorldRecordLoading" class="empty">
      No World Record
    </div>
    <div v-else class="empty">Loading World Record</div>
    <div class="medal">
      <img src="@/assets/medal-author.webp" alt="Author Medal" />
      {{ formatResultTime(level.timeAuthor) }}
    </div>
    <div class="medal">
      <img src="@/assets/medal-gold.webp" alt="Gold Medal" />
      {{ formatResultTime(level.timeGold) }}
    </div>
    <div class="medal">
      <img src="@/assets/medal-silver.webp" alt="Silver Medal" />
      {{ formatResultTime(level.timeSilver) }}
    </div>
    <div class="medal">
      <img src="@/assets/medal-bronze.webp" alt="Bronze Medal" />
      {{ formatResultTime(level.timeBronze) }}
    </div>
    <div class="actions">
      <a
        v-if="level.workshopId !== '0'"
        :href="`${WORKSHOP_URL}${level.workshopId}`">
        Subscribe
      </a>
      <a v-else :href="PLAY_URL"> Play</a>
    </div>
  </div>
</template>

<style scoped lang="less">
  .level {
    display: grid;
    grid-template-columns: 80px 2fr repeat(5, 1fr) 80px;
    grid-auto-rows: 50px;
    gap: 1rem;
    align-items: center;
    padding: 0.25rem 1rem 0.25rem 0;

    &.hideLevelThumbnail {
      grid-template-columns: 2fr repeat(5, 1fr) 80px;
    }

    &:nth-of-type(even) {
      background: var(--color-background-mute);
    }

    img {
      max-height: 50px;
      overflow: hidden;
    }

    .medal {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      img {
        max-height: 20px;
      }
    }

    .author {
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .subtext {
      font-weight: 300;
      font-size: 0.75rem;
    }

    .contain {
      max-width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      a {
        display: block;
        text-align: center;
        width: 100%;
      }
    }
  }
</style>
