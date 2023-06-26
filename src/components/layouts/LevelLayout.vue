<script setup lang="ts">
  import { IconGhostFilled } from '@tabler/icons-vue'
  import { useQuery } from '@tanstack/vue-query'
  import { getLevels, getRecords, type Level } from '@zeepkist/gtr-api'
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'

  import PopularLevelBadge from '~/components/badges/PopularLevelBadge.vue'
  import ColumnLayout from '~/components/ColumnLayout.vue'
  import FullWidthHeader from '~/components/headers/FullWidthHeader.vue'
  import GhostModal from '~/components/modals/GhostModal.vue'
  import PaginatedComponent from '~/components/PaginatedComponent.vue'
  import RecordList from '~/components/RecordList.vue'
  import ContentSheet from '~/components/sheets/ContentSheet.vue'
  import MedalTimesSheet from '~/components/sheets/MedalTimesSheet.vue'
  import { STEAM_WORKSHOP_URL } from '~/configs'
  import { useAuthenticationStore } from '~/stores/authentication'
  import { formatOrdinal } from '~/utils'

  type RecordType = 'recent' | 'best' | 'invalid' | 'yourBest'

  const { level } = defineProps<{
    level: Level
  }>()

  const authStore = useAuthenticationStore()
  const route = useRoute()
  const id = Number(route.params.id)
  const limit = 10

  const { data: workshopLevelsCount } = useQuery({
    queryKey: ['workshopLevelsCount', level.workshopId],
    queryFn: async () => {
      const levels = await getLevels({
        WorkshopId: level.workshopId,
        Limit: 0
      })

      console.log('count', levels)

      return levels.totalAmount ?? 0
    }
  })

  const getPaginatedRecords = async (type: RecordType, page = 1) => {
    switch (type) {
      case 'recent': {
        return await getRecords({
          LevelId: id,
          Sort: '-id',
          Limit: limit,
          Offset: (page - 1) * limit
        })
      }
      case 'best': {
        return await getRecords({
          LevelId: id,
          BestOnly: true,
          Limit: limit,
          Offset: (page - 1) * limit
        })
      }
      case 'invalid': {
        return await getRecords({
          LevelId: id,
          InvalidOnly: true,
          Sort: 'time',
          Limit: limit,
          Offset: (page - 1) * limit
        })
      }
      case 'yourBest': {
        return await getRecords({
          LevelId: id,
          ValidOnly: true,
          UserSteamId: authStore.SteamId,
          Limit: 5,
          Offset: 0
        })
      }
    }
  }

  const handlePageChanged = async (type: RecordType, page: number) => {
    switch (type) {
      case 'recent': {
        recentRecords.value = await getPaginatedRecords('recent', page)
        pages.value.recent = page
        break
      }
      case 'best': {
        bestRecords.value = await getPaginatedRecords('best', page)
        pages.value.best = page
        break
      }
      case 'invalid': {
        invalidRecords.value = await getPaginatedRecords('invalid', page)
        pages.value.invalid = page
        break
      }
    }
  }

  const recentRecords = ref(await getPaginatedRecords('recent'))
  const bestRecords = ref(await getPaginatedRecords('best'))
  const invalidRecords = ref(await getPaginatedRecords('invalid'))
  const yourBestRecords = ref(await getPaginatedRecords('yourBest'))

  const pages = ref({
    best: 1,
    worldRecord: 1,
    invalid: 1,
    recent: 1
  })
</script>

<template>
  <full-width-header
    :thumbnail-url="level.thumbnailUrl"
    :title="level.name"
    :author="level.author">
    <span>
      <span v-if="level.rank">{{ formatOrdinal(level.rank) }} ・ </span>
      <span v-if="level.points" :title="`${level.points ?? 0} points`"
        >{{ level.points ?? 0 }} ➤ ・
      </span>
      {{ recentRecords.totalAmount - invalidRecords.totalAmount }} valid runs ・
      {{ bestRecords.totalAmount }} players
    </span>
    <template #badges>
      <popular-level-badge :level-id="level.id" popular />
      <popular-level-badge :level-id="level.id" />
    </template>
    <template #actions>
      <router-link
        v-if="
          level.workshopId !== '0' &&
          workshopLevelsCount &&
          workshopLevelsCount > 1
        "
        :to="{ name: 'workshop', params: { id: level.workshopId } }">
        View level pack
      </router-link>
      {{
        level.workshopId !== '0' &&
        workshopLevelsCount &&
        workshopLevelsCount > 1 &&
        (level.workshopId !== '0' || bestRecords.totalAmount > 0)
          ? '・'
          : ''
      }}
      <a
        v-if="level.workshopId !== '0'"
        :href="STEAM_WORKSHOP_URL + level.workshopId">
        Open in Workshop
      </a>
      {{ level.workshopId !== '0' || bestRecords.totalAmount > 0 ? '・' : '' }}
      <ghost-modal :level="level.id">
        <icon-ghost-filled :size="20" />
      </ghost-modal>
    </template>
  </full-width-header>

  <medal-times-sheet v-if="!authStore.SteamId" :level="level" />
  <column-layout v-else>
    <template #left>
      <medal-times-sheet :level="level" />
    </template>
    <template #right>
      <content-sheet>
        <record-list
          header="Your Bests"
          :records="yourBestRecords.records"
          :rank-offset="0"
          show-user
          show-badges
          hide-track-info />
      </content-sheet>
    </template>
  </column-layout>

  <column-layout>
    <template #left>
      <content-sheet>
        <paginated-component
          :current-page="pages.best"
          :items-per-page="limit"
          :total-items="bestRecords.totalAmount"
          @page-changed="page => handlePageChanged('best', page)">
          <record-list
            header="Best Times"
            :records="bestRecords.records"
            :rank-offset="(pages.best - 1) * limit"
            show-user
            show-points
            hide-track-info />
        </paginated-component>
      </content-sheet>
    </template>
    <template #center>
      <content-sheet>
        <paginated-component
          :current-page="pages.recent"
          :items-per-page="limit"
          :total-items="recentRecords.totalAmount"
          @page-changed="page => handlePageChanged('recent', page)">
          <record-list
            header="Recent Times"
            :records="recentRecords.records"
            show-user
            show-badges
            hide-track-info />
        </paginated-component>
      </content-sheet>
    </template>
    <template #right>
      <content-sheet>
        <paginated-component
          :current-page="pages.invalid"
          :items-per-page="limit"
          :total-items="invalidRecords.totalAmount"
          @page-changed="page => handlePageChanged('invalid', page)">
          <record-list
            header="Any% Times"
            :records="invalidRecords.records"
            :rank-offset="(pages.invalid - 1) * limit"
            show-user
            show-badges
            hide-track-info />
        </paginated-component>
      </content-sheet>
    </template>
  </column-layout>
</template>
