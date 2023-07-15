import { getGhost, type Ghost } from '@zeepkist/gtr-api'
import {
  BufferGeometry,
  CatmullRomCurve3,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshStandardMaterial,
  Scene,
  Vector3
} from 'three'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'
import ColorHash from 'color-hash'

import soapboxUrl from '~/assets/models/combined_soapbox.stl?url'

export interface GhostInstance {
  ghost: Ghost
  points: Vector3[]
  curve: CatmullRomCurve3
  material: LineBasicMaterial
  geometry: BufferGeometry
  line: Line
  colour: number
  soapbox?: Mesh
}

const colourHash = new ColorHash({
  lightness: [0.35, 0.5, 0.65],
  saturation: [0.35, 0.5, 0.65]
})

function* chunks(items: string[]) {
  let index = 0
  const count = 4
  for (; index < items.length; index++) {
    yield items.slice(index, index + count)
    index += count - 1
  }

  return []
}

const soapboxGeometry = await new Promise<BufferGeometry>((resolve, reject) => {
  const loader = new STLLoader()
  loader.load(soapboxUrl, resolve, undefined, reject)
})

export const createGhosts = async (scene: Scene, urls: string[], emit: any) => {
  const ghosts: (GhostInstance | undefined)[] = []

  let totalGhosts = urls.length
  let loadedGhosts = 0
  let totalDuration = 0
  let chunkIndex = 0

  for (const chunk of chunks(urls)) {
    chunkIndex += 1

    await Promise.all(chunk.map(async (url, index) => {
      const ghostIndex = (chunkIndex - 1) * 4 + index
      const { ghost } = await getGhost(url)

      // TODO: Remove this when the parsing API is updated. Positions seem off in version 3 ghosts
      if (ghost.version < 4) {
        console.warn(
          `Ghost ${ghostIndex} uses version ${ghost.version}. Not rendering.`
        )
        ghosts.push(undefined)
        totalGhosts -= 1
        return
      }

      totalDuration = Math.max(totalDuration, ghost.frames.at(-1)?.time ?? 0)

      // TODO: Hash by ghost steamId
      const colour =
        ghostIndex === 0 ? 0xff_ff_ff : Number.parseInt(colourHash.hex(ghostIndex.toString()).replace('#', '0x'))

      const points = ghost.frames.map(
        ({ position }) => new Vector3(position.x, position.y, position.z)
      )

      const curve = new CatmullRomCurve3(points, false, 'catmullrom', 0)

      const material = new LineBasicMaterial({
        color: colour,
        linecap: 'round',
        linejoin: 'round',
        visible: false
      })

      const geometry = new BufferGeometry().setFromPoints(
        curve.getPoints(ghost.frameCount)
      )

      const line = new Line(geometry, material)

      const soapboxMaterial = new MeshStandardMaterial({
        color: material.color,
        metalness: 0.75,
        roughness: 0.75
      })

      const soapbox = new Mesh(soapboxGeometry, soapboxMaterial)
      soapbox.rotation.set(0, -Math.PI / 2, 0)
      soapbox.scale.set(0.5, 0.5, 0.5)
      soapbox.receiveShadow = true
      soapbox.castShadow = true



      scene.add(line)
      scene.add(soapbox)

      loadedGhosts += 1

      emit('progress', {
        progress: Math.ceil((loadedGhosts / totalGhosts) * 100),
        loaded: loadedGhosts,
        total: totalGhosts
      })

      ghosts.push({
        ghost,
        points,
        curve,
        material,
        geometry,
        line,
        colour,
        soapbox
      })
    }))
  }

  const filteredGhosts = ghosts.filter(Boolean) as GhostInstance[]

  emit('progress', {
    progress: 100,
    loaded: ghosts.length,
    total: totalGhosts
  })

  return { ghosts: filteredGhosts, totalDuration }
}
