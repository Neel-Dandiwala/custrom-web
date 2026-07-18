<script setup>
const CALENDLY_URL = 'https://calendly.com/neeldandiwala/30min'

const heroStatement = {
  line1Accent: 'Effortless',
  line1Rest: 'customer satisfaction',
  line2: 'and churn monitoring',
  sub: 'Identifying at-risk accounts before they leave, using the data your team already generates every day.'
}

const laptopDashboard = {
  stats: [
    { label: 'Need attention today', value: '4', sub: 'across 4 owners' },
    { label: 'High risk accounts', value: '2', sub: '+1 since yesterday', tone: 'risk' },
    { label: 'Open expansion signals', value: '1', sub: '$54k pipeline', tone: 'good' },
    { label: 'SLO breaches this week', value: '3', sub: '3 accounts affected', tone: 'warn' }
  ],
  accounts: [
    {
      initials: 'AC',
      name: 'Acme Corp',
      logo: '/mockups/logo-acme.svg',
      stage: 'Implementation',
      health: 52,
      type: 'High Risk',
      tone: 'risk',
      reason: 'SSO blocker mentioned 4× in Slack',
      owner: 'Riya D',
      ownerInit: 'RD',
      ownerAvatar: '/mockups/avatar-riya.svg',
      activity: '2h ago',
      action: 'Escalate blocker'
    },
    {
      initials: 'NA',
      name: 'Northstar AI',
      logo: '/mockups/logo-northstar.svg',
      stage: 'Active Customer',
      health: 41,
      type: 'Churn Risk',
      tone: 'churn',
      reason: 'Usage dropped · renewal in 31 days',
      owner: 'Alex K',
      ownerInit: 'AK',
      ownerAvatar: '/mockups/avatar-alex.svg',
      activity: '1d ago',
      action: 'Book check-in'
    },
    {
      initials: 'BL',
      name: 'BrightLabs',
      logo: '/mockups/logo-brightlabs.svg',
      stage: 'Active Customer',
      health: 88,
      type: 'Expansion',
      tone: 'good',
      reason: 'Asked about adding another team',
      owner: 'Neel D',
      ownerInit: 'ND',
      ownerAvatar: '/mockups/avatar-neel.svg',
      activity: '4h ago',
      action: 'Send expansion plan'
    },
    {
      initials: 'OF',
      name: 'Orbital Finance',
      logo: '/mockups/logo-orbital.svg',
      stage: 'Enterprise',
      health: 60,
      type: 'SLO Breach',
      tone: 'warn',
      reason: 'P1 ticket unresolved for 2 days',
      owner: 'Sam P',
      ownerInit: 'SP',
      ownerAvatar: '/mockups/avatar-sam.svg',
      activity: '6h ago',
      action: 'Notify support lead'
    }
  ]
}

const processSteps = [
  {
    icon: 'i-lucide-plug',
    title: 'Connect your data',
    body: 'Plug in your existing CRM, product, and support tools in minutes'
  },
  {
    icon: 'i-lucide-activity',
    title: 'Monitor account health',
    body: 'Track usage, engagement, and support patterns across your entire customer base'
  },
  {
    icon: 'i-lucide-bell-ring',
    title: 'Flag churn early',
    body: 'Surface disengaging accounts weeks before they cancel, while you can still do something about it'
  }
]

const integrationLogos = [
  'salesforce.svg', 'hubspot.svg', 'slack.svg', 'zendesk.svg', 'intercom.svg',
  'pipedrive.png', 'stripe.png', 'notion.png', 'google.png', 'microsoft.svg',
  'jira.svg', 'asana.png', 'zoom.png', 'calendly.png', 'gainsight.svg',
  'freshdesk.png', 'attio.png', 'linear.png', 'figma.png', 'dropbox.svg',
  'box.png', 'airtable.png', 'mixpanel.svg', 'datadog.png', 'github.png',
  'gitlab.svg', 'okta.png', 'twilio.png', 'sendgrid.png', 'mailchimp.png',
  'klaviyo.png', 'shopify.png', 'quickbooks.png', 'xero.png', 'netsuite.svg',
  'workday.png', 'bamboohr.svg', 'greenhouse.png', 'lever.png', 'ashby.png',
  'apollo.png', 'clearbit.png', 'zoominfo.png', 'linkedin.svg', 'outreach.svg',
  'salesloft.png', 'gong.png', 'confluence.png', 'snowflake.png', 'servicenow.png',
  'copper.png', 'helpscout.png', 'monday.png', 'clickup.png', 'trello.png',
  'coda.png', 'canva.png', '15five.png'
].map((file) => `/integrations/${file}`)

