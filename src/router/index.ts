import { createRouter, createWebHistory } from 'vue-router'

import DashboardView from '@/views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/adventure',
      name: 'adventure',
      component: () => import('@/views/AdventureView.vue')
    },
    {
      path: '/levels',
      name: 'levels',
      component: () => import('@/views/LevelsView.vue')
    },
    {
      path: '/level/:id',
      name: 'level',
      component: () => import('@/views/LevelView.vue')
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('@/views/UsersView.vue')
    },
    {
      path: '/user/:steamId',
      name: 'user',
      component: () => import('@/views/UserView.vue')
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/views/AuthView.vue')
    }
  ]
})

export default router
