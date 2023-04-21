<script setup lang="ts">
  import { useQuery, useQueryClient } from '@tanstack/vue-query'
  import { getRecords, type Level } from '@zeepkist/gtr-api'
  import { addDays } from 'date-fns'

  import IconMedalAuthor from '~/assets/medal-author.webp?inline'
  import IconTrophy from '~/assets/trophy.webp?inline'
  import UserBadge from '~/components/UserBadge.vue'
  import { formatResultTime } from '~/utils'

  import LoadingIndicator from './LoadingIndicator.vue'

  const { level } = defineProps<{
    level: Level
    recordsCount?: number
  }>()

  const queryClient = useQueryClient()

  const { data: worldRecord, isLoading } = useQuery({
    queryKey: ['worldRecord', level.id],
    queryFn: async () => {
      const { records } = await getRecords({
        LevelId: level.id,
        Limit: 1,
        WorldRecordOnly: true
      })
      return records.length > 0
        ? {
            time: records[0].time,
            date: records[0].dateCreated,
            user: records[0].user
          }
        : // eslint-disable-next-line unicorn/no-null
          null
    },
    enabled: !!level.id,
    staleTime: addDays(0, 1).getTime(),
    cacheTime: addDays(0, 1).getTime()
  })

  queryClient.setQueryData(['level', level.id], level)
</script>

<template>
  <router-link
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
      <p v-if="isLoading"><loading-indicator :class="$style.loading" /></p>
      <template v-else>
        <div v-if="worldRecord" :class="$style.worldRecord">
          <img :src="IconTrophy" alt="" />
          <router-link
            :to="{
              name: 'user',
              params: { steamId: worldRecord.user.steamId }
            }">
            <user-badge
              :username="worldRecord.user.steamName"
              :class="$style.worldRecordAuthor" />
            <div>{{ formatResultTime(worldRecord.time) }}</div>
          </router-link>
          <p v-if="recordsCount" :class="$style.recordsCount">
            {{ recordsCount }} players
          </p>
        </div>
        <p v-else>
          <img :src="IconMedalAuthor" alt="" />
          {{ formatResultTime(level.timeAuthor) }}
        </p>
      </template>
    </div>
  </router-link>
</template>

<style module lang="less">
  .levelGridItem,
  .levelGridItem:visited {
    color: inherit;
    text-decoration: none;
  }

  .levelGridItem {
    position: relative;
    border-radius: 0.5rem;
    overflow: hidden;

    display: flex;
    gap: 0;
    width: calc(33% - 0.5rem);

    @media screen and (max-width: 1200px) {
      width: calc(50% - 0.5rem);
    }

    @media screen and (max-width: 800px) {
      width: calc(100%);
    }

    &:hover {
      .backgroundCover {
        filter: blur(0.5rem) grayscale(0);
        opacity: 0.25;
      }

      .thumbnailContainer,
      .thumbnail {
        transform: translateX(0.5rem);
        transform: scale(1.05);
      }

      .content {
        transform: translateX(0.5rem);
      }

      .recordsCount {
        transform: translateX(-0.75rem);
      }
    }

    p {
      margin: 0;
      white-space: nowrap;
    }

    .thumbnailContainer,
    .thumbnail {
      height: calc(1rem * 6.5);
      width: calc(1rem * 10);
      min-width: calc(1rem * 10);
      transform: translateX(0);
      transition: transform 0.25s ease, filter 0.25s ease, opacity 0.25s ease;
    }

    .thumbnailContainer {
      position: relative;
      overflow: hidden;
      // border-radius: 0.5rem;

      img {
        clip-path: polygon(0% 0%, 100% 0%, 80% 100%, 0% 100%);
        clip-path: polygon(0% 0%, 90% 0%, 80% 100%, 0% 100%);
      }

      p {
        text-align: right;
        position: absolute;
        right: 0;
        bottom: 0;
        padding: 0.25rem;
        font-size: 0.75rem;
      }
    }

    .thumbnail {
      object-fit: cover;
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

    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 1rem 1rem;
      margin-left: -1rem;
      overflow-x: hidden;

      transform: translateX(0);
      transition: transform 0.25s ease;

      img {
        width: 1.5em;
        height: 1.5em;
        margin-bottom: -0.4em;
        margin-left: -0.25em;
      }
    }

    .levelName,
    .levelAuthor {
      overflow: hidden;
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

    .worldRecord {
      display: flex;
      gap: 0.5rem;
      align-items: flex-end;
      place-items: center;
      margin-bottom: -0.25rem;
      margin-left: -0.5rem;

      a,
      a:visited {
        z-index: 1;
        color: inherit;
        transition: color 0.25s ease;

        &:hover {
          color: rgb(var(--primary-6));
        }
      }

      .worldRecordAuthor {
        font-size: 0.75rem;
      }
    }

    .loading {
      height: 1em;

      div {
        top: unset;
      }
    }

    .recordsCount {
      flex: 1;
      font-size: 0.75rem;
      text-align: right;
      align-self: flex-end;
      transform: translateX(0);
      transition: transform 0.25s ease;
    }
  }
</style>
