<script setup lang="ts">
  import IconMedalAuthor from '~/assets/medal-author.webp?inline'
  import IconMedalBronze from '~/assets/medal-bronze.webp?inline'
  import IconMedalGold from '~/assets/medal-gold.webp?inline'
  import IconMedalSilver from '~/assets/medal-silver.webp?inline'
  import { formatResultTime } from '~/utils'

  interface Medal {
    name: string
    icon: string
    time: number
  }

  const { author, gold, silver, bronze } = defineProps<{
    author: number
    gold: number
    silver: number
    bronze: number
  }>()

  const medals: Medal[] = [
    {
      name: 'Author',
      icon: IconMedalAuthor,
      time: author
    },
    {
      name: 'Gold',
      icon: IconMedalGold,
      time: gold
    },
    {
      name: 'Silver',
      icon: IconMedalSilver,
      time: silver
    },
    {
      name: 'Bronze',
      icon: IconMedalBronze,
      time: bronze
    }
  ]
</script>

<template>
  <div :class="$style.medalTimesList">
    <div v-for="medal in medals" :key="medal.name" :class="$style.medal">
      <img :src="medal.icon" alt="" />
      <p>{{ formatResultTime(medal.time) }}</p>
    </div>
  </div>
</template>

<style module lang="less">
  .medalTimesList {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .medal {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;

    img {
      max-height: 6ex;
    }

    p {
      font-weight: 500;
      font-size: 1rem;
    }
  }
</style>
