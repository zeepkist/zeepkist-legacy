<script setup lang="ts">
  import ContentSheet from '~/components/sheets/ContentSheet.vue'
  import SteamOpenIdLogin from '~/components/SteamOpenIdLogin.vue'
</script>

<template>
  <content-sheet :class="$style.content">
    <h2>Login with Steam</h2>
    <p>Quick access to personal best times!</p>
    <steam-open-id-login :class="$style.steamLogin" />
  </content-sheet>
</template>

<style module lang="less">
  .content {
    text-align: center;
    height: calc(100% - 2rem);

    .steamLogin {
      margin: 2rem 0 1rem;
    }
  }
</style>
