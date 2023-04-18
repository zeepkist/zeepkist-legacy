<script setup lang="ts">
  import type { Level } from '@zeepkist/gtr-api'

  import IconMedalAuthor from '~/assets/medal-author.webp?inline'
  import { formatResultTime } from '~/utils'

  const { header, levels } = defineProps<{
    header?: string
    levels: Level[]
    hideLevelThumbnail?: boolean
  }>()
</script>

<template>
  <div :class="$style.levels">
    <h2 v-if="header">{{ header }}</h2>
    <div :class="$style.levelGrid">
      <router-link
        v-for="level in levels"
        :key="level.uniqueId"
        :to="{ name: 'level', params: { id: level.id } }"
        :title="`${level.name} by ${level.author}`"
        :class="$style.levelGridItem">
        <img :src="level.thumbnailUrl" alt="" :class="$style.backgroundCover" />
        <div :class="$style.thumbnailContainer">
          <img :src="level.thumbnailUrl" alt="" :class="$style.thumbnail" />
        </div>
        <div :class="$style.content">
          <p :class="$style.levelName">{{ level.name }}</p>
          <p :class="$style.levelAuthor">By {{ level.author }}</p>
          <p>
            <img :src="IconMedalAuthor" alt="" />
            {{ formatResultTime(level.timeAuthor) }}
          </p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<style module lang="less">
  .levels {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h2 {
      margin: 0.5rem 0 1rem;
    }
  }

  .levelGrid {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;

    .levelGridItem {
      color: inherit;

      position: relative;
      border-radius: 0.5rem;
      overflow: hidden;

      display: flex;
      gap: 1rem;
      width: calc(33% - 0.5rem);

      @media screen and (max-width: 1200px) {
        width: calc(50% - 0.5rem);
      }

      @media screen and (max-width: 800px) {
        width: calc(100%);
      }

      &:hover {
        .backgroundCover {
          filter: blur(1rem) grayscale(0) brightness(1);
          transform: scale(1.1);
          opacity: 0.25;
        }

        .thumbnail {
          transform: scale(1.1);
        }
      }
    }

    p {
      margin: 0;
      white-space: nowrap;
      padding-right: 1rem;
    }

    .thumbnailContainer,
    .thumbnail {
      height: calc(1rem * 6.5);
      width: calc(1rem * 10);
    }

    .thumbnailContainer {
      position: relative;
      overflow: hidden;
      border-radius: 0.5rem;
    }

    .thumbnail {
      object-fit: cover;
      border-radius: 0.5rem;
    }

    .thumbnail,
    .backgroundCover {
      transition: transform 0.25s ease, filter 0.25s ease, opacity 0.25s ease;
    }

    .backgroundCover {
      position: absolute;
      margin: -1rem;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: calc(100% + 2rem);
      height: calc(100% + 2rem);
      object-fit: cover;
      filter: blur(1rem) grayscale(0) brightness(1);
      transition: filter 0.25s ease, opacity 0.25s ease;
      opacity: 0.125;
    }

    .thumbnail,
    .content {
      z-index: 1;
    }

    .content {
      display: flex;
      flex-direction: column;
      padding: 1rem 0;

      img {
        width: 1.5em;
        height: 1.5em;
        margin-bottom: -0.25em;
        margin-left: -0.25em;
      }
    }

    .levelName,
    .levelAuthor {
      overflow: clip;
      text-overflow: ellipsis;
    }

    .levelName {
      font-weight: 500;
    }

    .levelAuthor {
      flex: 1;
      margin-top: 0.25rem;
      font-weight: 300;
      font-size: 0.75rem;
    }
  }
</style>
