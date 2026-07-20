<script setup>
/**
 * FBO particle landscape (nicoptere/FBO heightmap),
 * colored with the exact HeroPlasma grain / fragment field.
 * Sparse bright signal glows sit in the terrain — hard to spot in the noise.
 */
import * as THREE from 'three'
import { createFboParticles, heightmapFromImage } from './hero/FboParticles.js'
import {
  HERO_PLASMA_CFG,
  createPlasmaUniforms,
  PLASMA_POINT_FRAG,
  PLASMA_POINT_VERT
} from './hero/plasmaShader.js'

const props = defineProps({
  src: {
    type: String,
    default: '/mockups/fbo-noise.jpg'
  },
  elevation: {
    type: Number,
    default: 120
  }
})

const wrapRef = ref(null)
const canvasRef = ref(null)

const SIM_VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`

const SIM_FRAG = /* glsl */ `
precision highp float;
uniform sampler2D positions;
varying vec2 vUv;
void main() {
  vec3 pos = texture2D(positions, vUv).rgb;
  gl_FragColor = vec4(pos, 1.0);
}
`

/** Tiny bright signal sparks — sparse so they feel buried in the landscape */
const SIGNAL_VERT = /* glsl */ `
attribute float aPhase;
attribute float aSize;
uniform float uTime;
uniform float uPixelRatio;
varying float vGlow;

void main() {
  vec3 pos = position;
  pos.y += 1.2 + sin(uTime * 1.35 + aPhase) * 0.4;
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;
  float pulse = 0.55 + 0.45 * sin(uTime * 2.4 + aPhase * 1.8);
  vGlow = pulse;
  gl_PointSize = aSize * uPixelRatio * pulse * (260.0 / max(40.0, -mv.z));
}
`

const SIGNAL_FRAG = /* glsl */ `
precision highp float;
varying float vGlow;

