<script setup lang="ts">
  import { isBefore } from 'date-fns'
  import { watch } from 'vue'

  import DesktopNavbar from '~/components/navigation/header/DesktopNavbar.vue'
  import MobileNavbar from '~/components/navigation/header/MobileNavbar.vue'
  import type { MenuItem } from '~/models/ui/navbar'
  import { useAuthenticationStore } from '~/stores/authentication'

  const { isMobile } = defineProps<{
    isMobile: boolean
  }>()

  const authStore = useAuthenticationStore()

  if (authStore.RefreshExpiry && authStore.AccessExpiry) {
    const refreshExpiresAt = new Date(authStore.RefreshExpiry)
    const accessExpiresAt = new Date(authStore.AccessExpiry)

    if (isBefore(refreshExpiresAt, Date.now())) {
      authStore.logout()
    } else if (isBefore(accessExpiresAt, Date.now())) {
      authStore.refresh()
    }
  }

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
      to: { name: 'user', params: { steamId: authStore.SteamId } }
    },
    {
      key: '8',
      label: 'settings',
      to: { name: 'settings' }
    }
  ]

  watch(
    () => authStore.SteamId,
    () => {
      const profile = menuItems.find(item => item.key === '7')
      if (!profile?.to?.params) return
      profile.to.params.steamId = authStore.SteamId
    }
  )
</script>

<template>
  <mobile-navbar v-if="isMobile" :menu-items="menuItems" />
  <desktop-navbar
    v-else
    :menu-items="menuItems"
    :steam-id="authStore.SteamId"
    :on-logout="authStore.logout" />
</template>
