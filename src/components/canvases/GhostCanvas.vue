<script setup lang="ts">
  import { Quaternion, Vector3 } from 'three'
  import Stats from 'three/examples/jsm/libs/stats.module.js'
  import { onMounted, onUnmounted, ref } from 'vue'

  import { IS_DEV } from '~/configs/index.js'
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

  const { ghostUrls = [] } = defineProps<{
    ghostUrls: string[]
  }>()

  const containerRef = ref()

  const {
    axesHelper,
    camera,
    clock,
    controls,
    renderer,
    scene,
    directionalLight,
    ground,
    grid
  } = createGhostScene()
  const { ghosts, totalDuration } = await createGhosts(scene, ghostUrls)

  let longestGhost = ghosts[0]
  for (const ghost of ghosts) {
    if (ghost.ghost.frameCount > longestGhost.ghost.frameCount) {
      longestGhost = ghost
    }
  }

  const allPoints = ghosts.flatMap(({ points }) => points)
  const { center } = createSphere(scene, allPoints)

  let currentFrame = 0
  let currentTime = ref(0)

  let stats: Stats

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

    camera.zoom = 1.5

    camera.position.copy(center)
    axesHelper.position.copy(center)

    directionalLight.position.copy(center)
    directionalLight.position.y += 50

    ground.position.copy(center)
    ground.position.y = 0

    grid.position.copy(center)
    grid.position.y = 0.01

    if (IS_DEV) {
      stats = new Stats()
      document.body.append(stats.dom)
    }

    animate()
  })

  onUnmounted(() => {
    renderer.domElement.remove()
    if (IS_DEV) stats.dom.remove()
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
      controls.target.set(
        leadingPosition.x,
        leadingPosition.y,
        leadingPosition.z
      )
    } else {
      const position = ghosts[0].points.at(-1) ?? center
      controls.target.set(position.x, position.y, position.z)
    }

    for (const { geometry, material, ghost, soapbox, points } of ghosts) {
      const visiblePoints = Math.floor(
        (ghost.frameCount / totalDuration) * totalDuration
      )
      const drawRange = Math.min(visiblePoints, currentFrame + 1)

      if (soapbox) {
        const position = points[currentFrame]
          ? (points[currentFrame] as Vector3)
          : (points.at(-3) as Vector3)
        soapbox.position.copy(position)

        let quaternion = ghost.frames[currentFrame]
          ? (ghost.frames[currentFrame].quaternion as Quaternion)
          : (ghost.frames.at(-3)?.quaternion as Quaternion)
        if (quaternion) soapbox.quaternion.copy(quaternion)
      }

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

    if (IS_DEV) stats.update()

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
