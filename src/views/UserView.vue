<script setup lang="ts">
  import { IconMedal } from '@tabler/icons-vue'
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'

  import RecordList from '@/components/RecordList.vue'
  import { getRecords } from '@/services/records'

  const route = useRoute()
  const steamId = route.params.steamId as string

  const recordDataBest = ref(
    await getRecords({ UserSteamId: steamId, BestOnly: true })
  )
  const recordDataNotBest = ref(
    await getRecords({ UserSteamId: steamId, BestOnly: false, Limit: 0 })
  )
  const recordDataWRs = ref(
    await getRecords({ UserSteamId: steamId, WorldRecordOnly: true, Limit: 0 })
  )
  const recordDataRecent = ref(
    await getRecords({ UserSteamId: steamId, Limit: 10 })
  )
</script>

<template>
  <div class="about">
    <h1>{{ steamId }}'s Profile</h1>
    <p>
      <icon-medal /> {{ steamId }} has set times on
      {{ recordDataBest.totalAmount }} levels over
      {{ recordDataBest.totalAmount + recordDataNotBest.totalAmount }} runs.
      They currently hold {{ recordDataWRs.totalAmount }} world records.
    </p>
    <record-list :records="recordDataRecent.records" />
    <code
      v-for="record in recordDataRecent.records"
      :key="record.screenshotUrl">
      {{ record }}
    </code>
  </div>
</template>

<style scoped lang="less">
  @media (min-width: 1024px) {
    .about {
      display: flex;
      flex-direction: column;
    }

    code {
      white-space: pre;
      padding: 1rem 0;
    }

    code:nth-of-type(even) {
      background: var(--color-text);
      color: var(--color-text-inverted);
    }
  }
</style>
