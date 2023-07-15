<script setup lang="ts">
  import { IconX } from '@tabler/icons-vue'
  import { getRecords } from '@zeepkist/gtr-api'
  import { ref } from 'vue'

  import GhostCanvas from '~/components/canvases/GhostCanvas.vue'
  import LoadingIndicator from '~/components/LoadingIndicator.vue'

  const { ghostUrls = [], level } = defineProps<{
    ghostUrls?: string[]
    level?: number
  }>()

  const isOpen = ref(false)
  const hasAllGhosts = ref(false)

  // If no level is provided, assume all ghost urls are provided
  if (!level) hasAllGhosts.value = true

  const onClick = async () => {
    isOpen.value = true

    if (ghostUrls.length === 0 && level) {
      await getAllRecords()
    }
  }

  const onClose = () => {
    isOpen.value = false
    hasAllGhosts.value = false
  }

  const allGhostUrls = ref<string[]>(ghostUrls)

  const limit = 50
  let recordsObtained = 0

  const getAllRecords = async (offset = 0) => {
    const { records, totalAmount } = await getRecords({
      LevelId: level,
      BestOnly: true,
      Limit: limit,
      Offset: offset
    })

    recordsObtained += records.length

    allGhostUrls.value = [
      ...allGhostUrls.value,
      ...records.map(r => r.ghostUrl)
    ]

    totalGhosts.value += records.length

    if (recordsObtained < totalAmount) await getAllRecords(offset + limit)
    else {
      hasAllGhosts.value = true
    }
  }

  const percentageLoaded = ref(0)
  const loadedGhosts = ref(0)
  const totalGhosts = ref(0)

  interface Progress {
    progress: number
    loaded: number
    total: number
  }

  const onProgress = (progress: Progress) => {
    percentageLoaded.value = progress.progress
    loadedGhosts.value = progress.loaded
    totalGhosts.value = progress.total
  }
</script>

<template>
  <button :class="$style.button" @click="onClick">
    <slot />
  </button>
  <div v-if="isOpen" :class="$style.modal">
    <h1>Ghost Explorer (ALPHA)</h1>
    <button :class="$style.close" @click="onClose"><icon-x /></button>
    <div v-if="percentageLoaded < 100" :class="$style.loading">
      <div>{{ percentageLoaded }}%</div>
      <div>{{ loadedGhosts }} / {{ totalGhosts }}</div>
      <div v-if="!hasAllGhosts">Gathering ghosts...</div>
      <div v-else>Parsing ghosts...</div>
      <loading-indicator />
    </div>
    <ghost-canvas v-if="hasAllGhosts" :ghost-urls="allGhostUrls" @progress="onProgress" />
  </div>
</template>

<style module lang="less">
  .button {
    cursor: pointer;
    background: inherit;
    border: inherit;
    color: inherit;
    text-align: inherit;
    padding: 0 1rem;
    margin: 0 -1rem;

    &:hover {
      color: rgb(var(--link-5)) !important;
    }
  }

  .modal {
    position: fixed;
    top: 10vh;
    left: 10vw;
    z-index: 1000;
    width: 80vw;
    height: 80vh;
    background: #151515;
    color: #fff;
    box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
    border-radius: var(--border-radius-large);
    padding: 1rem;

    @media screen and (max-width: 1200px) {
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: unset;
      height: unset;
    }

    button.close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      color: #fff;
      background: transparent;
      border: none;
      cursor: pointer;
      z-index: 1001;

      &:hover {
        color: rgb(var(--link-5));
      }
    }

    .loading {
      display: flex;
      height: 100%;
      flex-direction: column;
      justify-content: center;
      place-content: center;
      align-items: center;
      text-align: center;
      gap: 1rem;
    }
  }
</style>
