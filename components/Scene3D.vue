<template>
  <div
    ref="containerRef"
    class="scene-3d"
    :class="{ 'scene-3d--fixed': fixed }"
    aria-hidden="true"
  />
</template>

<script setup lang="ts">
import type {
  BufferGeometry,
  Group,
  Line,
  Material,
  Object3D,
  PerspectiveCamera,
  Points,
  Scene,
  WebGLRenderer,
} from 'three'

const props = withDefaults(
  defineProps<{
    scrollProgress?: number
    fixed?: boolean
    fullscreen?: boolean
  }>(),
  {
    scrollProgress: 0,
    fixed: false,
    fullscreen: false,
  },
)

const containerRef = ref<HTMLDivElement | null>(null)

const TEAL_DEEP = 0x1a6b5c
const TEAL_BRIGHT = 0x22a088
const TEAL_PARTICLE_LIGHT = 0x0a4a3c

let particleCount = 2048
let lineCount = 40


function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value))
}

let renderer: WebGLRenderer | null = null
let scene: Scene | null = null
let camera: PerspectiveCamera | null = null
let mainGroup: Group | null = null
let particleGroup: Group | null = null
let particlePoints: Points | null = null
let particleBasePositions: Float32Array | null = null
let connectionLines: Line[] = []
let linePhases: number[] = []
let animationFrameId = 0
let resizeObserver: ResizeObserver | null = null
let isVisible = true
let isDisposed = false
let isMobilePerfMode = false
let skipFlagWave = false

const mouse = { x: 0, y: 0 }
const targetMouse = { x: 0, y: 0 }
const cameraTarget = { x: 0, y: 0, z: 5.5 }

const internalScroll = ref(0)
let elapsed = 0
let lastFrameTime = 0
let flagMesh: import('three').Mesh | null = null
let flagBasePositions: Float32Array | null = null
let flagHalfWidth = 1
let outerWireMaterial: import('three').MeshBasicMaterial | null = null
let particleMaterialRef: import('three').PointsMaterial | null = null
let particleStarTexture: import('three').CanvasTexture | null = null

function applySceneTheme(mode: string): void {
  const isLight = mode === 'light'
  if (outerWireMaterial) {
    outerWireMaterial.opacity = isLight ? 0.58 : 0.82
  }
  if (particleMaterialRef) {
    particleMaterialRef.color.setHex(isLight ? TEAL_PARTICLE_LIGHT : TEAL_BRIGHT)
    particleMaterialRef.opacity = isLight ? 0.82 : 0.55
  }
}

const colorMode = useColorMode()

watch(
  () => colorMode.value,
  (mode) => applySceneTheme(mode),
  { immediate: true },
)

const disposables: Array<{
  geometry?: BufferGeometry
  material?: Material | Material[]
  object?: Object3D
}> = []

function trackDisposable(entry: {
  geometry?: BufferGeometry
  material?: Material | Material[]
  object?: Object3D
}): void {
  disposables.push(entry)
}

function sampleSpherePoint(radius: number): [number, number, number] {
  const theta = Math.random() * Math.PI * 2
  const phi = Math.acos(2 * Math.random() - 1)
  const sinPhi = Math.sin(phi)

  return [
    radius * sinPhi * Math.cos(theta),
    radius * Math.cos(phi),
    radius * sinPhi * Math.sin(theta),
  ]
}

function sampleMeshVertices(
  THREE: typeof import('three'),
  mesh: import('three').Mesh,
  sampleCount: number,
  nodes: number[],
): void {
  mesh.updateMatrixWorld(true)
  const temp = new THREE.Vector3()
  const geo = mesh.geometry
  const pos = geo.getAttribute('position')
  const step = Math.max(1, Math.floor(pos.count / sampleCount))

  for (let i = 0; i < pos.count; i += step) {
    temp.fromBufferAttribute(pos, i)
    temp.applyMatrix4(mesh.matrixWorld)
    nodes.push(temp.x, temp.y, temp.z)
  }
}

