<script setup lang="ts">
  import { IconMenu2, IconX } from '@tabler/icons-vue'
  import { ref, watch } from 'vue'
  import {
    type RouteLocationRaw,
    RouterLink,
    useRoute,
    useRouter
  } from 'vue-router'

  import ZeepkistIcon from '~/assets/zeepkist-icon.webp?inline'
  import { useSteamStore } from '~/stores/steam'

  import SteamOpenIdLogin from '../SteamOpenIdLogin.vue'

  const { isMobile } = defineProps<{
    isMobile: boolean
  }>()

  const route = useRoute()
  const router = useRouter()
  const steamStore = useSteamStore()

  const menuItems = [
    {
      key: '1',
      label: 'home',
      to: { name: 'dashboard' }
    },
    {
      key: '2',
      label: 'adventure levels',
      to: { name: 'adventure' }
    },
    {
      key: '3',
      label: 'workshop levels',
      to: { name: 'levels' }
    },
    {
      key: '4',
      label: 'users',
      to: { name: 'users' }
    },
    {
      key: '5',
      label: 'super league',
      to: { name: 'super-league' }
    }
  ]

  const showMenu = ref(false)
  const isLargeHeader = ref(window.scrollY < 90)
  const defaultSelectedKey = ref(
    menuItems.find(item => item.to.name === route.name)?.key || '1'
  )
  const selectedKey = ref<[string | undefined]>([defaultSelectedKey.value])

  watch(
    () => route.name,
    () => {
      console.log('route.name', route.name)
      selectedKey.value = [
        menuItems.find(item => item.to.name === route.name)?.key || undefined
      ]
    }
  )

  const handleScroll = () => {
    isLargeHeader.value = window.scrollY < 90
  }

  const handleToggleMenu = () => {
    showMenu.value = !showMenu.value
  }

  const handleClick = (to: RouteLocationRaw) => {
    if (isMobile) showMenu.value = false
    router.push(to)
  }

  window.addEventListener('scroll', handleScroll)
</script>

<template>
  <div v-if="isMobile" :class="$style.mobileHeader">
    <img
      :src="ZeepkistIcon"
      alt=""
      :class="[$style.logo, $style.mobileLogo]" />
    Zeepkist
  </div>
  <button v-if="isMobile" :class="$style.toggleMenu" @click="handleToggleMenu">
    <icon-x v-if="showMenu" />
    <icon-menu-2 v-else />
  </button>
  <a-menu
    v-show="!isMobile || showMenu"
    v-model:selected-keys="selectedKey"
    :class="
      isMobile
        ? [$style.verticalHeader]
        : [$style.header, { [$style.largeHeader]: isLargeHeader }]
    "
    :mode="isMobile ? 'vertical' : 'horizontal'">
    <a-menu-item v-if="!isMobile" key="1" :class="$style.logoContainer">
      <router-link :to="{ name: 'dashboard' }">
        <img
          :src="ZeepkistIcon"
          alt=""
          :class="[$style.logo, isMobile && $style.mobileLogo]" />
      </router-link>
    </a-menu-item>
    <a-menu-item
      v-for="item in menuItems"
      :key="item.key"
      :style="
        isMobile &&
        item.key === '1' && {
          marginTop: '4rem'
        }
      "
      @click="handleClick(item.to)">
      <router-link :to="item.to">
        {{ item.label }}
      </router-link>
    </a-menu-item>
    <a-menu-item key="6">
      <a
        href="https://toolkist.zeepki.st"
        target="_blank"
        rel="noopener noreferrer">
        toolkist
      </a>
    </a-menu-item>
    <a-menu-item v-if="!steamStore.steamId" key="7" :class="$style.headerRight">
      <steam-open-id-login />
    </a-menu-item>
    <a-menu-item
      v-if="steamStore.steamId"
      key="7"
      @click="handleClick({ name: 'settings' })">
      <router-link :to="{ name: 'settings' }">settings</router-link>
    </a-menu-item>
    <a-menu-item
      v-if="steamStore.steamId"
      key="8"
      @click="
        handleClick({ name: 'user', params: { steamId: steamStore.steamId } })
      ">
      <router-link
        :to="{ name: 'user', params: { steamId: steamStore.steamId } }">
        profile
      </router-link>
    </a-menu-item>
  </a-menu>
</template>

<style module lang="less">
  .mobileHeader,
  .toggleMenu,
  .header,
  .verticalHeader {
    position: absolute;
  }

  .mobileHeader {
    padding: 0.5rem 0 0.5rem 1rem;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1.25rem;
    color: var(--color-text-1);
    font-weight: 700;
    z-index: 999;
    background: var(--color-bg-2);
  }

  .mobileLogo {
    max-height: 50px;
  }

  :global(.arco-menu-item) {
    display: flex;
    a {
      flex: 1;
    }
  }

  .toggleMenu {
    background: none;
    border: none;
    color: var(--color-text-1);
    top: 1.375rem;
    right: 1rem;
    z-index: 999;
    cursor: pointer;
  }

  .verticalHeader,
  .header {

    :global(.arco-menu-item) {
      color: var(--color-text-1);

      &:not(:global(.arco-menu-selected)):hover {
        color: rgb(var(--primary-6));
      }

      &:global(.arco-menu-selected) {
        color: rgb(var(--primary-6));
      }

      a {
        color: inherit;
      }
    }
  }

  .header > :global(.arco-menu-inner) {
    max-width: 1300px;
    margin: 0 auto;
    padding: 0;

    .logoContainer {
      padding: 0 1rem 0 0;
    }

    :global(.arco-menu-overflow-wrap) {
      display: flex;
      place-items: center;
      height: 100%;
      overflow: hidden;
    }

    :global(.arco-menu-item) {
      font-weight: 400;
      font-size: 0.75rem;
      margin-left: 0;
      height: 100%;
      background: none;

      display: flex;
      vertical-align: middle;
      place-content: center;
      place-items: center;

      &:hover,
      &:global(.arco-menu-selected):hover {
        background: none;
      }

      a {
        height: 50px;
        line-height: 50px;
      }
    }
  }

  .header {
    background: var(--color-bg-2);
    border-bottom: 1px solid var(--color-border);
    height: 50px;

    transform: translateZ(0);
    transition: height 0.3s, background-color 0.3s;

    &.largeHeader {
      background: transparent;
      border-bottom-color: transparent;
      height: 90px;

      .logo {
        height: calc(90px - 2rem);
      }
      :global(.arco-menu-item) {
        a {
          height: 90px;
          line-height: 90px;
        }
      }
    }

    .logo {
      height: calc(50px - 1rem);
      transform: translateZ(0);
      transition: height 0.3s;
      vertical-align: middle;
    }
  }
</style>
