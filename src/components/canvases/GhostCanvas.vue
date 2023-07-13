<script setup lang="ts">
  import {
    IconPlayerPauseFilled,
    IconPlayerPlayFilled,
    IconPlayerSkipBackFilled,
    IconPlayerSkipForwardFilled
  } from '@tabler/icons-vue'
  import { type Ghost } from '@zeepkist/gtr-api'
  import {
    MeshStandardMaterial,
    Quaternion,
    Vector3
  } from 'three'
  import Stats from 'three/examples/jsm/libs/stats.module.js'
  import { onMounted, onUnmounted, ref } from 'vue'

  import { IS_DEV } from '~/configs/index.js'
  import {
    createGhosts,
    createGhostScene,
    createSphere,
    formatResultTime,
    type GhostInstance
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

  const hasStartedAnimating = ref(false)
  const hasFinishedAnimating = ref(false)

  const emit = defineEmits<{
    progress: [
      progress: {
        progress: number
        loaded: number
        total: number
      }
    ]
  }>()

  const { ghosts, totalDuration } = await createGhosts(scene, ghostUrls, emit)

  let longestGhost = ghosts[0]
  for (const ghost of ghosts) {
    if (ghost.ghost.frameCount > longestGhost.ghost.frameCount) {
      longestGhost = ghost
    }
  }

  const allPoints = ghosts.flatMap(({ points }) => points)
  const { center } = createSphere(allPoints)

  let animationId: number | undefined
  let stats: Stats
  let currentFrame = 0
  const currentTime = ref(0)

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
    ground.position.y = -4

    grid.position.copy(center)
    grid.position.y = -4

    if (IS_DEV) {
      stats = new Stats()
      document.body.append(stats.dom)
    }
  })

  // TODO: Look into why the canvas is not being cleaned up properly
  onUnmounted(() => {
    onPause()
    if (animationId) cancelAnimationFrame(animationId)
    renderer.domElement.remove()
    if (IS_DEV) stats.dom.remove()
  })

  // TODO: Properly type arguments instead of using any
  const updateCameraTarget = (
    ghosts: GhostInstance[],
    currentFrame: number,
    controls: any,
    center: any
  ) => {
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
  }

  // TODO: Properly type arguments instead of using any
  const updateSoapbox = (
    soapbox: any,
    points: any[],
    ghost: Ghost,
    currentFrame: number,
    colour: number
  ) => {
    const position = points[currentFrame]
      ? (points[currentFrame] as Vector3)
      : (points.at(-3) as Vector3)

    let quaternion = ghost.frames[currentFrame]
      ? (ghost.frames[currentFrame].quaternion as Quaternion)
      : (ghost.frames.at(-3)?.quaternion as Quaternion)

    const isBraking = ghost.frames[currentFrame]
      ? ghost.frames[currentFrame].isBraking
      : ghost.frames.at(-3)?.isBraking

    const isArmsUp = ghost.frames[currentFrame]
      ? ghost.frames[currentFrame].isArmsUp
      : ghost.frames.at(-3)?.isArmsUp

    soapbox.position.copy(position)

    if (quaternion) soapbox.quaternion.copy(quaternion)

    if (soapbox.material instanceof MeshStandardMaterial) {
      soapbox.material.color.set(isBraking ? 0xff_00_00 : colour)
      soapbox.material.wireframe = !!isArmsUp
    }
  }

  // TODO: Properly type arguments instead of using any
  const updateGeometry = (geometry: any, drawRange: number) => {
    geometry.setDrawRange(0, drawRange)
  }

  const animateDrawing = () => {
    currentTime.value = clock.getElapsedTime()

    while (
      currentFrame < longestGhost.ghost.frames.length - 1 &&
      longestGhost.ghost.frames[currentFrame + 1].time < currentTime.value
    ) {
      currentFrame++
    }

    updateCameraTarget(ghosts, currentFrame, controls, center)

    for (const {
      geometry,
      material,
      ghost,
      soapbox,
      points,
      colour
    } of ghosts) {
      const visiblePoints = Math.floor(
        (ghost.frameCount / totalDuration) * totalDuration
      )

      if (soapbox) {
        updateSoapbox(soapbox, points, ghost, currentFrame, colour)
      }

      material.visible = true
      updateGeometry(geometry, Math.min(visiblePoints, currentFrame + 1))
    }
  }

  const animate = () => {
    animationId = undefined
    const hasNextFrame = currentFrame < longestGhost.ghost.frames.length - 1

    if (hasNextFrame) animateDrawing()
    else {
      hasFinishedAnimating.value = true
      isPaused.value = true
    }

    controls.enableZoom = true
    controls.enableRotate = true
    controls.enablePan = true

    camera.updateProjectionMatrix()
    controls.update()
    renderer.render(scene, camera)

    if (IS_DEV) stats.update()

    if (!animationId) {
      animationId = requestAnimationFrame(animate)
    }
  }

  const onStart = () => {
    if (hasStartedAnimating.value) return
    hasStartedAnimating.value = true

    clock.start()
    animate()
  }

  const onReplay = () => {
    isPaused.value = false
    hasStartedAnimating.value = false
    pauseTimes = []
    pauseTime = 0
    currentFrame = 0
    currentTime.value = 0

    for (const { geometry, material } of ghosts) {
      material.visible = false
      geometry.setDrawRange(0, 0)
    }

    onStart()
  }

  const isPaused = ref(false)
  let pauseTime = 0
  let pauseTimes: number[] = []

  const onPause = () => {
    isPaused.value = true
    pauseTimes.push(clock.getElapsedTime())

    clock.stop()
  }

  const onResume = () => {
    if (currentFrame === longestGhost.ghost.frames.length - 1) {
      currentFrame = 0
    }

    isPaused.value = false
    pauseTime = pauseTimes.pop() ?? 0

    clock.start()
    clock.elapsedTime = pauseTime
  }

  const onSkip = () => {
    clock.elapsedTime = totalDuration
  }
</script>

<template>
  <div v-if="!hasStartedAnimating" :class="$style.preloader">
    <div>Replay with {{ ghostUrls.length }} ghosts</div>
    <div>Selected ghost is the white soapbox</div>
    <br />
    <div>Soapboxes turn red while braking</div>
    <div>Soapboxes become a wireframe while holding arms up</div>
    <br />
    <button @click="onStart">Start Replay</button>
  </div>
  <div v-else :class="$style.replay">
    <div>{{ formatResultTime(currentTime) }}</div>
    <div :class="$style.controls">
      <button @click="onReplay">
        <icon-player-skip-back-filled />
      </button>
      <button v-if="!isPaused" @click="onPause">
        <icon-player-pause-filled />
      </button>
      <button v-else @click="onResume">
        <icon-player-play-filled />
      </button>
      <button @click="onSkip">
        <icon-player-skip-forward-filled />
      </button>
    </div>
  </div>

  <div ref="containerRef" :class="$style.container"></div>
</template>

<style module lang="less">
  .preloader,
  .container {
    width: 100%;
    height: 100%;

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .container {
    z-index: -1;
  }

  .preloader {
    display: flex;
    flex-direction: column;
    justify-content: center;
    place-content: center;
    align-items: center;
    text-align: center;
    gap: 1rem;

    button {
      cursor: pointer;
    }
  }

  .replay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    text-align: center;

    .controls {
      margin-top: 1rem;
      display: flex;
      justify-content: center;
      gap: 1rem;
    }

    button {
      cursor: pointer;
      background: transparent;
      color: #fff;
      border: none;

      &:hover {
        color: rgb(var(--link-5));
      }
    }
  }
</style>
