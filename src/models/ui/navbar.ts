import type { RouteLocationNamedRaw } from 'vue-router'

export interface MenuItem {
  key: string
  label: string
  to: RouteLocationNamedRaw
}
