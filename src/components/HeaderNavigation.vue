<script setup lang="ts">
  import { RouterLink } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <img
        alt="Zeepkist logo"
        class="logo"
        src="@/assets/zeepkist-logo.webp"
        height="32" />

      <nav>
        <router-link :to="{ name: 'dashboard' }">Dashboard</router-link>
        <router-link :to="{ name: 'adventure' }">Adventure Levels</router-link>
        <router-link :to="{ name: 'levels' }">Levels</router-link>
        <router-link :to="{ name: 'users' }">Users</router-link>
      </nav>
    </div>
  </header>
</template>

<style scoped lang="less">
  header,
  .wrapper,
  img,
  nav,
  a {
    //border: 1px solid var(--color-border);
  }

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

  nav a:not(:last-of-type) {
    margin-right: 0.5rem;
  }

  nav {
    justify-content: flex-start;
    flex: 1;
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

  /*
  @media (min-width: 1024px) {
    nav {
      text-align: left;
      margin-left: -1rem;
      font-size: 1rem;

      padding: 1rem 0;
      margin-top: 1rem;
    }
  }
  */
</style>
