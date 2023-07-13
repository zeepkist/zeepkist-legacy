import { Mesh, MeshBasicMaterial, Sphere, SphereGeometry, Vector3 } from 'three'

export const createSphere = (points: Vector3[]) => {
  const { center, radius } = new Sphere().setFromPoints(points)
  const material = new MeshBasicMaterial({ wireframe: true, color: 0xff_00_00 })
  const geometry = new SphereGeometry(radius, 32, 32)
  const sphere = new Mesh(geometry, material)

  sphere.position.copy(center)

  return { sphere, center, radius }
}
