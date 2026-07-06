<template>
  <canvas ref="canvasRef" class="fluid-canvas" aria-hidden="true" />
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    scrollProgress?: number
  }>(),
  {
    scrollProgress: 0,
  },
)

const emit = defineEmits<{
  'scroll-update': [progress: number]
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)

const VERTEX_SHADER = `#version 300 es
in vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`

const VERTEX_SHADER_WEBGL1 = `
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`

const FRAGMENT_SHADER = `#version 300 es
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uMouse;
uniform float uScroll;
uniform float uLight;

out vec4 fragColor;

#define MAX_STEPS 96
#define MAX_DIST 12.0
#define SURF_DIST 0.0015

const vec3 TEAL_DEEP = vec3(0.051, 0.310, 0.290);
const vec3 TEAL_BRIGHT = vec3(0.102, 0.420, 0.361);
const vec3 PARTICLE_DEEP = vec3(0.039, 0.235, 0.195);

vec3 sceneBg() {
  return mix(vec3(0.039, 0.047, 0.059), vec3(0.949, 0.965, 0.957), uLight);
}

vec3 particleTint() {
  return mix(TEAL_BRIGHT, PARTICLE_DEEP, uLight);
}

float particleStrength() {
  return mix(0.12 + uScroll * 0.22, 0.34 + uScroll * 0.18, uLight);
}

float hash(vec3 p) {
  p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3));
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

float noise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);

  return mix(
    mix(
      mix(hash(i + vec3(0.0, 0.0, 0.0)), hash(i + vec3(1.0, 0.0, 0.0)), f.x),
      mix(hash(i + vec3(0.0, 1.0, 0.0)), hash(i + vec3(1.0, 1.0, 0.0)), f.x),
      f.y
    ),
    mix(
      mix(hash(i + vec3(0.0, 0.0, 1.0)), hash(i + vec3(1.0, 0.0, 1.0)), f.x),
      mix(hash(i + vec3(0.0, 1.0, 1.0)), hash(i + vec3(1.0, 1.0, 1.0)), f.x),
      f.y
    ),
    f.z
  );
}

float fbm(vec3 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(p);
    p *= 2.03;
    amplitude *= 0.5;
  }
  return value;
}

vec3 warp(vec3 p) {
  vec2 mouse = (uMouse - 0.5) * 2.0;
  float t = uTime * 0.35;
  float scroll = uScroll * 6.28318;

  p.xy += mouse * 0.35;
  p.z += sin(scroll) * 0.4;

  p.x += sin(p.y * 1.4 + t) * 0.22;
  p.y += cos(p.z * 1.2 - t * 0.8) * 0.18;
  p.z += sin(p.x * 1.1 + t * 0.6) * 0.16;

  return p;
}

float blobField(vec3 p) {
  vec3 q = warp(p);
  float field = 0.0;
  float t = uTime * 0.35;

  for (int i = 0; i < 4; i++) {
    float fi = float(i);
    vec3 center = vec3(
      sin(t * 0.55 + fi * 1.7) * 0.55,
      cos(t * 0.42 + fi * 2.1) * 0.45,
      sin(t * 0.38 + fi * 1.3) * 0.35
    );
    float radius = 0.42 + 0.08 * sin(t + fi * 2.5);
    field += radius / length(q - center);
  }

  float n = fbm(q * 1.35 + vec3(t * 0.15));
  field += n * 0.55;

  return field - (2.15 + uScroll * 0.35);
}

float mapScene(vec3 p) {
  return blobField(p) * 0.55;
}

vec3 calcNormal(vec3 p) {
  const vec2 e = vec2(0.001, 0.0);
  return normalize(vec3(
    mapScene(p + e.xyy) - mapScene(p - e.xyy),
    mapScene(p + e.yxy) - mapScene(p - e.yxy),
    mapScene(p + e.yyx) - mapScene(p - e.yyx)
  ));
}

vec3 gHitPos;

float rayMarch(vec3 ro, vec3 rd) {
  float depth = 0.0;
  for (int i = 0; i < MAX_STEPS; i++) {
    vec3 p = ro + rd * depth;
    float dist = mapScene(p);
    if (dist < SURF_DIST) {
      gHitPos = p;
      return depth;
    }
    depth += dist * 0.75;
    if (depth > MAX_DIST) break;
  }
  gHitPos = ro + rd * depth;
  return -1.0;
}

vec3 iridescence(vec3 normal, vec3 viewDir, vec3 pos) {
  float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0);
  float thin = abs(sin(dot(pos, vec3(0.7, 1.1, 0.9)) * 4.0 + uTime * 0.8));
  float hue = fract(
    dot(normal, vec3(0.3, 0.6, 0.9)) * 0.5 +
    thin * 0.35 +
    uScroll * 0.25 +
    fresnel * 0.4
  );

  vec3 colorA = mix(sceneBg(), TEAL_DEEP, 0.85);
  vec3 colorB = mix(TEAL_DEEP, TEAL_BRIGHT, 0.75);
  vec3 colorC = TEAL_BRIGHT * 1.15;

  vec3 base = mix(colorA, colorB, smoothstep(0.0, 0.55, hue));
  base = mix(base, colorC, smoothstep(0.45, 1.0, hue) * fresnel);

  return base + fresnel * vec3(0.08, 0.18, 0.14);
}

vec2 mouseScreenUv() {
  return vec2(
    (uMouse.x - 0.5) * 2.0 * (uResolution.x / uResolution.y),
    (uMouse.y - 0.5) * -2.0
  );
}

vec2 mouseRippleDistortion(vec2 uv) {
  vec2 mouseUv = mouseScreenUv();
  vec2 delta = uv - mouseUv;
  float dist = length(delta);
  float wave = sin(dist * 28.0 - uTime * 5.0) * exp(-dist * 2.2);
  vec2 dir = dist > 0.0001 ? delta / dist : vec2(0.0);
  return dir * wave * 0.015;
}

vec3 chromaticBlob(vec3 normal, vec3 viewDir, vec3 pos) {
  float edge = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.2);
  float ca = (0.004 + uScroll * 0.006) * edge;
  vec3 tangent = normalize(cross(normal, vec3(0.0, 1.0, 0.1)));
  vec3 surfG = iridescence(normal, viewDir, pos);
  vec3 surfR = iridescence(normal + tangent * ca * 3.5, viewDir, pos);
  vec3 surfB = iridescence(normal - tangent * ca * 3.5, viewDir, pos);
  return mix(surfG, vec3(surfR.r, surfG.g, surfB.b), edge);
}

float fourPointStar(vec2 p, float size) {
  vec2 ap = abs(p);
  float armX = smoothstep(size * 1.2, size * 0.05, ap.y) * smoothstep(size * 1.3, size * 0.08, ap.x);
  float armY = smoothstep(size * 1.2, size * 0.05, ap.x) * smoothstep(size * 1.3, size * 0.08, ap.y);
  float core = smoothstep(size * 0.5, size * 0.04, length(p));
  float diamond = smoothstep(size * 1.1, size * 0.08, (ap.x + ap.y) * 0.70710678);
  return max(core, max(max(armX, armY), diamond));
}

float dataParticles(vec2 uv) {
  float aspect = uResolution.x / uResolution.y;
  vec2 puv = vec2(uv.x, uv.y);
  vec2 mouseUv = mouseScreenUv();
  float total = 0.0;

  for (int i = 0; i < 48; i++) {
    float fi = float(i);
    vec3 seed = vec3(fi * 1.618, fi * 2.399, fi * 0.731);
    vec2 pos = vec2(
      (hash(seed) * 2.4 - 1.2) * aspect,
      hash(seed + vec3(1.7, 0.3, 0.9)) * 2.0 - 1.0
    );
    pos += vec2(
      sin(uTime * 0.28 + fi * 1.13) * 0.09,
      cos(uTime * 0.22 + fi * 0.87) * 0.07
    );

    vec2 local = puv - pos;
    float size = 0.0025 + hash(seed + vec3(2.3, 0.5, 1.1)) * 0.0035;
    float pt = fourPointStar(local, size * 2.0);

    float mouseGlow = exp(-length(pos - mouseUv) * 3.5);
    pt *= 0.45 + mouseGlow * 2.2;
    pt *= 0.55 + uScroll * 1.35;
    total += pt * (0.25 + hash(seed + vec3(3.1, 1.2, 0.4)) * 0.75);
  }

  return total;
}

float dataStreamLines(vec2 uv) {
  float scroll = uScroll * 6.28318;
  float yFlow = uv.y + uTime * 0.12 + sin(uv.x * 4.0 + scroll) * 0.02;
  float scan = pow(abs(sin(yFlow * 95.0)), 12.0);
  float stream = sin(uv.x * 22.0 - uTime * 1.8 + uv.y * 8.0 + scroll * 0.5);
  float pulse = smoothstep(0.985, 1.0, stream * 0.5 + 0.5);
  return scan * 0.035 + pulse * 0.018;
}

float filmGrain(vec2 fragCoord) {
  return (hash(vec3(fragCoord, floor(uTime * 24.0))) * 2.0 - 1.0) * 0.018;
}

float vignetteStrength(vec2 uv) {
  float radial = length(uv * vec2(0.92, 1.0));
  return smoothstep(1.05, 0.28, radial);
}

void main() {
  vec2 uv = (gl_FragCoord.xy / uResolution) * 2.0 - 1.0;
  uv.x *= uResolution.x / uResolution.y;

  vec2 mouseOffset = (uMouse - 0.5) * 0.18;
  uv += mouseOffset;

  vec2 ripple = mouseRippleDistortion(uv);
  vec2 uvRippled = uv + ripple;

  vec3 ro = vec3(0.0, 0.0, 3.2 - uScroll * 0.6);
  vec3 rd = normalize(vec3(uv, -1.35));

  float hit = rayMarch(ro, rd);

  vec3 color = sceneBg();

  if (hit > 0.0) {
    vec3 normal = calcNormal(gHitPos);
    vec3 viewDir = normalize(ro - gHitPos);
    vec3 surface = chromaticBlob(normal, viewDir, gHitPos);

    float glow = exp(-hit * 0.22);
    color = mix(color, surface, glow);

    vec3 fogColor = mix(sceneBg(), TEAL_DEEP, 0.25 + uScroll * 0.15);
    color = mix(color, fogColor, 1.0 - exp(-hit * 0.08));
  } else {
    vec2 bgUv = uvRippled;
    float bgVignette = smoothstep(1.15, 0.25, length(bgUv));
    vec3 ambient = mix(sceneBg(), TEAL_DEEP, 0.08 + uScroll * 0.06);
    color = mix(sceneBg(), ambient, bgVignette * 0.35);
  }

  float particles = dataParticles(uvRippled);
  vec2 mouseUv = mouseScreenUv();
  float mouseProximity = exp(-length(uvRippled - mouseUv) * 2.8);
  color += particleTint() * particles * particleStrength();
  color += mix(vec3(0.035, 0.07, 0.055), PARTICLE_DEEP * 0.85, uLight) * particles * mouseProximity;

  color += vec3(0.018, 0.028, 0.024) * dataStreamLines(uv);
  color += vec3(0.01, 0.015, 0.012) * sin(uTime * 2.0 + uv.y * 3.0);
  color += filmGrain(gl_FragCoord.xy);
  color *= mix(0.48, 1.0, vignetteStrength(uv));

  color = pow(color, vec3(0.95));

  fragColor = vec4(color, 1.0);
}
`

