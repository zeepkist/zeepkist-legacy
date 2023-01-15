<template>
  <div class="columns">
    <div class="column">
      <slot name="left" />
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
    }
  }
</style>
