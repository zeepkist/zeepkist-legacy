<script setup lang="ts">
  const { inline = false } = defineProps<{
    inline?: boolean
  }>()
</script>

<template>
  <div :class="[$style.ellipsis, { [$style.inline]: inline }]">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<style module lang="less">
  .ellipsis {
    display: block;
    position: relative;
    width: 80px;
    height: 80px;
    margin: 0 auto;

    div {
      position: absolute;
      top: 33px;
      width: 13px;
      height: 13px;
      border-radius: 50%;
      background: var(--color-text-1);
      animation-timing-function: cubic-bezier(0, 1, 1, 0);
    }

    &.inline {
      height: unset;
      top: 0.4rem;

      div {
        top: 0;
      }
    }

    div:nth-child(1) {
      left: 8px;
      animation: lds-ellipsis1 0.6s infinite;
    }

    div:nth-child(2) {
      left: 8px;
      animation: lds-ellipsis2 0.6s infinite;
    }

    div:nth-child(3) {
      left: 32px;
      animation: lds-ellipsis2 0.6s infinite;
    }

    div:nth-child(4) {
      left: 56px;
      animation: lds-ellipsis3 0.6s infinite;
    }
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }
</style>