const FRAGMENT_SHADER_WEBGL1 = `
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uMouse;
uniform float uScroll;
uniform float uLight;

#define MAX_STEPS 80
#define MAX_DIST 12.0
#define SURF_DIST 0.0015

const vec3 TEAL_DEEP = vec3(0.051, 0.310, 0.290);
const vec3 TEAL_BRIGHT = vec3(0.102, 0.420, 0.361);
const vec3 PARTICLE_DEEP = vec3(0.039, 0.235, 0.195);

vec3 sceneBg() {
  return mix(vec3(0.039, 0.047, 0.059), vec3(0.949, 0.965, 0.957), uLight);
}

vec3 particleTint() {
  return mix(TEAL_BRIGHT, PARTICLE_DEEP, uLight);
}

float particleStrength() {
  return mix(0.12 + uScroll * 0.22, 0.34 + uScroll * 0.18, uLight);
}

float hash(vec3 p) {
  p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3));
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

float noise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);

  return mix(
    mix(
      mix(hash(i + vec3(0.0, 0.0, 0.0)), hash(i + vec3(1.0, 0.0, 0.0)), f.x),
      mix(hash(i + vec3(0.0, 1.0, 0.0)), hash(i + vec3(1.0, 1.0, 0.0)), f.x),
      f.y
    ),
    mix(
      mix(hash(i + vec3(0.0, 0.0, 1.0)), hash(i + vec3(1.0, 0.0, 1.0)), f.x),
      mix(hash(i + vec3(0.0, 1.0, 1.0)), hash(i + vec3(1.0, 1.0, 1.0)), f.x),
      f.y
    ),
    f.z
  );
}

float fbm(vec3 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(p);
    p *= 2.03;
    amplitude *= 0.5;
  }
  return value;
}

vec3 warp(vec3 p) {
  vec2 mouse = (uMouse - 0.5) * 2.0;
  float t = uTime * 0.35;
  float scroll = uScroll * 6.28318;

  p.xy += mouse * 0.35;
  p.z += sin(scroll) * 0.4;

  p.x += sin(p.y * 1.4 + t) * 0.22;
  p.y += cos(p.z * 1.2 - t * 0.8) * 0.18;
  p.z += sin(p.x * 1.1 + t * 0.6) * 0.16;

  return p;
}

float blobField(vec3 p) {
  vec3 q = warp(p);
  float field = 0.0;

  for (int i = 0; i < 4; i++) {
    float fi = float(i);
    vec3 center = vec3(
      sin(uTime * 0.55 + fi * 1.7) * 0.55,
      cos(uTime * 0.42 + fi * 2.1) * 0.45,
      sin(uTime * 0.38 + fi * 1.3) * 0.35
    );
    float radius = 0.42 + 0.08 * sin(uTime + fi * 2.5);
    field += radius / length(q - center);
  }

  float n = fbm(q * 1.35 + vec3(uTime * 0.15));
  field += n * 0.55;

  return field - (2.15 + uScroll * 0.35);
}

float mapScene(vec3 p) {
  return blobField(p) * 0.55;
}

vec3 calcNormal(vec3 p) {
  vec2 e = vec2(0.001, 0.0);
  return normalize(vec3(
    mapScene(p + e.xyy) - mapScene(p - e.xyy),
    mapScene(p + e.yxy) - mapScene(p - e.yxy),
    mapScene(p + e.yyx) - mapScene(p - e.yyx)
  ));
}

vec3 gHitPos;

float rayMarch(vec3 ro, vec3 rd) {
  float depth = 0.0;
  for (int i = 0; i < MAX_STEPS; i++) {
    vec3 p = ro + rd * depth;
    float dist = mapScene(p);
    if (dist < SURF_DIST) {
      gHitPos = p;
      return depth;
    }
    depth += dist * 0.75;
    if (depth > MAX_DIST) break;
  }
  gHitPos = ro + rd * depth;
  return -1.0;
}

vec3 iridescence(vec3 normal, vec3 viewDir, vec3 pos) {
  float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0);
  float thin = abs(sin(dot(pos, vec3(0.7, 1.1, 0.9)) * 4.0 + uTime * 0.8));
  float hue = fract(
    dot(normal, vec3(0.3, 0.6, 0.9)) * 0.5 +
    thin * 0.35 +
    uScroll * 0.25 +
    fresnel * 0.4
  );

  vec3 colorA = mix(sceneBg(), TEAL_DEEP, 0.85);
  vec3 colorB = mix(TEAL_DEEP, TEAL_BRIGHT, 0.75);
  vec3 colorC = TEAL_BRIGHT * 1.15;

  vec3 base = mix(colorA, colorB, smoothstep(0.0, 0.55, hue));
  base = mix(base, colorC, smoothstep(0.45, 1.0, hue) * fresnel);

  return base + fresnel * vec3(0.08, 0.18, 0.14);
}

vec2 mouseScreenUv() {
  return vec2(
    (uMouse.x - 0.5) * 2.0 * (uResolution.x / uResolution.y),
    (uMouse.y - 0.5) * -2.0
  );
}

vec2 mouseRippleDistortion(vec2 uv) {
  vec2 mouseUv = mouseScreenUv();
  vec2 delta = uv - mouseUv;
  float dist = length(delta);
  float wave = sin(dist * 28.0 - uTime * 5.0) * exp(-dist * 2.2);
  vec2 dir = dist > 0.0001 ? delta / dist : vec2(0.0);
  return dir * wave * 0.015;
}

vec3 chromaticBlob(vec3 normal, vec3 viewDir, vec3 pos) {
  float edge = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.2);
  float ca = (0.004 + uScroll * 0.006) * edge;
  vec3 tangent = normalize(cross(normal, vec3(0.0, 1.0, 0.1)));
  vec3 surfG = iridescence(normal, viewDir, pos);
  vec3 surfR = iridescence(normal + tangent * ca * 3.5, viewDir, pos);
  vec3 surfB = iridescence(normal - tangent * ca * 3.5, viewDir, pos);
  return mix(surfG, vec3(surfR.r, surfG.g, surfB.b), edge);
}

float fourPointStar(vec2 p, float size) {
  vec2 ap = abs(p);
  float armX = smoothstep(size * 1.2, size * 0.05, ap.y) * smoothstep(size * 1.3, size * 0.08, ap.x);
  float armY = smoothstep(size * 1.2, size * 0.05, ap.x) * smoothstep(size * 1.3, size * 0.08, ap.y);
  float core = smoothstep(size * 0.5, size * 0.04, length(p));
  float diamond = smoothstep(size * 1.1, size * 0.08, (ap.x + ap.y) * 0.70710678);
  return max(core, max(max(armX, armY), diamond));
}

float dataParticles(vec2 uv) {
  float aspect = uResolution.x / uResolution.y;
  vec2 puv = vec2(uv.x, uv.y);
  vec2 mouseUv = mouseScreenUv();
  float total = 0.0;

  for (int i = 0; i < 48; i++) {
    float fi = float(i);
    vec3 seed = vec3(fi * 1.618, fi * 2.399, fi * 0.731);
    vec2 pos = vec2(
      (hash(seed) * 2.4 - 1.2) * aspect,
      hash(seed + vec3(1.7, 0.3, 0.9)) * 2.0 - 1.0
    );
    pos += vec2(
      sin(uTime * 0.28 + fi * 1.13) * 0.09,
      cos(uTime * 0.22 + fi * 0.87) * 0.07
    );

    vec2 local = puv - pos;
    float size = 0.0025 + hash(seed + vec3(2.3, 0.5, 1.1)) * 0.0035;
    float pt = fourPointStar(local, size * 2.0);

    float mouseGlow = exp(-length(pos - mouseUv) * 3.5);
    pt *= 0.45 + mouseGlow * 2.2;
    pt *= 0.55 + uScroll * 1.35;
    total += pt * (0.25 + hash(seed + vec3(3.1, 1.2, 0.4)) * 0.75);
  }

  return total;
}

float dataStreamLines(vec2 uv) {
  float scroll = uScroll * 6.28318;
  float yFlow = uv.y + uTime * 0.12 + sin(uv.x * 4.0 + scroll) * 0.02;
  float scan = pow(abs(sin(yFlow * 95.0)), 12.0);
  float stream = sin(uv.x * 22.0 - uTime * 1.8 + uv.y * 8.0 + scroll * 0.5);
  float pulse = smoothstep(0.985, 1.0, stream * 0.5 + 0.5);
  return scan * 0.035 + pulse * 0.018;
}

float filmGrain(vec2 fragCoord) {
  return (hash(vec3(fragCoord, floor(uTime * 24.0))) * 2.0 - 1.0) * 0.018;
}

float vignetteStrength(vec2 uv) {
  float radial = length(uv * vec2(0.92, 1.0));
  return smoothstep(1.05, 0.28, radial);
}

void main() {
  vec2 uv = (gl_FragCoord.xy / uResolution) * 2.0 - 1.0;
  uv.x *= uResolution.x / uResolution.y;

  vec2 mouseOffset = (uMouse - 0.5) * 0.18;
  uv += mouseOffset;

  vec2 ripple = mouseRippleDistortion(uv);
  vec2 uvRippled = uv + ripple;

  vec3 ro = vec3(0.0, 0.0, 3.2 - uScroll * 0.6);
  vec3 rd = normalize(vec3(uv, -1.35));

  float hit = rayMarch(ro, rd);

  vec3 color = sceneBg();

  if (hit > 0.0) {
    vec3 normal = calcNormal(gHitPos);
    vec3 viewDir = normalize(ro - gHitPos);
    vec3 surface = chromaticBlob(normal, viewDir, gHitPos);

    float glow = exp(-hit * 0.22);
    color = mix(color, surface, glow);

    vec3 fogColor = mix(sceneBg(), TEAL_DEEP, 0.25 + uScroll * 0.15);
    color = mix(color, fogColor, 1.0 - exp(-hit * 0.08));
  } else {
    vec2 bgUv = uvRippled;
    float bgVignette = smoothstep(1.15, 0.25, length(bgUv));
    vec3 ambient = mix(sceneBg(), TEAL_DEEP, 0.08 + uScroll * 0.06);
    color = mix(sceneBg(), ambient, bgVignette * 0.35);
  }

  float particles = dataParticles(uvRippled);
  vec2 mouseUv = mouseScreenUv();
  float mouseProximity = exp(-length(uvRippled - mouseUv) * 2.8);
  color += particleTint() * particles * particleStrength();
  color += mix(vec3(0.035, 0.07, 0.055), PARTICLE_DEEP * 0.85, uLight) * particles * mouseProximity;

  color += vec3(0.018, 0.028, 0.024) * dataStreamLines(uv);
  color += vec3(0.01, 0.015, 0.012) * sin(uTime * 2.0 + uv.y * 3.0);
  color += filmGrain(gl_FragCoord.xy);
  color *= mix(0.48, 1.0, vignetteStrength(uv));

  color = pow(color, vec3(0.95));

  gl_FragColor = vec4(color, 1.0);
}
`

