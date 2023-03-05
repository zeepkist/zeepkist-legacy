<script setup lang="ts">
  const { message } = defineProps<{
    message: string
  }>()
</script>

<template>
  <h1>Oops!</h1>
  <p>{{ message }}</p>
</template>
