<script setup lang="ts">
  import { RouterLink } from 'vue-router'

  import { WORKSHOP_URL } from '@/configs'
  import type { Level } from '@/models/level'
  import { formatResultTime } from '@/utils'

  const { level } = defineProps<{
    level: Level
  }>()
</script>

<template>
  <div class="level">
    <img :src="level.thumbnailUrl" :alt="`Thumbnail of ${level.name}`" />
    <div>
      <router-link :to="{ name: 'level', params: { id: level.id } }">
        {{ level.name }}
      </router-link>
      <div>By {{ level.author }}</div>
    </div>
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
    <div>
      <div>{World Record Time}</div>
    </div>
    <div>
      <a
        :href="`${WORKSHOP_URL}?id=${level.workshopId}`"
        target="_blank"
        rel="noopener noreferrer"
        >Subscribe</a
      >
    </div>
  </div>
</template>

<style scoped lang="less">
  .level {
    display: grid;
    grid-template-columns: 80px 2fr repeat(5, 1fr) 80px;
    grid-template-rows: 50px;
    gap: 1rem;
    align-items: center;

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
  }
</style>
