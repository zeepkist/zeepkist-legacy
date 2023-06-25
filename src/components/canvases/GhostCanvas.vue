<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue'

  import {
    createGhosts,
    createGhostScene,
    createSphere,
    formatResultTime
  } from '~/utils'

  export interface Position {
    x: number
    y: number
    z: number
  }

  export interface Quaternion {
    x: number
    y: number
    z: number
    w: number
  }

  const { ghostUrls = [] } = defineProps<{
    ghostUrls: string[]
  }>()

  const containerRef = ref()

  const { camera, clock, controls, renderer, scene } = createGhostScene()
  const { ghosts, totalDuration } = await createGhosts(scene, ghostUrls)

  let longestGhost = ghosts[0]
  for (const ghost of ghosts) {
    if (ghost.ghost.frameCount > longestGhost.ghost.frameCount) {
      longestGhost = ghost
    }
  }

  const allPoints = ghosts.flatMap(({ points }) => points)
  const { center } = createSphere(scene, allPoints)

  const cameraOffsets = {
    x: 1.5,
    y: 1.5,
    z: 1.5
  }

  let currentFrame = 0
  let currentTime = ref(0)

  onMounted(() => {
    containerRef.value.append(renderer.domElement)

    renderer.setSize(
      containerRef.value.clientWidth,
      containerRef.value.clientHeight
    )

    // Calculate the aspect ratio of the renderer
    const aspectRatio =
      containerRef.value.clientWidth / containerRef.value.clientHeight
    camera.aspect = aspectRatio

    animate()
  })

  onUnmounted(() => {
    renderer.domElement.remove()
  })

  const animateDrawing = () => {
    const elapsedTime = clock.getElapsedTime()
    currentTime.value =
      longestGhost.ghost.frames[0].time +
      (elapsedTime / totalDuration) * totalDuration

    while (
      currentFrame < longestGhost.ghost.frames.length - 1 &&
      longestGhost.ghost.frames[currentFrame + 1].time < currentTime.value
    ) {
      currentFrame++
    }

    const leadingPosition = ghosts[0].points[currentFrame]
    if (leadingPosition) {
      camera.position.set(
        leadingPosition.x * cameraOffsets.x,
        leadingPosition.y * cameraOffsets.y,
        leadingPosition.z * cameraOffsets.z
      )
      //camera.lookAt(leadingPosition)
    } else {
      const position = ghosts[0].points.at(-1) ?? center

      camera.position.set(
        position.x * cameraOffsets.x,
        position.y * cameraOffsets.y,
        position.z * cameraOffsets.z
      )
      //camera.lookAt(position)
    }

    for (const { geometry, material, ghost } of ghosts) {
      const visiblePoints = Math.floor(
        (ghost.frameCount / totalDuration) * totalDuration
      )
      const drawRange = Math.min(visiblePoints, currentFrame + 1)

      material.visible = true
      geometry.setDrawRange(0, drawRange)
    }
  }

  function animate() {
    const hasNextFrame = currentFrame < longestGhost.ghost.frames.length - 1

    if (hasNextFrame) animateDrawing()

    controls.enableZoom = true
    controls.enableRotate = true
    controls.enablePan = true

    camera.updateProjectionMatrix()
    controls.update()
    renderer.render(scene, camera)

    requestAnimationFrame(animate)
  }
</script>

<template>
  <div>{{ formatResultTime(currentTime) }}</div>
  <div ref="containerRef" :class="$style.container"></div>
</template>

<style module lang="less">
  .container {
    z-index: -1;
    width: 100%;
    height: 100%;

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
