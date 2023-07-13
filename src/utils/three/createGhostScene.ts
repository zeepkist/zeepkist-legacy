import {
  AmbientLight,
  AxesHelper,
  Clock,
  DirectionalLight,
  Fog,
  GridHelper,
  Mesh,
  MeshPhongMaterial,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  WebGLRenderer
} from 'three'
import { MapControls } from 'three/examples/jsm/controls/MapControls.js'

import { IS_DEV } from '~/configs'

export const createGhostScene = () => {
  const renderer = new WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = PCFSoftShadowMap

  const scene = new Scene()

  const size = 5000
  const ground = new Mesh(
    new PlaneGeometry(size, size),
    new MeshPhongMaterial({
      color: 0x11_11_11,
      depthWrite: false,
      transparent: true,
      opacity: 0.2
    })
  )
  ground.rotation.x = -Math.PI / 2
  scene.add(ground)

  const grid = new GridHelper(size, size / 16, 0x00_00_00, 0x00_00_00)
  scene.add(grid)

  scene.fog = new Fog(0x15_15_15, size / 2, size)

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

  const directionalLight = new DirectionalLight(0xff_cc_00)
  directionalLight.castShadow = true
  directionalLight.shadow.camera.top = 512
  directionalLight.shadow.camera.bottom = -258
  directionalLight.shadow.camera.left = -258
  directionalLight.shadow.camera.right = 258
  scene.add(directionalLight)

  return {
    axesHelper,
    camera,
    clock,
    controls,
    renderer,
    scene,
    directionalLight,
    ground,
    grid
  }
}