function createStarParticleTexture(
  THREE: typeof import('three'),
): import('three').CanvasTexture {
  const canvasSize = 64
  const canvas = document.createElement('canvas')
  canvas.width = canvasSize
  canvas.height = canvasSize
  const ctx = canvas.getContext('2d')
  if (!ctx) return new THREE.CanvasTexture(canvas)

  const center = canvasSize / 2
  const outerRadius = canvasSize * 0.34
  const innerRadius = outerRadius * 0.38

  ctx.clearRect(0, 0, canvasSize, canvasSize)
  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  for (let i = 0; i < 10; i++) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius
    const angle = (i / 10) * Math.PI * 2 - Math.PI / 2
    const x = center + Math.cos(angle) * radius
    const y = center + Math.sin(angle) * radius
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.closePath()
  ctx.fill()

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

function loadAvatarImage(): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = reject
    image.src = '/me.png'
  })
}

async function createAvatarCanvas(): Promise<HTMLCanvasElement> {
  const size = 512
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) return canvas

  const image = await loadAvatarImage()
  const radius = size / 2

  ctx.beginPath()
  ctx.arc(radius, radius, radius, 0, Math.PI * 2)
  ctx.closePath()
  ctx.clip()
  ctx.drawImage(image, 0, 0, size, size)

  return canvas
}

function applyFlagWave(time: number): void {
  if (!flagMesh || !flagBasePositions) return

  const geometry = flagMesh.geometry
  const positionAttr = geometry.getAttribute('position')
  const positions = positionAttr.array as Float32Array
  const waveAmplitude = 0.12
  const waveFrequency = 2.6
  const waveSpeed = 2.4

  for (let i = 0; i < positionAttr.count; i++) {
    const i3 = i * 3
    const x = flagBasePositions[i3]
    const y = flagBasePositions[i3 + 1]
    const normalizedX = (x + flagHalfWidth) / (flagHalfWidth * 2)
    const ripple =
      Math.sin(normalizedX * Math.PI * waveFrequency + time * waveSpeed) *
      waveAmplitude *
      normalizedX
    const flutter = Math.sin(y * 5 + time * 1.8) * 0.02 * normalizedX

    positions[i3] = x
    positions[i3 + 1] = y
    positions[i3 + 2] = ripple + flutter
  }

  positionAttr.needsUpdate = true
}

async function buildAvatarGroup(
  THREE: typeof import('three'),
  scale: number,
): Promise<{ group: Group; disposables: Array<{ geometry?: BufferGeometry; material?: Material | Material[]; object?: Object3D }> }> {
  const group = new THREE.Group()
  const localDisposables: Array<{
    geometry?: BufferGeometry
    material?: Material | Material[]
    object?: Object3D
  }> = []

  const avatarSize = 1.85 * scale
  flagHalfWidth = avatarSize / 2

  const canvas = await createAvatarCanvas()
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 4

  const geometry = new THREE.PlaneGeometry(avatarSize, avatarSize, 1, 1)
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
    depthWrite: true,
  })

  const mesh = new THREE.Mesh(geometry, material)
  group.add(mesh)
  flagMesh = mesh

  const positionAttr = geometry.getAttribute('position')
  flagBasePositions = new Float32Array(positionAttr.array.length)
  flagBasePositions.set(positionAttr.array as Float32Array)

  localDisposables.push({ geometry, material, object: mesh })

  return { group, disposables: localDisposables }
}

function collectNodePoints(
  THREE: typeof import('three'),
  outerMesh: Object3D,
  innerObject: Object3D,
): Float32Array {
  const nodes: number[] = []

  sampleMeshVertices(THREE, outerMesh as import('three').Mesh, 24, nodes)

  innerObject.traverse((child) => {
    if ((child as import('three').Mesh).isMesh) {
      sampleMeshVertices(THREE, child as import('three').Mesh, 12, nodes)
    }
  })

  for (let i = 0; i < 16; i++) {
    const [x, y, z] = sampleSpherePoint(2.4 + Math.random() * 0.8)
    nodes.push(x, y, z)
  }

  return new Float32Array(nodes)
}

