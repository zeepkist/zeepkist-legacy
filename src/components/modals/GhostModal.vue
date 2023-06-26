<script setup lang="ts">
  import { IconX } from '@tabler/icons-vue'
  import { getRecords } from '@zeepkist/gtr-api'
  import { ref } from 'vue'

  import GhostCanvas from '~/components/canvases/GhostCanvas.vue'

  const { ghostUrls = [], level } = defineProps<{
    ghostUrls?: string[]
    level?: number
  }>()

  const isOpen = ref(false)
  const hasAllGhosts = ref(false)

  const onClick = () => {
    isOpen.value = true
  }

  const onClose = () => {
    isOpen.value = false
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

    if (recordsObtained < totalAmount) getAllRecords(offset + limit)
    else {
      hasAllGhosts.value = true
    }
  }

  if (ghostUrls.length === 0 && level) {
    getAllRecords()
  }

  const percentageLoaded = ref(0)

  const onProgress = (progress: number) => {
    percentageLoaded.value = Math.round(progress * 100)
  }
</script>

<template>
  <button :class="$style.button" @click="onClick">
    <slot />
  </button>
  <div v-if="isOpen" :class="$style.modal">
    <h1>Ghost Explorer (ALPHA)</h1>
    <button :class="$style.close" @click="onClose"><icon-x /></button>
    <div v-if="percentageLoaded < 100">{{ percentageLoaded }}%</div>
    <ghost-canvas :ghost-urls="allGhostUrls" @progress="onProgress" />
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

      &:hover {
        color: rgb(var(--link-5));
      }
    }
  }
</style>
