<script setup>
/**
 * Hero background: plasma cube + glass cylinders (Three.js).
 * Tuned from raycast.com scene values; colors remapped to Custrom purple.
 */
import * as THREE from 'three'
import { DiscardMaterial, MeshTransmissionMaterial } from './hero/MeshTransmissionMaterial.js'
import {
  HERO_PLASMA_CFG,
  PLASMA_FRAG,
  PLASMA_VERT,
  toPlasmaColor
} from './hero/plasmaShader.js'

const CFG = {
  colors: HERO_PLASMA_CFG.colors,
  speed: HERO_PLASMA_CFG.speed,
  size: HERO_PLASMA_CFG.size,
  cameraZ: 16.54,
  cubeY: 0,
  cubeZ: -9,
  rotationInfluence: 0.3,
  translationInfluence: 0.2,
  cylinders: { count: 16, radius: 0.5, height: 15, segments: 8 },
  glassRotation: 0.73,
  glassResolution: 512,
  chromaticAberration: 2,
  anisotropicBlur: 2.2,
  roughness: 0.35,
  thickness: 1,
  ior: 1.5,
  samples: 3,
  mobileSamples: 2
}

const BG = 0x000000

const root = ref(null)
const canvas = ref(null)

let renderer, scene, camera, cube, glassMesh, glassMaterial, discardMaterial
let plasmaUniforms, transmissionFbo, clock
let raf = 0
let resizeRaf = 0
let ro = null
let io = null
let onPointerMove = null
let onVisibility = null
let reduced = false
let inView = true
let pageVisible = true
let cssWidth = 1
const mouse = { x: 0, y: 0 }
const mouseTarget = { x: 0, y: 0 }

function isActive() {
  return inView && pageVisible && !!renderer
}

function stopLoop() {
  if (raf) cancelAnimationFrame(raf)
  raf = 0
}

function startLoop() {
  if (!isActive() || reduced || raf) return
  clock?.getDelta()
  raf = requestAnimationFrame(tick)
}

function syncLoop() {
  if (reduced) return
  if (isActive()) startLoop()
  else stopLoop()
}

const toColor = toPlasmaColor

function expoOut(t) {
  return t === 0 ? 0 : Math.pow(2, 10 * t - 10)
}

function makeFbo(w, h) {
  return new THREE.WebGLRenderTarget(w, h, {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    depthBuffer: true,
    stencilBuffer: false
  })
}

function resize() {
  if (!renderer || !canvas.value) return
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
  const rect = canvas.value.getBoundingClientRect()
  cssWidth = Math.max(1, rect.width)
  const cssH = Math.max(1, rect.height)
  const w = Math.max(1, Math.round(cssWidth * dpr))
  const h = Math.max(1, Math.round(cssH * dpr))

  renderer.setPixelRatio(1)
  renderer.setSize(w, h, false)
  camera.aspect = cssWidth / cssH
  camera.updateProjectionMatrix()
  plasmaUniforms.uResolution.value.set(cssWidth, cssH)

  const fboW = Math.min(CFG.glassResolution, w)
  if (transmissionFbo) transmissionFbo.setSize(fboW, h)
  else transmissionFbo = makeFbo(fboW, h)
}

function scheduleResize() {
  if (resizeRaf) return
  resizeRaf = requestAnimationFrame(() => {
    resizeRaf = 0
    resize()
  })
}

function setupGlass() {
  const { count, radius, height, segments } = CFG.cylinders
  const spacing = 2 * radius
  const samples = cssWidth < 500 ? CFG.mobileSamples : CFG.samples
  const geo = new THREE.CylinderGeometry(radius, radius, height, segments, 1)

  glassMaterial = new MeshTransmissionMaterial(samples)
  glassMaterial.color = new THREE.Color(1, 1, 1)
  glassMaterial.roughness = CFG.roughness
  glassMaterial.metalness = 0
  glassMaterial.ior = CFG.ior
  glassMaterial.thickness = CFG.thickness
  glassMaterial.chromaticAberration = CFG.chromaticAberration
  glassMaterial.anisotropicBlur = CFG.anisotropicBlur
  glassMaterial.distortion = 0
  glassMaterial.distortionScale = 0.08
  glassMaterial.temporalDistortion = 0
  glassMaterial.specularIntensity = 0
  glassMaterial._transmission = 1
  glassMaterial.transmission = 0
  glassMaterial.transparent = true

  discardMaterial = new DiscardMaterial()
  glassMesh = new THREE.InstancedMesh(geo, glassMaterial, count)
  glassMesh.frustumCulled = false

  const dummy = new THREE.Object3D()
  for (let i = 0; i < count; i++) {
    dummy.position.set((i + spacing) * spacing - (spacing * count) / 2, 0, 0)
    dummy.updateMatrix()
    glassMesh.setMatrixAt(i, dummy.matrix)
  }
  glassMesh.instanceMatrix.needsUpdate = true
  glassMesh.rotation.z = CFG.glassRotation
  scene.add(glassMesh)
}