const mid = Math.ceil(integrationLogos.length / 2)
const integrationsRow1 = [...integrationLogos.slice(0, mid), ...integrationLogos.slice(0, mid)]
const integrationsRow2 = [...integrationLogos.slice(mid), ...integrationLogos.slice(mid)]

const backers = [
  { name: 'DMZ', note: 'Accelerator' },
  { name: 'Antler', note: 'Backed by experts' },
  { name: 'Techstars', note: 'Backed by experts' },
  { name: 'Y Combinator', note: 'Backed by experts' }
]

onMounted(async () => {
  const { gsap } = await import('gsap')

  gsap.timeline()
    .fromTo('.hero-intro-inner',
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' },
      0.25)
    .fromTo('.hero-laptop-scene',
      { opacity: 0 },
      { opacity: 1, duration: 0.85, ease: 'power2.out' },
      0.45)
})
</script>

<template>
  <div>
    <!-- ============ HERO ============ -->
    <section
      class="hero-section"
      aria-label="Product headline"
    >
      <ClientOnly>
        <HeroPlasma />
      </ClientOnly>

      <div
        class="grid-overlay"
        aria-hidden="true"
      />

      <div class="hero-section__stage">
        <div class="container hero-intro-inner">
          <h1 class="hero-intro-heading">
            <span class="hero-intro-line hero-intro-line--1">
              <span class="accent-word">{{ heroStatement.line1Accent }}</span>
              {{ heroStatement.line1Rest }}
            </span>
            <span class="hero-intro-line hero-intro-line--2">{{ heroStatement.line2 }}</span>
          </h1>
          <p class="hero-intro-sub">
            {{ heroStatement.sub }}
          </p>
          <div class="button-row">
            <a
              :href="CALENDLY_URL"
              target="_blank"
              rel="noopener noreferrer"
              class="button-primary inline-flex items-center justify-center gap-2 rounded-[10px] px-6 py-3.5 text-sm font-semibold"
            >
              Book a 15 min call
              <UIcon name="i-lucide-arrow-right" class="size-4" />
            </a>
            <a
              href="#process"
              class="button-secondary inline-flex items-center justify-center rounded-[10px] px-6 py-3.5 text-sm font-semibold"
            >
              See how it works
            </a>
          </div>
        </div>

        <div
          id="mockup"
          class="laptop-scene hero-laptop-scene"
        >
          <div class="laptop-device laptop-device--showcase">
            <div class="laptop-screen liquid-glass">
              <div
                class="liquid-glass__specular"
                aria-hidden="true"
              />
              <div
                class="liquid-glass__tint"
                aria-hidden="true"
              />
              <div class="dash-in-laptop">
                <header class="dash-laptop-header">
                  <div class="dash-laptop-brand">
                    <img
                      src="/custrom_white.png"
                      alt=""
                      class="dash-laptop-brand-icon"
                      width="22"
                      height="22"
                    >
                    <span class="mock-logo">Custrom</span>
                  </div>
                  <div class="dash-laptop-header-right">
                    <span class="mock-icon-dot" />
                    <span class="dash-avatar">RD</span>
                  </div>
                </header>

                <div class="dash-stats dash-stats--laptop">
                  <div
                    v-for="stat in laptopDashboard.stats"
                    :key="stat.label"
                    class="dash-stat"
                  >
                    <span class="dash-stat-label">{{ stat.label }}</span>
                    <span class="dash-stat-value">{{ stat.value }}</span>
                    <span
                      class="dash-stat-sub"
                      :class="stat.tone ? `dash-stat-sub--${stat.tone}` : undefined"
                    >
                      <UIcon
                        v-if="stat.tone === 'risk' || stat.tone === 'warn'"
                        name="i-lucide-triangle-alert"
                        class="dash-stat-icon"
                      />
                      <UIcon
                        v-else-if="stat.tone === 'good'"
                        name="i-lucide-trending-down"
                        class="dash-stat-icon"
                      />
                      {{ stat.sub }}
                    </span>
                  </div>
                </div>

                <div class="mock-card dash-laptop-table-wrap">
                  <div class="dash-laptop-list-head">
                    <p class="mock-card-label">
                      Accounts needing attention today
                    </p>
                    <div class="dash-search">
                      <UIcon
                        name="i-lucide-search"
                        class="dash-search-icon"
                      />
                      <span>Search accounts...</span>
                    </div>
                  </div>

                  <div class="dash-laptop-table-scroll">
                    <table class="dash-laptop-table">
                      <thead>
                        <tr>
                          <th>Account</th>
                          <th>Stage</th>
                          <th>Health</th>
                          <th>Type</th>
                          <th>Top reason</th>
                          <th>Owner</th>
                          <th>Last activity</th>
                          <th>Suggested action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="account in laptopDashboard.accounts"
                          :key="account.name"
                        >
                          <td>
                            <div class="dash-account">
                              <img
                                :src="account.logo"
                                :alt="account.name"
                                class="dash-account-logo"
                                width="28"
                                height="28"
                              >
                              <span>{{ account.name }}</span>
                            </div>
                          </td>
                          <td><span class="dash-stage-pill">{{ account.stage }}</span></td>
                          <td>
                            <div class="dash-health">
                              <span
                                class="dash-health-num"
                                :class="`dash-health-num--${account.tone}`"
                              >{{ account.health }}</span>
                              <div class="dash-health-bar">
                                <div
                                  class="dash-health-fill"
                                  :class="`dash-health-fill--${account.tone}`"
                                  :style="{ width: account.health + '%' }"
                                />
                              </div>
                            </div>
                          </td>
                          <td>
                            <span
                              class="dash-chip"
                              :class="`dash-chip--${account.tone}`"
                            >{{ account.type }}</span>
                          </td>
                          <td class="dash-laptop-reason">
                            {{ account.reason }}
                          </td>
                          <td>
                            <div class="dash-owner">
                              <img
                                :src="account.ownerAvatar"
                                :alt="account.owner"
                                class="dash-owner-avatar"
                                width="24"
                                height="24"
                              >
                              <span>{{ account.owner }}</span>
                            </div>
                          </td>
                          <td class="dash-laptop-muted">
                            {{ account.activity }}
                          </td>
                          <td>
                            <span class="dash-action">
                              <UIcon
                                name="i-lucide-zap"
                                class="dash-action-icon"
                              />
                              {{ account.action }}
                              <UIcon
                                name="i-lucide-chevron-right"
                                class="dash-action-chevron"
                              />
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="laptop-base" />
          </div>
        </div>
      </div>
    </section>

    <!-- ============ BACKED BY ============ -->
    <section id="backed-by" class="border-b border-white/10">
      <div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <p class="text-center text-sm font-semibold uppercase tracking-[0.14em] text-white/45">
          Backed by DMZ · backed by experts from Antler, Techstars &amp; YC
        </p>
        <div class="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div
            v-for="b in backers"
            :key="b.name"
            class="surface-soft flex flex-col items-center justify-center rounded-[16px] px-4 py-7 text-center"
          >
            <p class="text-xl font-bold tracking-[-0.03em] text-white">{{ b.name }}</p>
            <p class="mt-1 text-[11px] font-medium uppercase tracking-[0.12em] text-white/40">{{ b.note }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ INTEGRATIONS ============ -->
    <section id="integrations" class="border-b border-white/10">
      <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="sv-section-heading">
            <span class="headline-interaction">Connected</span>
            out of the box
          </h2>
          <p class="sv-body-copy mt-4">
            Salesforce, HubSpot, Slack, Zendesk, and Intercom, unified without adding another tool.
          </p>
          <NuxtLink
            to="/integrations"
            class="mt-5 inline-flex text-sm font-medium text-white/60 transition-colors hover:text-white"
          >
            See all integrations →
          </NuxtLink>
        </div>
      </div>

      <div class="integrations-marquee" aria-label="Supported integrations">
        <div class="loop-wrap">
          <div class="loop-logo-track">
            <div
              v-for="(logo, i) in integrationsRow1"
              :key="`row1-${i}`"
              class="loop-logo"
              :aria-hidden="i >= integrationsRow1.length / 2 ? 'true' : undefined"
            >
              <img :src="logo" alt="" width="40" height="40" loading="lazy">
            </div>
          </div>
        </div>
        <div class="loop-wrap" aria-hidden="true">
          <div class="loop-logo-track loop-logo-track--reverse">
            <div
              v-for="(logo, i) in integrationsRow2"
              :key="`row2-${i}`"
              class="loop-logo"
            >
              <img :src="logo" alt="" width="40" height="40" loading="lazy">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ PROCESS ============ -->
    <section id="process" class="border-b border-white/10">
      <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="sv-section-heading">How it works</h2>
          <p class="sv-body-copy mt-4">
            Give your CS team a daily ranked list of exactly who needs attention today
          </p>
        </div>

        <div class="mt-16 grid gap-6 md:grid-cols-3">
          <div
            v-for="step in processSteps"
            :key="step.title"
            class="surface-product flex flex-col rounded-[16px] p-7 lg:p-8"
          >
            <div class="icon-tile h-10 w-10">
              <UIcon :name="step.icon" class="size-5" />
            </div>
            <h3 class="mt-5 text-2xl font-semibold tracking-[-0.03em] text-white">{{ step.title }}</h3>
            <p class="mt-3 text-base leading-relaxed text-white/60">{{ step.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ CHURN SIGNALS ============ -->
    <section id="personas" class="border-b border-white/10">
      <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div class="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
          <div class="max-w-xl">
            <h2 class="sv-section-heading">
              <span class="headline-interaction">The signals</span>
              teams miss
            </h2>
            <p class="sv-body-copy mt-4">
              The same churn and satisfaction gaps show up across CS, Sales, and GTM, buried in CRM fields, product activity, and support history long before renewal.
            </p>
            <p class="mt-5 flex items-center gap-2 text-sm text-white/45">
              <UIcon name="i-lucide-mouse-pointer-2" class="size-4 shrink-0" />
              Play the overload with your cursor
            </p>
          </div>

          <ClientOnly>
            <ChurnOverloadVisual />
            <template #fallback>
              <div class="churn-overload-box churn-overload-box--placeholder" aria-hidden="true" />
            </template>
          </ClientOnly>
        </div>
      </div>
    </section>

    <!-- ============ FINAL CTA ============ -->
    <section>
      <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div class="surface-frame relative overflow-hidden rounded-[20px] px-6 py-16 text-center sm:px-12">
          <div class="pointer-events-none absolute inset-0 hero-backdrop opacity-90" />
          <div class="grid-overlay" />
          <div class="relative">
            <h2 class="mx-auto max-w-2xl text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-white">
              Let's keep the revenue you've
              <span class="headline-interaction">already earned.</span>
            </h2>
            <p class="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/60">
              We're early stage and looking for teams to build this with. Bring your funnel,
              we'll show you what your data already knows.
            </p>
            <div class="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                :href="CALENDLY_URL"
                target="_blank"
                rel="noopener noreferrer"
                class="button-primary inline-flex items-center justify-center gap-2 rounded-[10px] px-7 py-4 text-base font-semibold"
              >
                Book a 15 minute call
                <UIcon name="i-lucide-arrow-right" class="size-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
