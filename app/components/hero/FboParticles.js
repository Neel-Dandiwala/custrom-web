import * as THREE from 'three'

/**
 * FBO particle system — ported from nicoptere/FBO
 * https://github.com/nicoptere/FBO
 */
export function createFboParticles(width, height, renderer, simulationMaterial, renderMaterial) {
  const gl = renderer.getContext()
  const isWebGL2 = typeof WebGL2RenderingContext !== 'undefined' && gl instanceof WebGL2RenderingContext

  if (!isWebGL2) {
    if (!gl.getExtension('OES_texture_float')) {
      throw new Error('float textures not supported')
    }
    if (gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS) === 0) {
      throw new Error('vertex shader cannot read textures')
    }
  }

  const simScene = new THREE.Scene()
  const orthoCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1 / 2 ** 53, 1)

  const rtt = new THREE.WebGLRenderTarget(width, height, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    type: THREE.HalfFloatType,
    depthBuffer: false,
    stencilBuffer: false
  })

  const simGeo = new THREE.BufferGeometry()
  simGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array([
    -1, -1, 0, 1, -1, 0, 1, 1, 0,
    -1, -1, 0, 1, 1, 0, -1, 1, 0
  ]), 3))
  simGeo.setAttribute('uv', new THREE.BufferAttribute(new Float32Array([
    0, 1, 1, 1, 1, 0,
    0, 1, 1, 0, 0, 0
  ]), 2))
  simScene.add(new THREE.Mesh(simGeo, simulationMaterial))

  const count = width * height
  const vertices = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    vertices[i3] = (i % width) / width
    vertices[i3 + 1] = Math.floor(i / width) / height
    vertices[i3 + 2] = 0
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))

  const particles = new THREE.Points(geometry, renderMaterial)

  function update() {
    renderer.setRenderTarget(rtt)
    renderer.render(simScene, orthoCamera)
    renderer.setRenderTarget(null)
    renderMaterial.uniforms.positions.value = rtt.texture
  }

  return { particles, update, dispose: () => rtt.dispose() }
}

/** Build heightmap positions from an image (image.html demo). */
export function heightmapFromImage(img, width, height, elevation) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, width, height)

  const imgData = ctx.getImageData(0, 0, width, height)
  const iData = imgData.data
  const len = width * height
  const data = new Float32Array(len * 4)

  for (let i = 0; i < len; i++) {
    const i4 = i * 4
    const iData4 = i * 4
    const grey = iData[iData4] / 255 * 0.299
      + iData[iData4 + 1] / 255 * 0.587
      + iData[iData4 + 2] / 255 * 0.114

    data[i4] = (i % width) - width * 0.5
    data[i4 + 1] = grey * elevation
    data[i4 + 2] = Math.floor(i / width) - height * 0.5
    data[i4 + 3] = 1
  }

  return data
}
