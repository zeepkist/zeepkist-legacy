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
import { type Ref } from 'vue'

import soapboxUrl from '~/assets/models/combined_soapbox.stl?url'

export interface GhostInstance {
  ghost: Ghost
  points: Vector3[]
  curve: CatmullRomCurve3
  material: LineBasicMaterial
  geometry: BufferGeometry
  line: Line
  soapbox?: Mesh
}

export const createGhosts = async (
  scene: Scene,
  urls: string[],
  loadedGhosts: Ref<number>
) => {
  const ghosts: (GhostInstance | undefined)[] = []

  let totalDuration = 0

  for (const [index, url] of urls.entries()) {
    const { ghost } = await getGhost(url)

    // TODO: Remove this when the parsing API is updated. Positions seem off in version 3 ghosts
    if (ghost.version === 3) {
      console.warn(
        `Ghost ${index} uses version ${ghost.version}. Not rendering.`
      )
      ghosts.push(undefined)
      continue
    } else {
      console.log(`Ghost ${index} uses version ${ghost.version}`)
    }

    totalDuration = Math.max(totalDuration, ghost.frames.at(-1)?.time ?? 0)

    const points = ghost.frames.map(
      ({ position }) => new Vector3(position.x, position.y, position.z)
    )

    const curve = new CatmullRomCurve3(points, false, 'catmullrom', 0)

    const material = new LineBasicMaterial({
      color: index === 0 ? 0xff_ff_ff : Math.floor(Math.random() * 0xaa_55_aa),
      linecap: 'round',
      linejoin: 'round',
      visible: false
    })

    const geometry = new BufferGeometry().setFromPoints(
      curve.getPoints(ghost.frameCount)
    )

    const line = new Line(geometry, material)

    const loader = new STLLoader()
    loader.load(soapboxUrl, geometry => {
      const soapboxMaterial = new MeshStandardMaterial({
        color: material.color,
        metalness: 0.75,
        roughness: 0.75
      })

      const soapbox = new Mesh(geometry, soapboxMaterial)
      soapbox.position.copy(points[0])
      soapbox.rotation.set(0, -Math.PI / 2, 0)
      soapbox.scale.set(0.5, 0.5, 0.5)

      soapbox.receiveShadow = true
      soapbox.castShadow = true

      scene.add(soapbox)

      const ghostInstance = ghosts[index]
      if (ghostInstance) ghostInstance.soapbox = soapbox
    })

    scene.add(line)

    loadedGhosts.value++

    ghosts.push({
      ghost,
      points,
      curve,
      material,
      geometry,
      line,
      soapbox: undefined
    })
  }

  const filteredGhosts = ghosts.filter(Boolean) as GhostInstance[]

  return { ghosts: filteredGhosts, totalDuration }
}
