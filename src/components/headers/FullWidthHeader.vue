<script setup lang="ts">
  import UserBadge from '~/components/UserBadge.vue'

  const { thumbnailUrl, title, author } = defineProps<{
    thumbnailUrl: string
    title: string
    author: string
  }>()
</script>

<template>
  <div :class="$style.coverImageContainer">
    <div
      :style="{ '--thumbnailUrl': `url(${thumbnailUrl})` }"
      :class="$style.coverImage" />
  </div>
  <div :class="$style.header">
    <img :src="thumbnailUrl" alt="" />
    <div :class="$style.headerTitle">
      <h1>{{ title }}</h1>
      <span :class="$style.headerAuthor"
        >By <user-badge :username="author"
      /></span>
      <div v-if="$slots.badges" :class="$style.headerExtra">
        <slot name="badges" />
      </div>
      <div v-if="$slots" :class="$style.headerExtra">
        <slot />
      </div>
    </div>
    <div v-if="$slots.actions" :class="$style.headerActions">
      <slot name="actions" />
    </div>
  </div>
</template>

<style module lang="less">
  .coverImageContainer {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 25rem;
    overflow: hidden;
  }

  .coverImage {
    z-index: -2;
    height: calc(100% + 1rem);
    width: calc(100% + 2rem);
    margin: -1rem -1rem 0;
    background-repeat: no-repeat;
    background-image: linear-gradient(
        to top,
        var(--zk-background-1),
        rgba(#222, 0.6)
      ),
      var(--thumbnailUrl);
    // background-image: var(--thumbnailUrl);
    background-size: cover;
    background-position-y: 50%;
    filter: blur(0.5rem) grayscale(0.4);
    overflow: hidden;
  }

  body[arco-theme='light'] .coverImage {
    background-image: linear-gradient(
        to top,
        var(--zk-background-1),
        rgba(#fff7ec, 0.6)
      ),
      var(--thumbnailUrl);
  }

  .header {
    display: flex;
    align-items: flex-start;
    margin: 1rem 0;
    height: 100px;
    max-height: 100px;

    img {
      max-height: 100px;
      margin-right: 1rem;
      border-radius: var(--zk-border-radius-large);
      box-shadow: var(--zk-shadow-special);
    }

    @media screen and (max-width: 900px) {
      flex-direction: column;
      align-items: center;
      text-align: center;
      height: auto;
      max-height: none;
      gap: 2rem;

      img {
        margin-right: 0;
      }

      .headerExtra,
      .headerActions {
        margin: 2rem auto 0;
      }
    }

    .headerTitle {
      flex: 1;
      margin-top: 0.5rem;
      line-height: 1ex;
      height: calc(100px - 0.5rem);
      max-height: calc(100px - 0.5rem);

      display: flex;
      flex-direction: column;
    }

    .headerAuthor {
      line-height: 1ex;
      font-size: 1rem;
    }

    .headerExtra {
      flex: 1;
      display: flex;
      align-items: flex-end;
      gap: 0.5rem;
      font-size: 0.75rem;
      text-align: center;

      span {
        padding: 0.25rem 0;
      }
    }

    .headerActions {
      align-self: flex-end;
      display: flex;
      gap: 0.5rem;
    }
  }
</style>
