<script setup lang="ts">
  import LoginWithSteamLogo from '~/assets/login-with-steam.png?inline'

  const realm = import.meta.env.PROD
    ? 'https://zeepkist.wopian.me'
    : 'http://localhost:5173'
  const returnTo = import.meta.env.PROD
    ? 'https://zeepkist.wopian.me/auth'
    : 'http://localhost:5173/auth'
</script>

<template>
  <form action="https://steamcommunity.com/openid/login" method="post">
    <input
      type="hidden"
      name="openid.identity"
      value="http://specs.openid.net/auth/2.0/identifier_select" />
    <input
      type="hidden"
      name="openid.claimed_id"
      value="http://specs.openid.net/auth/2.0/identifier_select" />
    <input
      type="hidden"
      name="openid.ns"
      value="http://specs.openid.net/auth/2.0" />
    <input type="hidden" name="openid.mode" value="checkid_setup" />
    <input type="hidden" name="openid.realm" :value="realm" />
    <input type="hidden" name="openid.return_to" :value="returnTo" />
    <button type="submit">
      <img :src="LoginWithSteamLogo" alt="Login with Steam" />
    </button>
  </form>
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
