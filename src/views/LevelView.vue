<script setup lang="ts">
  import { getLevels, type Level } from '@zeepkist/gtr-api'
  import { HTTPError } from 'ky'
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'

  import ErrorLayout from '~/components/layouts/ErrorLayout.vue'
  import LevelLayout from '~/components/layouts/LevelLayout.vue'
  import LoadingIndicator from '~/components/LoadingIndicator.vue'
  import ContentSheet from '~/components/sheets/ContentSheet.vue'

  const route = useRoute()
  const id = Number(route.params.id)

  const level = ref<Level>()

  try {
    const { levels } = await getLevels({ Id: id })
    if (levels.length === 1) {
      level.value = levels[0]
    }
  } catch (error) {
    if (error instanceof HTTPError && error.response.status === 404) {
      level.value = undefined
    } else {
      console.error(error)
    }
  }
</script>

<template>
  <content-sheet>
    <suspense>
      <level-layout v-if="level" :level="level" />
      <error-layout
        v-else
        message="Level not found. It may not have been played by a user with Zeepkist GTR installed yet!" />
      <template #fallback>
        <loading-indicator />
      </template>
    </suspense>
  </content-sheet>
</template>
