import { getGhost, type Ghost } from '@zeepkist/gtr-api'
import {
  BufferGeometry,
  CatmullRomCurve3,
  Line,
  LineBasicMaterial,
  Scene,
  Vector3
} from 'three'

interface GhostInstance {
  ghost: Ghost
  points: Vector3[]
  curve: CatmullRomCurve3
  material: LineBasicMaterial
  geometry: BufferGeometry
  line: Line
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
      ({ position }) => new Vector3(position.x * -1, position.y, position.z)
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

    scene.add(line)

    ghosts.push({ ghost, points, curve, material, geometry, line })
  }

  return { ghosts, totalDuration }
}
