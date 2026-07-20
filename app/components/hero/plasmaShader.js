import * as THREE from 'three'

/** Custrom hero plasma — shared by HeroPlasma + FboLandscapeVisual */
export const HERO_PLASMA_CFG = {
  colors: [
    [244, 236, 255],
    [210, 95, 255],
    [130, 12, 184]
  ],
  speed: 0.1,
  size: 0.99
}

export const PLASMA_VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export const PLASMA_FRAG = /* glsl */ `
uniform float uTime;
uniform float uSpeed;
uniform float uSize;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec2 uResolution;
varying vec2 vUv;

float w1 = 3.0;
float w2 = 1.0;
float w3 = 20.0;
float A = 1.0;
float R = 3.0;

float horizontal(in vec2 xy, float t) {
  return cos(w1 * xy.x + A * t);
}
float diagonal(in vec2 xy, float t) {
  return cos(w2 * (xy.x * cos(t) + 5.0 * xy.y * sin(t)) + A * t);
}
float radial(in vec2 xy, float t) {
  float x = 0.3 * xy.x - 0.5 + cos(t);
  float y = 0.3 * xy.y - 0.5 + sin(t * 0.5);
  return sin(w3 * sqrt(x * x + y * y + 1.0) + A * t);
}

vec3 plasmaColor(vec2 fragCoord, vec2 resolution, float time, float speed, float size, vec3 c1, vec3 c2, vec3 c3) {
  float t = time * speed + 10000.0;
  vec2 scaledXY = fragCoord / resolution - 0.5;
  scaledXY *= size;
  scaledXY += 0.5;
  float v = (horizontal(scaledXY, t) + diagonal(scaledXY, t) + radial(scaledXY, t)) / 3.0;
  float nv = (v + 1.0) * 0.5;
  vec3 color = nv < 0.5
    ? mix(c3, c2, nv * 2.0)
    : mix(c2, c1, (nv - 0.5) * 2.0);
  return pow(color, vec3(R));
}

void main() {
  gl_FragColor = vec4(plasmaColor(gl_FragCoord.xy, uResolution, uTime, uSpeed, uSize, uColor1, uColor2, uColor3), 1.0);
}
`

/**
 * Point-sprite variant: identical plasma field to HeroPlasma (screen-space),
 * with a soft circular particle mask.
 */
export const PLASMA_POINT_VERT = /* glsl */ `
uniform sampler2D positions;
uniform float pointSize;
uniform float uPixelRatio;

void main() {
  vec3 pos = texture2D(positions, position.xy).xyz;
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = pointSize * uPixelRatio * (280.0 / -mv.z);
}
`

export const PLASMA_POINT_FRAG = /* glsl */ `
precision highp float;

uniform float uTime;
uniform float uSpeed;
uniform float uSize;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec2 uResolution;

float w1 = 3.0;
float w2 = 1.0;
float w3 = 20.0;
float A = 1.0;
float R = 3.0;

float horizontal(in vec2 xy, float t) {
  return cos(w1 * xy.x + A * t);
}
float diagonal(in vec2 xy, float t) {
  return cos(w2 * (xy.x * cos(t) + 5.0 * xy.y * sin(t)) + A * t);
}
float radial(in vec2 xy, float t) {
  float x = 0.3 * xy.x - 0.5 + cos(t);
  float y = 0.3 * xy.y - 0.5 + sin(t * 0.5);
  return sin(w3 * sqrt(x * x + y * y + 1.0) + A * t);
}

void main() {
  vec2 pc = gl_PointCoord - 0.5;
  float d = length(pc);
  if (d > 0.5) discard;

  // Tight falloff → finer grain when points are dense
  float soft = smoothstep(0.48, 0.28, d);

  // Exact same plasma eval as HeroPlasma PLASMA_FRAG — no extra remaps
  float t = uTime * uSpeed + 10000.0;
  vec2 scaledXY = gl_FragCoord.xy / uResolution.xy - 0.5;
  scaledXY *= uSize;
  scaledXY += 0.5;
  float v = (horizontal(scaledXY, t) + diagonal(scaledXY, t) + radial(scaledXY, t)) / 3.0;
  float nv = (v + 1.0) * 0.5;
  vec3 color = nv < 0.5
    ? mix(uColor3, uColor2, nv * 2.0)
    : mix(uColor2, uColor1, (nv - 0.5) * 2.0);
  color = pow(color, vec3(R));

  gl_FragColor = vec4(color, soft);
}
`

export function toPlasmaColor([r, g, b]) {
  return new THREE.Color(r / 255, g / 255, b / 255)
}

export function createPlasmaUniforms(resolution = { x: 1, y: 1 }) {
  const [c1, c2, c3] = HERO_PLASMA_CFG.colors
  return {
    uTime: { value: 0 },
    uSpeed: { value: HERO_PLASMA_CFG.speed },
    uSize: { value: HERO_PLASMA_CFG.size },
    uColor1: { value: toPlasmaColor(c1) },
    uColor2: { value: toPlasmaColor(c2) },
    uColor3: { value: toPlasmaColor(c3) },
    uResolution: { value: new THREE.Vector2(resolution.x, resolution.y) }
  }
}
