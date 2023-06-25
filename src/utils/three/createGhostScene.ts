import {
  AmbientLight,
  AxesHelper,
  Clock,
  PCFSoftShadowMap,
  PerspectiveCamera,
  Plane,
  PlaneHelper,
  Scene,
  Vector3,
  WebGLRenderer
} from 'three'
import { MapControls } from 'three/examples/jsm/controls/MapControls.js'

import { IS_DEV } from '~/configs'

export const createGhostScene = () => {
  const renderer = new WebGLRenderer({ alpha: true, antialias: true })
  renderer.setClearAlpha(0)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)

  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = PCFSoftShadowMap

  const scene = new Scene()

  const camera = new PerspectiveCamera(
    45,
    renderer.domElement.clientWidth / renderer.domElement.clientHeight,
    0.1,
    10_000
  )
  scene.add(camera)

  const controls = new MapControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.screenSpacePanning = true

  const ambientLight = new AmbientLight(0xff_ff_ff, 0.5)
  scene.add(ambientLight)

  const clock = new Clock()

  const axesHelper = new AxesHelper(50)

  if (IS_DEV) {
    scene.add(axesHelper)
  }

  const plane = new Plane(new Vector3(0, 1, 0), 16)
  const helper = new PlaneHelper(plane, 10_000, 0x0f_0f_0f)
  helper.receiveShadow = true
  scene.add(helper)

  return { axesHelper, camera, clock, controls, renderer, scene }
}
