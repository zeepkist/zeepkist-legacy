<script setup lang="ts">
  import { IconX } from '@tabler/icons-vue'
  import { ref } from 'vue'

  import GhostCanvas from '~/components/canvases/GhostCanvas.vue'

  const { ghostUrls } = defineProps<{
    ghostUrls: string[]
  }>()

  const isOpen = ref(false)

  const onClick = () => {
    isOpen.value = true
  }

  const onClose = () => {
    isOpen.value = false
  }
</script>

<template>
  <button :class="$style.button" @click="onClick">
    <slot />
  </button>
  <div v-if="isOpen" :class="$style.modal">
    <h1>Ghost Explorer (ALPHA)</h1>
    <button :class="$style.close" @click="onClose"><icon-x /></button>
    <ghost-canvas :ghost-urls="ghostUrls" />
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
