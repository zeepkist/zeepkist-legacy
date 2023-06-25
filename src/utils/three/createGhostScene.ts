import {
  AxesHelper,
  Clock,
  PerspectiveCamera,
  Plane,
  PlaneHelper,
  Scene,
  Vector3,
  WebGLRenderer
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export const createGhostScene = () => {
  const renderer = new WebGLRenderer({ alpha: true, antialias: true })
  renderer.setClearAlpha(0)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.shadowMap.enabled = true

  const scene = new Scene()

  const camera = new PerspectiveCamera(
    45,
    renderer.domElement.clientWidth / renderer.domElement.clientHeight,
    0.1,
    10_000
  )
  scene.add(camera)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.screenSpacePanning = true
  //controls.minDistance = 100
  //controls.maxDistance = 500
  controls.maxPolarAngle = Math.PI / 2

  const clock = new Clock()

  const axesHelper = new AxesHelper(50)
  scene.add(axesHelper)

  const plane = new Plane(new Vector3(0, 1, 0), 16)
  const helper = new PlaneHelper(plane, 10_000, 0x0f_0f_0f)
  scene.add(helper)

  return { axesHelper, camera, clock, controls, renderer, scene }
}