void main() {
  vec2 pc = gl_PointCoord - 0.5;
  float d = length(pc);
  if (d > 0.5) discard;

  float core = smoothstep(0.42, 0.0, d);
  float halo = exp(-d * 7.5) * 0.7;
  float a = (core * 0.95 + halo) * vGlow;
  // Bright lilac core → soft purple halo
  vec3 col = mix(vec3(0.72, 0.22, 1.0), vec3(1.0, 0.96, 1.0), core);
  gl_FragColor = vec4(col * (0.65 + core * 0.9), a);
}
`

let renderer = null
let scene = null
let camera = null
let clock = null
let plasmaUniforms = null
let renderMaterial = null
let signalMaterial = null
let signalPoints = null
let landscapeGroup = null
let fbo = null
let originTexture = null
let raf = 0
let disposed = false
let reduceMotion = false
let resizeObserver = null
let io = null
let inView = true
let pageVisible = true
let texSize = 256

/** Pick sparse heightmap cells — prefer ridges so signals sit in the terrain, not voids */
function pickSignalPositions(heightData, mapW, mapH, count) {
  const candidates = []
  const len = mapW * mapH
  for (let i = 0; i < len; i++) {
    const y = heightData[i * 4 + 1]
    const elevNorm = y / Math.max(1, props.elevation)
    if (elevNorm < 0.22) continue
    // Weight toward mid/high peaks so signals aren't all in one valley
    const weight = elevNorm * elevNorm
    if (Math.random() < weight * 0.085) {
      candidates.push(i)
    }
  }

  // Fallback if heightmap is flat
  while (candidates.length < count) {
    candidates.push(Math.floor(Math.random() * len))
  }

  // Shuffle and take a sparse set
  for (let i = candidates.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [candidates[i], candidates[j]] = [candidates[j], candidates[i]]
  }

  const positions = new Float32Array(count * 3)
  const phases = new Float32Array(count)
  const sizes = new Float32Array(count)

  for (let n = 0; n < count; n++) {
    const i = candidates[n]
    const i4 = i * 4
    positions[n * 3] = heightData[i4]
    positions[n * 3 + 1] = heightData[i4 + 1]
    positions[n * 3 + 2] = heightData[i4 + 2]
    phases[n] = Math.random() * Math.PI * 2
    sizes[n] = 2.2 + Math.random() * 2.8
  }

  return { positions, phases, sizes }
}

function isActive() {
  return inView && pageVisible && !!renderer && !disposed && !!fbo
}

function stopLoop() {
  if (raf) cancelAnimationFrame(raf)
  raf = 0
}

function startLoop() {
  if (!isActive() || reduceMotion || raf) return
  raf = requestAnimationFrame(tick)
}

function syncLoop() {
  if (reduceMotion) return
  if (isActive()) startLoop()
  else stopLoop()
}

function resize() {
  const wrap = wrapRef.value
  const canvas = canvasRef.value
  if (!wrap || !canvas || !renderer || !camera) return

  const width = Math.max(2, Math.floor(wrap.clientWidth))
  const height = Math.max(2, Math.floor(wrap.clientHeight))
  const pr = Math.min(window.devicePixelRatio || 1, 1.5)

  renderer.setPixelRatio(pr)
  renderer.setSize(width, height, false)
  camera.aspect = width / height
  camera.updateProjectionMatrix()

  if (renderMaterial) {
    // HeroPlasma resolution is CSS pixels; match gl_FragCoord (device px)
    renderMaterial.uniforms.uResolution.value.set(width * pr, height * pr)
    renderMaterial.uniforms.uPixelRatio.value = pr
  }
  if (signalMaterial) {
    signalMaterial.uniforms.uPixelRatio.value = pr
  }
}

function tick() {
  if (!isActive() || reduceMotion) {
    raf = 0
    return
  }

  raf = requestAnimationFrame(tick)

  fbo.update()

  const t = clock.getElapsedTime()
  if (renderMaterial) {
    renderMaterial.uniforms.uTime.value = t
  }
  if (signalMaterial) {
    signalMaterial.uniforms.uTime.value = t
  }

  renderer.render(scene, camera)
}

function onVisibility() {
  pageVisible = document.visibilityState !== 'hidden'
  syncLoop()
}

async function init() {
  const wrap = wrapRef.value
  const canvas = canvasRef.value
  if (!wrap || !canvas) return

  reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  // Dense enough that points read as grain, not separate dots
  texSize = window.innerWidth < 768 ? 256 : 448

  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: false,
    alpha: true,
    powerPreference: 'high-performance'
  })
  // Match hero color pipeline so grain/colors match
  renderer.setClearColor(0x000000, 0)
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace
  renderer.toneMapping = THREE.NoToneMapping

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(48, 1, 1, 10000)
  camera.position.set(18, 42, 195)
  clock = new THREE.Clock(true)

  const img = await new Promise((resolve, reject) => {
    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.onload = () => resolve(image)
    image.onerror = reject
    image.src = props.src
  })

  const width = texSize
  const height = texSize
  const data = heightmapFromImage(img, width, height, props.elevation)

  originTexture = new THREE.DataTexture(
    data,
    width,
    height,
    THREE.RGBAFormat,
    THREE.FloatType
  )
  originTexture.minFilter = THREE.NearestFilter
  originTexture.magFilter = THREE.NearestFilter
  originTexture.needsUpdate = true

  const simulationShader = new THREE.ShaderMaterial({
    uniforms: {
      positions: { value: originTexture }
    },
    vertexShader: SIM_VERT,
    fragmentShader: SIM_FRAG,
    depthTest: false,
    depthWrite: false
  })

  const pr = Math.min(window.devicePixelRatio || 1, 1.5)
  const cssW = Math.max(1, wrap.clientWidth)
  const cssH = Math.max(1, wrap.clientHeight)
  plasmaUniforms = createPlasmaUniforms({
    x: cssW * pr,
    y: cssH * pr
  })
  // Exact hero plasma knobs — do not remap colors
  plasmaUniforms.uSpeed.value = HERO_PLASMA_CFG.speed
  plasmaUniforms.uSize.value = HERO_PLASMA_CFG.size

  renderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      positions: { value: null },
      pointSize: { value: 1.05 },
      uPixelRatio: { value: pr },
      uTime: plasmaUniforms.uTime,
      uSpeed: plasmaUniforms.uSpeed,
      uSize: plasmaUniforms.uSize,
      uColor1: plasmaUniforms.uColor1,
      uColor2: plasmaUniforms.uColor2,
      uColor3: plasmaUniforms.uColor3,
      uResolution: plasmaUniforms.uResolution
    },
    vertexShader: PLASMA_POINT_VERT,
    fragmentShader: PLASMA_POINT_FRAG,
    depthTest: true,
    depthWrite: false,
    transparent: true,
    blending: THREE.NormalBlending
  })

  fbo = createFboParticles(width, height, renderer, simulationShader, renderMaterial)

  // Shared group so terrain + signal sparks share the same landscape transform
  landscapeGroup = new THREE.Group()
  landscapeGroup.position.set(8, -width * 0.38, 0)
  landscapeGroup.scale.set(1.35, 1.45, 1.25)
  landscapeGroup.add(fbo.particles)

  const signalCount = window.innerWidth < 768 ? 26 : 42
  const { positions, phases, sizes } = pickSignalPositions(data, width, height, signalCount)
  const signalGeo = new THREE.BufferGeometry()
  signalGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  signalGeo.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1))
  signalGeo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))

  signalMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: pr }
    },
    vertexShader: SIGNAL_VERT,
    fragmentShader: SIGNAL_FRAG,
    transparent: true,
    depthTest: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  })

  signalPoints = new THREE.Points(signalGeo, signalMaterial)
  signalPoints.renderOrder = 2
  landscapeGroup.add(signalPoints)
  scene.add(landscapeGroup)
  camera.lookAt(landscapeGroup.position.x + 24, landscapeGroup.position.y + 32, 0)

  resize()
  fbo.update()

  if (reduceMotion) {
    renderer.render(scene, camera)
  }

  resizeObserver = new ResizeObserver(() => resize())
  resizeObserver.observe(wrap)

  io = new IntersectionObserver(
    ([entry]) => {
      inView = entry.isIntersecting
      syncLoop()
    },
    { threshold: 0.08 }
  )
  io.observe(wrap)

  pageVisible = document.visibilityState !== 'hidden'
  document.addEventListener('visibilitychange', onVisibility)

  syncLoop()
}

function disposeAll() {
  disposed = true
  stopLoop()
  document.removeEventListener('visibilitychange', onVisibility)
  resizeObserver?.disconnect()
  io?.disconnect()

  signalPoints?.geometry?.dispose()
  signalMaterial?.dispose()
  fbo?.particles?.geometry?.dispose()
  fbo?.particles?.material?.dispose()
  fbo?.dispose()
  originTexture?.dispose()
  renderer?.dispose()

  renderer = null
  fbo = null
  landscapeGroup = null
  signalPoints = null
  signalMaterial = null
  renderMaterial = null
  plasmaUniforms = null
}

onMounted(() => {
  nextTick(() => {
    init().catch((err) => {
      console.warn('[FboLandscape] init failed', err)
    })
  })
})

onBeforeUnmount(() => {
  disposeAll()
})
</script>

<template>
  <div
    ref="wrapRef"
    class="fbo-landscape"
    aria-hidden="true"
  >
    <canvas
      ref="canvasRef"
      class="fbo-landscape__canvas"
    />
  </div>
</template>

<style scoped>
.fbo-landscape {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: clamp(320px, 48vw, 560px);
  margin: 0;
}

.fbo-landscape__canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