type GL = WebGL2RenderingContext | WebGLRenderingContext

interface UniformLocations {
  resolution: WebGLUniformLocation | null
  time: WebGLUniformLocation | null
  mouse: WebGLUniformLocation | null
  scroll: WebGLUniformLocation | null
  light: WebGLUniformLocation | null
}

let gl: GL | null = null
let program: WebGLProgram | null = null
let uniforms: UniformLocations | null = null
let positionBuffer: WebGLBuffer | null = null
let positionLocation = -1
let animationFrameId = 0
let resizeObserver: ResizeObserver | null = null
let startTime = 0
let isWebGL2 = false

const mouse = reactive({ x: 0.5, y: 0.5 })
const targetMouse = reactive({ x: 0.5, y: 0.5 })
const internalScroll = ref(0)

const colorMode = useColorMode()

const lightMix = computed(() => (colorMode.value === 'light' ? 1 : 0))

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value))
}

function createShader(context: GL, type: number, source: string): WebGLShader | null {
  const shader = context.createShader(type)
  if (!shader) return null

  context.shaderSource(shader, source)
  context.compileShader(shader)

  if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
    console.error('[FluidCanvas] Shader compile error:', context.getShaderInfoLog(shader))
    context.deleteShader(shader)
    return null
  }

  return shader
}

