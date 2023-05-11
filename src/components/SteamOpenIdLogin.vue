<script setup lang="ts">
  const returnTo = import.meta.env.PROD
    ? 'https://zeepki.st/auth'
    : 'http://localhost:5173/auth'
</script>

<template>
  <a
    :href="`https://auth.zeepkist-gtr.com/external/login?redirectUrl=${returnTo}`"
    >login</a
  >
</template>

<style scoped lang="less">
  form button {
    border: none;
    background: none;
    display: flex;
    margin: 0 auto;

    img {
      cursor: pointer;
    }
  }
</style>
