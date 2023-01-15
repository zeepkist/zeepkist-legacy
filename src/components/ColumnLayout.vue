<template>
  <div class="columns" :class="{ 'with-center': $slots.center }">
    <div class="column">
      <slot name="left" />
    </div>
    <div v-if="$slots.center" class="column">
      <slot name="center" />
    </div>
    <div class="column">
      <slot name="right" />
    </div>
  </div>
</template>

<style scoped lang="less">
  .columns {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    gap: 1rem;
    .columns {
      display: flex;
      flex-direction: column;
    }
  }

  @media (min-width: 1024px) {
    .columns {
      grid-template-columns: 1fr 1fr;

      &.with-center {
        grid-template-columns: 1fr 1fr 1fr;
      }
    }
  }
</style>
