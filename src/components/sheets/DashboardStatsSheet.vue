<script setup lang="ts">
  import ContentSheet from '~/components/sheets/ContentSheet.vue'

  const { levels, records, worldRecords } = defineProps<{
    levels?: number
    records?: number
    worldRecords?: number
  }>()
</script>

<template>
  <content-sheet style="height: calc(100% - 2rem); text-align: center">
    <h2>Stats</h2>
    <a-space size="large">
      <a-statistic
        title="Levels"
        :value="levels"
        animation
        show-group-seperator />
      <a-statistic
        title="Records"
        :value="records"
        animation
        show-group-seperator />
      <a-statistic
        title="World Records"
        :value="worldRecords"
        animation
        show-group-seperator />
    </a-space>
  </content-sheet>
</template>
