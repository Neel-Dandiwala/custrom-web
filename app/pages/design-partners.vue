<script setup>
const title = 'Design Partner Program | Custrom'
const description = 'An exclusive Design Partner Program with locked founding pricing, direct founder support, and zero technical setup.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterCard: 'summary_large_image'
})

const hero = {
  headline: 'Shape the future of customer satisfaction',
  sub: 'An exclusive Design Partner Program with locked founding pricing, direct founder support, and zero technical setup.'
}

const getItems = [
  {
    title: 'Zero overhead',
    body: 'No setup fees, read only integration, live in under 7 days'
  },
  {
    title: 'Direct access',
    body: 'Dedicated Slack/WhatsApp channel directly with the founding team'
  },
  {
    title: 'Live Account Health View in under 7 days',
    body: 'See account health across your customer base in the first week'
  },
  {
    title: '24 hr alerts for failed payments',
    body: 'Get notified within 24 hours when payments fail'
  },
  {
    title: 'Early signal detection for quiet accounts',
    body: 'Spot disengaging accounts before they cancel'
  }
]

const askItems = [
  {
    title: 'Read only access',
    body: 'Read only access to your existing stack'
  },
  {
    title: 'Pilot owner',
    body: '1 designated pilot owner on your team'
  },
  {
    title: 'Weekly sync',
    body: '30 minute weekly feedback sync'
  },
  {
    title: 'Case study',
    body: 'Case study approval (only if the pilot achieves your goals)'
  }
]

onMounted(() => {
  const widgetScriptSrc = 'https://tally.so/widgets/embed.js'

  const load = () => {
    if (typeof window.Tally !== 'undefined') {
      window.Tally.loadEmbeds()
      return
    }

    document.querySelectorAll('iframe[data-tally-src]:not([src])').forEach((iframeEl) => {
      iframeEl.src = iframeEl.dataset.tallySrc
    })
  }

  if (typeof window.Tally !== 'undefined') {
    load()
    return
  }

  if (document.querySelector(`script[src="${widgetScriptSrc}"]`) === null) {
    const script = document.createElement('script')
    script.src = widgetScriptSrc
    script.onload = load
    script.onerror = load
    document.body.appendChild(script)
    return
  }

  // Script tag exists but may still be loading
  const existing = document.querySelector(`script[src="${widgetScriptSrc}"]`)
  existing?.addEventListener('load', load)
  load()
})
</script>

<template>
  <div>
    <!-- HERO -->
    <section class="hero-backdrop relative flex min-h-[calc(100svh-4.5rem)] items-center overflow-hidden">
      <div class="grid-overlay" />
      <div class="relative mx-auto w-full max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
        <h1 class="mx-auto max-w-3xl text-[clamp(2.3rem,5vw,4rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-white">
          Shape the future of
          <span class="headline-interaction">customer satisfaction</span>
        </h1>
        <p class="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/62">
          {{ hero.sub }}
        </p>
        <div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#apply"
            class="button-primary inline-flex items-center justify-center gap-2 rounded-[10px] px-6 py-3.5 text-sm font-semibold"
          >
            Apply for Design Partner Cohort
            <UIcon name="i-lucide-arrow-right" class="size-4" />
          </a>
          <a
            href="#value"
            class="button-secondary inline-flex items-center justify-center rounded-[10px] px-6 py-3.5 text-sm font-semibold"
          >
            See the deal →
          </a>
        </div>
      </div>
    </section>

    <!-- MUTUAL VALUE -->
    <section id="value">
      <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="sv-section-heading">
            A founding partnership,
            <span class="headline-interaction">not a waitlist</span>
          </h2>
        </div>

        <div class="mt-14 grid gap-6 lg:grid-cols-2">
          <div class="surface-product rounded-[16px] p-7 lg:p-8">
            <ul class="space-y-4">
              <li v-for="item in getItems" :key="item.title" class="flex items-start gap-3">
                <UIcon name="i-lucide-check" class="mt-0.5 size-4 shrink-0 text-white/45" />
                <div>
                  <p class="text-base font-semibold text-white">{{ item.title }}</p>
                  <p class="mt-1 text-sm text-white/58">{{ item.body }}</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="surface-risk rounded-[16px] p-7 lg:p-8">
            <ul class="space-y-4">
              <li v-for="item in askItems" :key="item.title" class="flex items-start gap-3">
                <UIcon name="i-lucide-check" class="mt-0.5 size-4 shrink-0 text-white/45" />
                <div>
                  <p class="text-base font-semibold text-white">{{ item.title }}</p>
                  <p class="mt-1 text-sm text-white/58">{{ item.body }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- APPLY -->
    <section id="apply">
      <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="sv-section-heading">
            Apply for the
            <span class="headline-interaction">Design Partner Cohort</span>
          </h2>
        </div>

        <div class="mx-auto mt-10 max-w-2xl">
          <ClientOnly>
            <iframe
              data-tally-src="https://tally.so/embed/Y5KGDW?alignLeft=1&hideTitle=1&dynamicHeight=1"
              loading="lazy"
              width="100%"
              height="689"
              frameborder="0"
              marginheight="0"
              marginwidth="0"
              title="Apply for the Design Partner Cohort"
              class="dp-tally-embed"
            />
          </ClientOnly>
        </div>
      </div>
    </section>
  </div>
</template>