function buildConnectionLines(
  THREE: typeof import('three'),
  nodePositions: Float32Array,
  parent: Group,
): void {
  const nodeCount = nodePositions.length / 3
  if (nodeCount < 2) return

  for (let i = 0; i < lineCount; i++) {
    const a = Math.floor(Math.random() * nodeCount)
    let b = Math.floor(Math.random() * nodeCount)
    while (b === a) {
      b = Math.floor(Math.random() * nodeCount)
    }

    const ax = nodePositions[a * 3]
    const ay = nodePositions[a * 3 + 1]
    const az = nodePositions[a * 3 + 2]
    const bx = nodePositions[b * 3]
    const by = nodePositions[b * 3 + 1]
    const bz = nodePositions[b * 3 + 2]

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(new Float32Array([ax, ay, az, bx, by, bz]), 3),
    )

    const material = new THREE.LineBasicMaterial({
      color: i % 2 === 0 ? TEAL_DEEP : TEAL_BRIGHT,
      transparent: true,
      opacity: 0.15 + Math.random() * 0.25,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const line = new THREE.Line(geometry, material)
    parent.add(line)
    connectionLines.push(line)
    linePhases.push(Math.random() * Math.PI * 2)

    trackDisposable({ geometry, material, object: line })
  }
}

function updateParticleSpread(spread: number): void {
  if (!particleGroup) return
  particleGroup.scale.setScalar(1 + spread * 0.65)
}

function resizeRenderer(): void {
  const container = containerRef.value
  if (!container || !renderer || !camera) return

  const width = Math.max(1, container.clientWidth)
  const height = Math.max(1, container.clientHeight)
  const dpr = isMobilePerfMode
    ? 1
    : Math.min(window.devicePixelRatio || 1, 2)

  renderer.setPixelRatio(dpr)
  renderer.setSize(width, height, false)
  camera.aspect = width / height
  camera.updateProjectionMatrix()
}

function onPointerMove(event: PointerEvent): void {
  targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1
  targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1
}

function onPointerLeave(): void {
  targetMouse.x = 0
  targetMouse.y = 0
}

function onVisibilityChange(): void {
  isVisible = document.visibilityState === 'visible'

  if (isVisible && !isDisposed && renderer) {
    lastFrameTime = performance.now()
    animationFrameId = requestAnimationFrame(animate)
  }
}

function animate(timestamp: number): void {
  if (isDisposed || !renderer || !scene || !camera || !mainGroup) return

  if (!isVisible) return

  const delta = lastFrameTime ? (timestamp - lastFrameTime) / 1000 : 0
  lastFrameTime = timestamp
  elapsed += delta

  mouse.x += (targetMouse.x - mouse.x) * 0.06
  mouse.y += (targetMouse.y - mouse.y) * 0.06

  cameraTarget.x = mouse.x * 0.45
  cameraTarget.y = mouse.y * 0.32

  camera.position.x += (cameraTarget.x - camera.position.x) * 0.05
  camera.position.y += (cameraTarget.y - camera.position.y) * 0.05
  camera.lookAt(0, 0, 0)

  const scroll = internalScroll.value
  mainGroup.rotation.y = scroll * Math.PI * 1.35 + elapsed * 0.08
  mainGroup.rotation.x = scroll * Math.PI * 0.42 + Math.sin(elapsed * 0.25) * 0.06

  if (!skipFlagWave) {
    applyFlagWave(elapsed)
  }

  for (let i = 0; i < connectionLines.length; i++) {
    const line = connectionLines[i]
    const material = line.material as import('three').LineBasicMaterial
    material.opacity = 0.08 + (Math.sin(elapsed * 1.6 + linePhases[i]) * 0.5 + 0.5) * 0.42
  }

  if (particlePoints) {
    particlePoints.rotation.y = elapsed * 0.015
  }

  renderer.render(scene, camera)
  animationFrameId = requestAnimationFrame(animate)
}

function disposeScene(): void {
  isDisposed = true
  cancelAnimationFrame(animationFrameId)

  for (const entry of disposables) {
    entry.geometry?.dispose()
    if (Array.isArray(entry.material)) {
      for (const material of entry.material) {
        material.dispose()
      }
    } else {
      entry.material?.dispose()
    }
  }

  disposables.length = 0
  connectionLines = []
  linePhases = []
  particlePoints = null
  particleGroup = null
  particleBasePositions = null
  mainGroup = null
  flagMesh = null
  flagBasePositions = null
  outerWireMaterial = null
  particleMaterialRef = null
  particleStarTexture?.dispose()
  particleStarTexture = null

  renderer?.dispose()
  renderer = null
  scene = null
  camera = null
}

async function initScene(): Promise<void> {
  const container = containerRef.value
  if (!container) return

  isMobilePerfMode = detectMobilePerf()
  particleCount = isMobilePerfMode ? 512 : 2048
  lineCount = isMobilePerfMode ? 12 : 40
  skipFlagWave = true

  const THREE = await import('three')

  scene = new THREE.Scene()

  const meshScale = props.fullscreen ? 1.45 : 1
  const particleScale = props.fullscreen ? 1.55 : 1

  camera = new THREE.PerspectiveCamera(props.fullscreen ? 52 : 45, 1, 0.1, 100)
  camera.position.set(0, 0, props.fullscreen ? 6.8 : 5.5)

  renderer = new THREE.WebGLRenderer({
    antialias: !isMobilePerfMode,
    alpha: true,
    powerPreference: 'high-performance',
  })
  renderer.setClearColor(0x0a0c0f, 0)
  renderer.outputColorSpace = THREE.SRGBColorSpace

  container.appendChild(renderer.domElement)
  renderer.domElement.style.display = 'block'
  renderer.domElement.style.width = '100%'
  renderer.domElement.style.height = '100%'

  mainGroup = new THREE.Group()
  scene.add(mainGroup)

  const outerGeometry = new THREE.IcosahedronGeometry(2.15 * meshScale, isMobilePerfMode ? 1 : 2)
  const outerMaterial = new THREE.MeshBasicMaterial({
    color: TEAL_DEEP,
    wireframe: true,
    transparent: true,
    opacity: 0.82,
  })
  outerWireMaterial = outerMaterial
  const outerMesh = new THREE.Mesh(outerGeometry, outerMaterial)
  mainGroup.add(outerMesh)
  trackDisposable({ geometry: outerGeometry, material: outerMaterial, object: outerMesh })

  const { group: avatarGroup, disposables: avatarDisposables } = await buildAvatarGroup(
    THREE,
    meshScale,
  )
  avatarGroup.rotation.x = Math.PI * 0.08
  mainGroup.add(avatarGroup)
  for (const entry of avatarDisposables) {
    trackDisposable(entry)
  }

  const particlePositions = new Float32Array(particleCount * 3)
  particleBasePositions = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    const [x, y, z] = sampleSpherePoint((2.55 + Math.random() * 1.35) * particleScale)
    const i3 = i * 3
    particlePositions[i3] = x
    particlePositions[i3 + 1] = y
    particlePositions[i3 + 2] = z
    particleBasePositions[i3] = x
    particleBasePositions[i3 + 1] = y
    particleBasePositions[i3 + 2] = z
  }

  const particleGeometry = new THREE.BufferGeometry()
  particleGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(particlePositions, 3),
  )

  particleStarTexture = createStarParticleTexture(THREE)

  const particleMaterial = new THREE.PointsMaterial({
    color: TEAL_BRIGHT,
    size: 0.036 * (props.fullscreen ? 1.5 : 1),
    map: particleStarTexture,
    transparent: true,
    opacity: 0.55,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
    alphaTest: 0.08,
  })
  particleMaterialRef = particleMaterial

  particlePoints = new THREE.Points(particleGeometry, particleMaterial)
  particleGroup = new THREE.Group()
  particleGroup.add(particlePoints)
  mainGroup.add(particleGroup)
  trackDisposable({
    geometry: particleGeometry,
    material: particleMaterial,
    object: particlePoints,
  })

  applySceneTheme(colorMode.value)

  const nodePositions = collectNodePoints(THREE, outerMesh, avatarGroup)
  buildConnectionLines(THREE, nodePositions, mainGroup)

  updateParticleSpread(internalScroll.value)
  resizeRenderer()

  lastFrameTime = performance.now()
  animationFrameId = requestAnimationFrame(animate)
}

watch(
  () => props.scrollProgress,
  (value) => {
    internalScroll.value = clamp01(value)
    updateParticleSpread(internalScroll.value)
  },
  { immediate: true },
)

onMounted(() => {
  void initScene()

  const container = containerRef.value
  if (container) {
    resizeObserver = new ResizeObserver(() => {
      resizeRenderer()
    })
    resizeObserver.observe(container)
  }

  window.addEventListener('pointermove', onPointerMove, { passive: true })
  window.addEventListener('pointerleave', onPointerLeave, { passive: true })
  document.addEventListener('visibilitychange', onVisibilityChange)
})

onUnmounted(() => {
  resizeObserver?.disconnect()
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerleave', onPointerLeave)
  document.removeEventListener('visibilitychange', onVisibilityChange)
  disposeScene()
})
</script>

<style scoped>
.scene-3d {
  width: 100%;
  height: 100%;
  min-height: 320px;
  pointer-events: none;
}

.scene-3d--fixed {
  position: fixed;
  inset: 0;
  z-index: 0;
}
</style>
