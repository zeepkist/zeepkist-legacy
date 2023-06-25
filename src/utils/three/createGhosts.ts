import { getGhost, type Ghost } from '@zeepkist/gtr-api'
import {
  BufferGeometry,
  CatmullRomCurve3,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshStandardMaterial,
  Quaternion,
  Scene,
  Vector3
} from 'three'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'

import soapboxUrl from '~/assets/models/combined_soapbox.stl?url'

interface GhostInstance {
  ghost: Ghost
  points: Vector3[]
  curve: CatmullRomCurve3
  material: LineBasicMaterial
  geometry: BufferGeometry
  line: Line
  soapbox?: Mesh
}

export const createGhosts = async (scene: Scene, urls: string[]) => {
  const ghosts: GhostInstance[] = []

  let totalDuration = 0

  for (const [index, url] of urls.entries()) {
    const { ghost } = await getGhost(url)

    // TODO: Remove this when the parsing API is updated. Positions seem off in version 3 ghosts
    if (ghost.version < 4) continue

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
        metalness: 0.5,
        roughness: 0.5
      })

      const soapbox = new Mesh(geometry, soapboxMaterial)
      soapbox.position.copy(points[0])
      soapbox.rotation.set(0, -Math.PI / 2, 0)
      soapbox.scale.set(0.25, 0.25, 0.25)

      soapbox.receiveShadow = true
      soapbox.castShadow = true

      scene.add(soapbox)

      ghosts[index].soapbox = soapbox
    })

    scene.add(line)

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

  return { ghosts, totalDuration }
}
