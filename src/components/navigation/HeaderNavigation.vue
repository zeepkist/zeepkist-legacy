<script setup lang="ts">
  import { watch } from 'vue'

  import DesktopNavbar from '~/components/navigation/header/DesktopNavbar.vue'
  import MobileNavbar from '~/components/navigation/header/MobileNavbar.vue'
  import type { MenuItem } from '~/models/ui/navbar'
  import { useSteamStore } from '~/stores/steam'

  const { isMobile } = defineProps<{
    isMobile: boolean
  }>()

  const steamStore = useSteamStore()

  const menuItems: MenuItem[] = [
    {
      key: '1',
      label: 'home',
      to: { name: 'dashboard' }
    },
    {
      key: '2',
      label: 'adventure mode',
      to: { name: 'adventure' }
    },
    {
      key: '3',
      label: 'levels',
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
    },
    {
      key: '7',
      label: 'profile',
      to: { name: 'user', params: { steamId: steamStore.steamId } }
    },
    {
      key: '8',
      label: 'settings',
      to: { name: 'settings' }
    }
  ]

  watch(
    () => steamStore.steamId,
    () => {
      const profile = menuItems.find(item => item.key === '7')
      if (!profile?.to?.params) return
      profile.to.params.steamId = steamStore.steamId
    }
  )
</script>

<template>
  <mobile-navbar v-if="isMobile" :menu-items="menuItems" />
  <desktop-navbar
    v-else
    :menu-items="menuItems"
    :steam-id="steamStore.steamId"
    :on-logout="steamStore.logout" />
</template>
