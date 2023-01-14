<script setup lang="ts">
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'

  import { getRecords } from '@/services/records'
  import { getUser } from '@/services/users'

  const route = useRoute()
  const steamId = route.params.steamId as string

  const userData = ref(await getUser({ steamId }))
  const recordData = ref(
    await getRecords({ UserSteamId: steamId, BestOnly: true })
  )
  const recordDataNotBest = ref(
    await getRecords({ UserSteamId: steamId, BestOnly: false, Limit: 0 })
  )
</script>

<template>
  <div class="about">
    <h1>{{ userData.steamId }}'s Profile</h1>
    <p>
      {{ userData.steamId }} has set times on {{ recordData.totalAmount }} levels
      over {{ recordData.totalAmount + recordDataNotBest.totalAmount }} runs
    </p>
    <code v-for="record in recordData.records" :key="record.screenshotUrl">
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
