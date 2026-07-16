<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import Matter from 'matter-js'

const CHURN_ISSUES = [
  'Account went quiet, no ticket',
  'Usage dropped 60%, nobody flagged',
  'Renewal in 90 days, no ROI',
  'CRM says active, one user in',
  'Champion left, adoption stalled',
  'NPS came after they churned',
  'Support spike before cancellation',
  'Feature bought, never adopted',
  'Engagement below baseline',
  'Save list buried in dashboard',
  'CS reactive instead of proactive',
  'Expansion signal missed in data',
  'Reps chase low intent leads',
  'Intent buried in CRM data',
  'No ranked daily call list',
  'Pipeline by recency not likelihood',
  'Churn risk hidden until renewal'
]

const containerRef = ref<HTMLElement | null>(null)

const { Engine, Runner, World, Bodies, Body, Mouse, MouseConstraint, Events } = Matter

let engine: Matter.Engine | null = null
let runner: Matter.Runner | null = null
let mouseConstraint: Matter.MouseConstraint | null = null
let mouse: Matter.Mouse | null = null
let pillBodies: Matter.Body[] = []
let pillElements: HTMLElement[] = []
let disposed = false
let resizeTimer = 0
let resizeObserver: ResizeObserver | null = null

const WALL = 60

function seededUnit(seed: number) {
  const x = Math.sin(seed * 12.9898 + seed * 78.233) * 43758.5453
  return x - Math.floor(x)
}

function syncPillsToDom() {
  for (let i = 0; i < pillBodies.length; i++) {
    const body = pillBodies[i]
    const el = pillElements[i]
    if (!body || !el) continue
    const w = body.bounds.max.x - body.bounds.min.x
    const h = body.bounds.max.y - body.bounds.min.y
    // bounds include rotation; use stored size from plugin data
    const bw = (body as Matter.Body & { pillW?: number }).pillW ?? w
    const bh = (body as Matter.Body & { pillH?: number }).pillH ?? h
    el.style.transform = `translate3d(${body.position.x - bw / 2}px, ${body.position.y - bh / 2}px, 0) rotate(${body.angle}rad)`
  }
}

function destroyWorldContents() {
  if (!engine) return
  World.clear(engine.world, false)
  pillBodies = []
  mouseConstraint = null
}

function buildScene(container: HTMLElement) {
  if (!engine) return

  const width = container.clientWidth
  const height = container.clientHeight
  if (width < 120 || height < 120) return

  destroyWorldContents()

  const floor = Bodies.rectangle(width / 2, height + WALL / 2 - 2, width + WALL * 2, WALL, {
    isStatic: true,
    friction: 1,
    restitution: 0.02,
    label: 'floor'
  })
  const left = Bodies.rectangle(-WALL / 2 + 2, height / 2, WALL, height * 3, {
    isStatic: true,
    friction: 0.9,
    label: 'wall-left'
  })
  const right = Bodies.rectangle(width + WALL / 2 - 2, height / 2, WALL, height * 3, {
    isStatic: true,
    friction: 0.9,
    label: 'wall-right'
  })
  const ceiling = Bodies.rectangle(width / 2, -WALL / 2, width + WALL * 2, WALL, {
    isStatic: true,
    label: 'ceiling'
  })

  World.add(engine.world, [floor, left, right, ceiling])

  // Measure pills in a layout-friendly way
  container.classList.add('churn-overload-box--measuring')
  pillElements = [...container.querySelectorAll<HTMLElement>('.churn-overload-pill')]

  pillBodies = pillElements.map((el, i) => {
    const w = Math.max(el.offsetWidth || 160, 90)
    const h = Math.max(el.offsetHeight || 36, 30)
    const chamfer = Math.min(h / 2 - 0.5, 18)

    const x = width * (0.2 + seededUnit(i * 4.3) * 0.6)
    const y = 30 + seededUnit(i * 7.1) * 50 + (i % 5) * 8
    const angle = (seededUnit(i * 2.9) - 0.5) * 0.75

    const body = Bodies.rectangle(x, y, w, h, {
      chamfer: { radius: chamfer },
      restitution: 0.08,
      friction: 0.65,
      frictionStatic: 0.9,
      frictionAir: 0.025,
      density: 0.002,
      angle,
      sleepThreshold: 45,
      label: `pill-${i}`
    }) as Matter.Body & { pillW: number, pillH: number }

    body.pillW = w
    body.pillH = h

    el.style.width = `${w}px`
    el.style.height = `${h}px`

    return body
  })

  container.classList.remove('churn-overload-box--measuring')
  World.add(engine.world, pillBodies)

  // Dragging
  mouse = Mouse.create(container)
  mouseConstraint = MouseConstraint.create(engine, {
    mouse,
    constraint: {
      stiffness: 0.2,
      damping: 0.12,
      render: { visible: false }
    }
  })
  World.add(engine.world, mouseConstraint)

  // Small horizontal nudge so stacks form organically
  pillBodies.forEach((body, i) => {
    Body.applyForce(body, body.position, {
      x: (seededUnit(i * 11.3) - 0.5) * 0.001,
      y: 0
    })
  })

  container.classList.add('churn-overload-box--ready')
  syncPillsToDom()
}

function setup(container: HTMLElement) {
  engine = Engine.create({
    enableSleeping: true,
    gravity: { x: 0, y: 1.15, scale: 0.001 }
  })
  engine.positionIterations = 10
  engine.velocityIterations = 8
  engine.constraintIterations = 4

  buildScene(container)

  Events.on(engine, 'afterUpdate', syncPillsToDom)

  runner = Runner.create()
  Runner.run(runner, engine)
}

function teardown() {
  disposed = true
  if (engine) {
    Events.off(engine, 'afterUpdate', syncPillsToDom)
  }
  if (runner) {
    Runner.stop(runner)
    runner = null
  }
  if (engine) {
    World.clear(engine.world, false)
    Engine.clear(engine)
    engine = null
  }
  mouseConstraint = null
  mouse = null
  pillBodies = []
  pillElements = []
}

function rebuild() {
  const container = containerRef.value
  if (!container || !engine || disposed) return
  container.classList.remove('churn-overload-box--ready')
  buildScene(container)
}

onMounted(async () => {
  disposed = false
  const container = containerRef.value
  if (!container) return

  await nextTick()
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))
  setup(container)

  resizeObserver = new ResizeObserver(() => {
    window.clearTimeout(resizeTimer)
    resizeTimer = window.setTimeout(() => rebuild(), 180)
  })
  resizeObserver.observe(container)
})

onBeforeUnmount(() => {
  window.clearTimeout(resizeTimer)
  resizeObserver?.disconnect()
  teardown()
})
</script>

<template>
  <div
    ref="containerRef"
    class="churn-overload-box"
    aria-label="Interactive pile of missed churn signals"
  >
    <div
      v-for="(issue, index) in CHURN_ISSUES"
      :key="issue"
      class="churn-overload-pill"
      :class="`churn-overload-pill--${index}`"
    >
      {{ issue }}
    </div>
  </div>
</template>