function createProgram(context: GL, vertexSource: string, fragmentSource: string): WebGLProgram | null {
  const vertexShader = createShader(context, context.VERTEX_SHADER, vertexSource)
  const fragmentShader = createShader(context, context.FRAGMENT_SHADER, fragmentSource)

  if (!vertexShader || !fragmentShader) return null

  const linkedProgram = context.createProgram()
  if (!linkedProgram) return null

  context.attachShader(linkedProgram, vertexShader)
  context.attachShader(linkedProgram, fragmentShader)
  context.linkProgram(linkedProgram)

  context.deleteShader(vertexShader)
  context.deleteShader(fragmentShader)

  if (!context.getProgramParameter(linkedProgram, context.LINK_STATUS)) {
    console.error('[FluidCanvas] Program link error:', context.getProgramInfoLog(linkedProgram))
    context.deleteProgram(linkedProgram)
    return null
  }

  return linkedProgram
}

function initWebGL(canvas: HTMLCanvasElement): boolean {
  const context =
    canvas.getContext('webgl2', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      preserveDrawingBuffer: false,
      powerPreference: 'high-performance',
    }) ??
    canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      preserveDrawingBuffer: false,
      powerPreference: 'high-performance',
    })

  if (!context) {
    console.error('[FluidCanvas] WebGL is not supported in this browser.')
    return false
  }

  gl = context
  isWebGL2 = gl instanceof WebGL2RenderingContext

  const vertexSource = isWebGL2 ? VERTEX_SHADER : VERTEX_SHADER_WEBGL1
  const fragmentSource = isWebGL2 ? FRAGMENT_SHADER : FRAGMENT_SHADER_WEBGL1

  program = createProgram(gl, vertexSource, fragmentSource)
  if (!program) return false

  gl.useProgram(program)

  positionBuffer = gl.createBuffer()
  if (!positionBuffer) return false

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW,
  )

  positionLocation = gl.getAttribLocation(program, 'aPosition')
  gl.enableVertexAttribArray(positionLocation)
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

  uniforms = {
    resolution: gl.getUniformLocation(program, 'uResolution'),
    time: gl.getUniformLocation(program, 'uTime'),
    mouse: gl.getUniformLocation(program, 'uMouse'),
    scroll: gl.getUniformLocation(program, 'uScroll'),
    light: gl.getUniformLocation(program, 'uLight'),
  }

  return true
}

