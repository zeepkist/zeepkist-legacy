<script setup lang="ts">
  import { ref } from 'vue'
  import { RouterLink } from 'vue-router'

  import ZeepkistIcon from '~/assets/zeepkist-icon.webp?inline'
  import SteamOpenIdLogin from '~/components/SteamOpenIdLogin.vue'
  import type { MenuItem } from '~/models/ui/navbar'

  const { menuItems, steamId, onLogout } = defineProps<{
    menuItems: MenuItem[]
    steamId?: string
    onLogout: () => void
  }>()

  const isLargeHeader = ref(window.scrollY < 90)

  const handleScroll = () => {
    isLargeHeader.value = window.scrollY < 90
  }

  window.addEventListener('scroll', handleScroll)
</script>

<template>
  <nav :class="[$style.header, { [$style.largeHeader]: isLargeHeader }]">
    <div :class="$style.content">
      <div :class="$style.left">
        <router-link :to="{ name: 'dashboard' }">
          <img :src="ZeepkistIcon" alt="" :class="[$style.logo]" />
        </router-link>
        <router-link
          v-for="item in menuItems.slice(0, -2)"
          :key="item.key"
          :to="item.to">
          {{ item.label }}
        </router-link>
      </div>
      <div v-if="!steamId" :class="$style.right">
        <steam-open-id-login />
      </div>
      <div v-else :class="$style.right">
        <router-link
          v-for="item in menuItems.slice(-2)"
          :key="item.key"
          :to="item.to">
          {{ item.label }}
        </router-link>
        <button :class="$style.logout" @click="onLogout()">logout</button>
      </div>
    </div>
  </nav>
</template>

<style module lang="less">
  .content {
    max-width: 1300px;
    width: 100%;
    margin: 0 auto;
    display: flex;
  }

  .left,
  .right {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0 1rem;
  }

  .right {
    flex: 1;
    justify-content: flex-end;
  }

  .logo {
    height: calc(50px - 1rem);
    transform: translateZ(0);
    transition: height 0.3s;
    vertical-align: middle;
    margin-right: 0.5rem;
  }

  .header {
    margin: 0 auto;
    position: absolute;
    background: var(--color-bg-2);
    border-bottom: 1px solid var(--color-border);
    height: 50px;

    transform: translateZ(0);
    transition: height 0.3s, background-color 0.3s, line-height 0.3s;

    display: flex;
    width: 100%;
    font-weight: 400;
    font-size: 0.75rem;
    height: 50px;
    line-height: 50px;

    .logout,
    a,
    a:visited {
      display: inline-block;
      color: inherit;
      transition: color 0.3s;
      &:global(.router-link-active),
      &:hover {
        color: rgb(var(--primary-6));
      }
    }

    .logout {
      background: none;
      border: none;
      padding: 0;
      font: inherit;
      cursor: pointer;
      outline: inherit;
    }
  }

  .largeHeader {
    background: transparent;
    border-bottom-color: transparent;
    height: 90px;
    line-height: 90px;

    .logo {
      height: calc(90px - 2rem);
    }
  }
</style>
