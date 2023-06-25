import {
  Mesh,
  MeshBasicMaterial,
  Scene,
  Sphere,
  SphereGeometry,
  Vector3
} from 'three'

export const createSphere = (scene: Scene, points: Vector3[]) => {
  const boundingSphere = new Sphere().setFromPoints(points)

  const material = new MeshBasicMaterial({
    wireframe: true,
    color: 0xff_00_00
  })

  const geometry = new SphereGeometry(boundingSphere.radius, 32, 32)

  const sphere = new Mesh(geometry, material)
  sphere.position.copy(boundingSphere.center)

  return {
    sphere,
    center: boundingSphere.center,
    radius: boundingSphere.radius
  }
}