function resizeCanvas(canvas: HTMLCanvasElement): void {
  if (!gl || !uniforms) return

  const dpr = shouldUseLiteGpu() ? 1 : Math.min(window.devicePixelRatio || 1, 2)
  const width = Math.max(1, Math.floor(canvas.clientWidth * dpr))
  const height = Math.max(1, Math.floor(canvas.clientHeight * dpr))

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width
    canvas.height = height
    gl.viewport(0, 0, width, height)
  }

  gl.uniform2f(uniforms.resolution, width, height)
}

function renderFrame(timestamp: number): void {
  if (!gl || !program || !uniforms) return

  const elapsed = (timestamp - startTime) / 1000

  mouse.x += (targetMouse.x - mouse.x) * 0.08
  mouse.y += (targetMouse.y - mouse.y) * 0.08

  gl.useProgram(program)
  gl.uniform1f(uniforms.time, elapsed)
  gl.uniform2f(uniforms.mouse, mouse.x, 1 - mouse.y)
  gl.uniform1f(uniforms.scroll, internalScroll.value)
  gl.uniform1f(uniforms.light, lightMix.value)

  gl.drawArrays(gl.TRIANGLES, 0, 6)

  animationFrameId = requestAnimationFrame(renderFrame)
}

function onPointerMove(event: PointerEvent): void {
  targetMouse.x = clamp01(event.clientX / window.innerWidth)
  targetMouse.y = clamp01(event.clientY / window.innerHeight)
}

