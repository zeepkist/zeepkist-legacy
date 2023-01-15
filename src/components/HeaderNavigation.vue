<script setup lang="ts">
  import { RouterLink } from 'vue-router'

  import { useSteamStore } from '@/stores/steam'

  import SteamOpenIdLogin from './SteamOpenIdLogin.vue'

  const steamStore = useSteamStore()
</script>

<template>
  <header>
    <div class="wrapper">
      <router-link :to="{ name: 'dashboard' }"
        ><img
          alt="Zeepkist logo"
          class="logo"
          src="@/assets/zeepkist-logo.webp"
          height="32"
      /></router-link>

      <nav>
        <router-link :to="{ name: 'dashboard' }">Dashboard</router-link>
        <router-link :to="{ name: 'adventure' }">Adventure Levels</router-link>
        <router-link :to="{ name: 'levels' }">Levels</router-link>
        <router-link :to="{ name: 'users' }">Users</router-link>
        <router-link :to="{ name: 'super-league' }">Super League</router-link>
      </nav>

      <nav class="login">
        <steam-open-id-login v-if="!steamStore.steamId" />
        <div v-else>
          <router-link :to="{ name: 'settings' }">Settings</router-link>
          <router-link
            :to="{ name: 'user', params: { steamId: steamStore.steamId } }">
            Your Profile
          </router-link>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped lang="less">
  header {
    background-color: var(--color-navigation);
    padding: 0.75rem 0;
    line-height: 1.5;
    font-size: 16px;
    position: sticky;
    top: 0;
    z-index: 999;
  }

  .wrapper {
    padding: 0 1.5rem;
    max-width: 1280px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    place-items: center;
  }

  .logo {
    margin-right: 1rem;
  }

  nav {
    flex: 1;
  }

  nav.login {
    display: flex;
    justify-content: flex-end;
  }

  nav a:not(:last-of-type) {
    margin-right: 0.5rem;
  }

  nav a.router-link-exact-active {
    background: var(--color-button-hover);
    color: var(--black);
  }

  nav a:hover {
    background: var(--color-button-hover);
    color: var(--black);
  }

  nav a {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: var(--border-radius);
    font-weight: 600;
  }
</style>