function tick() {
  raf = 0
  if (!isActive()) return

  const dt = clock.getDelta()
  const t = clock.elapsedTime
  const damp = 0.5 * Math.min(1, dt * 60)

  mouse.x += (mouseTarget.x - mouse.x) * 0.08
  mouse.y += (mouseTarget.y - mouse.y) * 0.08

  plasmaUniforms.uTime.value = t

  // Raycast entrance: cube starts at 0 and damps to full size so the
  // frame is black until the plasma "lights up" after mount.
  const scale = cube.scale.x + (1 - cube.scale.x) * Math.min(1, damp * 0.35)
  cube.scale.setScalar(scale)
  cube.rotation.x += (mouse.x * CFG.rotationInfluence - cube.rotation.x) * damp
  cube.rotation.y += (-mouse.y * CFG.rotationInfluence - cube.rotation.y) * damp
  cube.position.x += (mouse.x * CFG.translationInfluence - cube.position.x) * damp
  cube.position.y += (CFG.cubeY + mouse.y * CFG.translationInfluence - cube.position.y) * damp
  cube.position.z = CFG.cubeZ

  glassMaterial.time = t
  if (cssWidth > 520) {
    glassMaterial.distortion += (15 * expoOut(Math.min(1, t / 30)) - glassMaterial.distortion) * 0.02
    glassMaterial.temporalDistortion += (0.025 * expoOut(Math.min(1, t / 10)) - glassMaterial.temporalDistortion) * 0.02
  }

  const prevTone = renderer.toneMapping
  renderer.toneMapping = THREE.NoToneMapping

  glassMesh.material = discardMaterial
  renderer.setRenderTarget(transmissionFbo)
  renderer.clear()
  renderer.render(scene, camera)

  glassMesh.material = glassMaterial
  glassMaterial.buffer = transmissionFbo.texture
  renderer.setRenderTarget(null)
  renderer.clear()
  renderer.render(scene, camera)

  renderer.toneMapping = prevTone
  if (!reduced) raf = requestAnimationFrame(tick)
}

onMounted(() => {
  const el = canvas.value
  reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  renderer = new THREE.WebGLRenderer({
    canvas: el,
    antialias: false,
    alpha: false,
    powerPreference: 'high-performance'
  })
  renderer.setClearColor(BG, 1)
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace
  renderer.toneMapping = THREE.NoToneMapping

  scene = new THREE.Scene()
  scene.background = new THREE.Color(BG)

  camera = new THREE.PerspectiveCamera(35, 1, 0.01, 100)
  camera.position.set(0, 0, CFG.cameraZ)

  plasmaUniforms = {
    uTime: { value: 0 },
    uSpeed: { value: CFG.speed },
    uSize: { value: CFG.size },
    uColor1: { value: toColor(CFG.colors[0]) },
    uColor2: { value: toColor(CFG.colors[1]) },
    uColor3: { value: toColor(CFG.colors[2]) },
    uResolution: { value: new THREE.Vector2(1, 1) }
  }

  cube = new THREE.Mesh(
    new THREE.BoxGeometry(7, 7, 7),
    new THREE.ShaderMaterial({
      uniforms: plasmaUniforms,
      vertexShader: PLASMA_VERT,
      fragmentShader: PLASMA_FRAG
    })
  )
  cube.position.set(0, CFG.cubeY, CFG.cubeZ)
  cube.scale.setScalar(0)
  scene.add(cube)

  cssWidth = el.getBoundingClientRect().width || 1
  setupGlass()

  clock = new THREE.Clock()
  resize()
  ro = new ResizeObserver(scheduleResize)
  ro.observe(el)

  if (window.matchMedia('(min-width: 768px) and (pointer: fine)').matches) {
    onPointerMove = (e) => {
      if (!inView) return
      mouseTarget.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseTarget.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })
  }

  pageVisible = !document.hidden
  onVisibility = () => {
    pageVisible = !document.hidden
    syncLoop()
  }
  document.addEventListener('visibilitychange', onVisibility)

  io = new IntersectionObserver(
    ([entry]) => {
      inView = Boolean(entry?.isIntersecting)
      syncLoop()
    },
    { threshold: 0.01, rootMargin: '48px' }
  )
  io.observe(root.value || el)

  if (reduced) tick()
  else syncLoop()
})

onBeforeUnmount(() => {
  stopLoop()
  if (resizeRaf) cancelAnimationFrame(resizeRaf)
  resizeRaf = 0
  ro?.disconnect()
  io?.disconnect()
  if (onVisibility) document.removeEventListener('visibilitychange', onVisibility)
  if (onPointerMove) window.removeEventListener('pointermove', onPointerMove)
  transmissionFbo?.dispose()
  renderer?.dispose()
  renderer?.forceContextLoss?.()
  renderer = null
  ro = null
  io = null
})
</script>

<template>
  <div
    ref="root"
    class="hero-plasma"
    aria-hidden="true"
  >
    <canvas
      ref="canvas"
      class="hero-plasma__canvas"
    />
    <div class="hero-plasma__veil" />
  </div>
</template>

<style scoped>
.hero-plasma {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  background: #000;
  -webkit-mask-image: linear-gradient(to bottom, #000 0%, #000 72%, rgba(0, 0, 0, 0.55) 88%, transparent 100%);
  mask-image: linear-gradient(to bottom, #000 0%, #000 72%, rgba(0, 0, 0, 0.55) 88%, transparent 100%);
}

.hero-plasma__canvas {
  display: block;
  width: 100%;
  height: 100%;
}

.hero-plasma__veil {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(
      82% 78% at 50% 46%,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.1) 62%,
      rgba(0, 0, 0, 0.45) 100%
    ),
    linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.02) 0%,
      rgba(0, 0, 0, 0.08) 50%,
      rgba(0, 0, 0, 0.35) 78%,
      rgba(0, 0, 0, 0.72) 100%
    );
}
</style>