function onPointerLeave(): void {
  targetMouse.x = 0.5
  targetMouse.y = 0.5
}

function setScrollProgress(progress: number): void {
  internalScroll.value = clamp01(progress)
  emit('scroll-update', internalScroll.value)
}

watch(
  () => props.scrollProgress,
  (value) => {
    internalScroll.value = clamp01(value)
  },
  { immediate: true },
)

defineExpose({
  setScrollProgress,
})

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  if (detectMobilePerf()) return

  if (!initWebGL(canvas)) return

  startTime = performance.now()
  resizeCanvas(canvas)

  resizeObserver = new ResizeObserver(() => {
    resizeCanvas(canvas)
  })
  resizeObserver.observe(canvas)

  window.addEventListener('pointermove', onPointerMove, { passive: true })
  window.addEventListener('pointerleave', onPointerLeave, { passive: true })

  animationFrameId = requestAnimationFrame(renderFrame)
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId)
  resizeObserver?.disconnect()
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerleave', onPointerLeave)

  if (gl && positionBuffer) {
    gl.deleteBuffer(positionBuffer)
  }
  if (gl && program) {
    gl.deleteProgram(program)
  }

  gl = null
  program = null
  uniforms = null
  positionBuffer = null
  resizeObserver = null
})
</script>

<style scoped>
.fluid-canvas {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
  display: block;
}
</style>
