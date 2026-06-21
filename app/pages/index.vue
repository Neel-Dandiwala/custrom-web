<script setup>
const CALENDLY_URL = 'https://calendly.com/neeldandiwala/30min'

const leadRows = [
  { name: 'Northwind Logistics', sig: 'Opened 4 emails · pricing page ×3', score: 92, tone: 'good' },
  { name: 'Acme Robotics', sig: 'Demo booked · 2 stakeholders', score: 87, tone: 'good' },
  { name: 'Brightline SaaS', sig: 'Replied · no decision-maker yet', score: 54, tone: 'warn' },
  { name: 'Cold Outreach Co.', sig: 'No opens in 21 days', score: 18, tone: 'risk' }
]

const churnRows = [
  { name: 'Vertex Health', sig: 'Logins down 60% · no QBR booked', risk: 'High', tone: 'risk' },
  { name: 'Orbit Finance', sig: 'Champion left · tickets rising', risk: 'High', tone: 'risk' },
  { name: 'Cedar Retail', sig: 'Usage flat · renewal in 45d', risk: 'Medium', tone: 'warn' },
  { name: 'Summit Media', sig: 'Active · expanding seats', risk: 'Low', tone: 'good' }
]

const toneText = {
  good: 'text-[#2DD4BF]',
  warn: 'text-[#FBBF24]',
  risk: 'text-[#FB7185]'
}
const toneDot = {
  good: 'dot-good',
  warn: 'dot-warn',
  risk: 'dot-risk'
}

const painPoints = [
  {
    icon: 'i-lucide-phone-off',
    title: 'SDRs burn hours on dead leads',
    body: 'Reps work lists top-to-bottom with no idea who is actually in-market. The best leads go cold while time gets spent on prospects who will never buy.'
  },
  {
    icon: 'i-lucide-user-x',
    title: 'Churn shows up too late',
    body: 'By the time the cancellation email lands, the account checked out weeks ago. The early warning signs were already sitting in your data.'
  },
  {
    icon: 'i-lucide-database',
    title: 'The signal is already there',
    body: 'CRM fields, product activity, email engagement, support touchpoints — the answer lives in tools you already pay for. Nobody is reading it in time.'
  }
]

const backers = [
  { name: 'DMZ', note: 'Accelerator' },
  { name: 'Antler', note: 'Backed by experts' },
  { name: 'Techstars', note: 'Backed by experts' },
  { name: 'Y Combinator', note: 'Backed by experts' }
]
</script>

<template>
  <div>
    <!-- ============ HERO ============ -->
    <section class="hero-backdrop relative overflow-hidden border-b border-white/10">
      <div class="grid-overlay" />
      <div class="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div class="grid items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <!-- Copy -->
          <div class="max-w-2xl">
            <div class="eyebrow rounded-full">
              <span class="eyebrow-dot" />
              Revenue intelligence for B2B teams
            </div>

            <h1 class="mt-7 text-[clamp(2.5rem,5.2vw,4.3rem)] font-semibold leading-[0.96] tracking-[-0.05em] text-white">
              Don't lose the leads
              <span class="headline-interaction block">you already have.</span>
            </h1>

            <p class="mt-6 max-w-xl text-lg leading-relaxed text-white/62">
              We help B2B teams spot which prospects are worth pursuing and which
              customers are about to leave — before it's too late.
            </p>

            <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                :href="CALENDLY_URL"
                target="_blank"
                rel="noopener noreferrer"
                class="button-primary inline-flex items-center justify-center gap-2 rounded-[14px] px-6 py-3.5 text-sm font-semibold"
              >
                Book a 15-minute call
                <UIcon name="i-lucide-arrow-right" class="size-4" />
              </a>
              <a
                href="#how-it-works"
                class="button-secondary inline-flex items-center justify-center rounded-[14px] px-6 py-3.5 text-sm font-semibold"
              >
                See how it works
              </a>
            </div>

            <div class="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/55">
              <span class="flex items-center gap-2">
                <UIcon name="i-lucide-check-circle-2" class="size-4 text-[#2DD4BF]" />
                Uses your existing CRM &amp; activity data
              </span>
              <span class="flex items-center gap-2">
                <UIcon name="i-lucide-check-circle-2" class="size-4 text-[#2DD4BF]" />
                No new tools. No new integrations.
              </span>
            </div>
          </div>

          <!-- Dashboard mockup -->
          <div class="surface-frame overflow-hidden rounded-[20px]">
            <div class="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
              <div class="flex items-center gap-3">
                <img src="/custrom_white.png" alt="Custrom" class="h-7 w-7 shrink-0 object-contain">

                <div>
                  <p class="text-sm font-semibold leading-none text-white">Revenue workspace</p>
                  <p class="mt-1 text-xs text-white/45">Lead scoring &amp; churn signals</p>
                </div>
              </div>
              <div class="hidden items-center gap-1.5 sm:flex">
                <span class="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span class="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span class="h-2.5 w-2.5 rounded-full bg-white/15" />
              </div>
            </div>

            <div class="space-y-5 p-5">
              <!-- KPI row · illustrative product state -->
              <div class="grid grid-cols-3 gap-3">
                <div class="surface-soft rounded-[14px] p-3.5">
                  <p class="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/42">Leads to call</p>
                  <p class="mt-2 text-2xl font-semibold tracking-tight text-white">12</p>
                  <p class="mt-0.5 text-[11px] font-medium text-white/45">ranked today</p>
                </div>
                <div class="surface-soft rounded-[14px] p-3.5">
                  <p class="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/42">At-risk accounts</p>
                  <p class="mt-2 text-2xl font-semibold tracking-tight text-white">5</p>
                  <p class="mt-0.5 text-[11px] font-medium text-white/45">flagged</p>
                </div>
                <div class="surface-soft rounded-[14px] p-3.5">
                  <p class="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/42">Renewals soon</p>
                  <p class="mt-2 text-2xl font-semibold tracking-tight text-white">8</p>
                  <p class="mt-0.5 text-[11px] font-medium text-white/45">next 60 days</p>
                </div>
              </div>

              <!-- Lead scoring panel -->
              <div class="surface-product rounded-[16px] p-4">
                <div class="mb-3 flex items-center justify-between">
                  <p class="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">Pre-sale · lead priority</p>
                  <span class="chip"><span class="h-1.5 w-1.5 rounded-full bg-[#2DD4BF]" />Call top first</span>
                </div>
                <div class="space-y-2">
                  <div
                    v-for="row in leadRows"
                    :key="row.name"
                    class="row-inner flex items-center gap-3 rounded-[11px] px-3 py-2.5"
                  >
                    <span class="h-2 w-2 shrink-0 rounded-full" :class="toneDot[row.tone]" />
                    <div class="min-w-0 flex-1">
                      <p class="truncate text-sm font-semibold text-white">{{ row.name }}</p>
                      <p class="truncate text-[11px] text-white/48">{{ row.sig }}</p>
                    </div>
                    <span class="text-sm font-semibold tabular-nums" :class="toneText[row.tone]">{{ row.score }}</span>
                  </div>
                </div>
              </div>

              <!-- Churn panel -->
              <div class="surface-risk rounded-[16px] p-4">
                <div class="mb-3 flex items-center justify-between">
                  <p class="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">Post-sale · churn risk</p>
                  <span class="chip"><span class="h-1.5 w-1.5 rounded-full bg-[#FB7185]" />Act early</span>
                </div>
                <div class="space-y-2">
                  <div
                    v-for="row in churnRows"
                    :key="row.name"
                    class="row-inner flex items-center gap-3 rounded-[11px] px-3 py-2.5"
                  >
                    <span class="h-2 w-2 shrink-0 rounded-full" :class="toneDot[row.tone]" />
                    <div class="min-w-0 flex-1">
                      <p class="truncate text-sm font-semibold text-white">{{ row.name }}</p>
                      <p class="truncate text-[11px] text-white/48">{{ row.sig }}</p>
                    </div>
                    <span class="rounded-full px-2 py-0.5 text-[11px] font-semibold" :class="toneText[row.tone]">{{ row.risk }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ PAIN POINTS ============ -->
    <section class="border-b border-white/10">
      <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div class="max-w-2xl">
          <p class="text-sm font-semibold uppercase tracking-[0.14em] text-[#FB7185]">The leak is already happening</p>
          <h2 class="sv-section-heading mt-3">Revenue you've already earned is quietly slipping away</h2>
          <p class="sv-body-copy mt-4">
            Most teams don't have a lead problem or a churn problem. They have a
            <span class="font-semibold text-white">timing</span> problem — they find out who mattered after the deal is lost.
          </p>
        </div>

        <div class="mt-12 grid gap-5 md:grid-cols-3">
          <div
            v-for="p in painPoints"
            :key="p.title"
            class="surface-soft rounded-[18px] p-6"
          >
            <div class="flex h-11 w-11 items-center justify-center rounded-[12px] border border-[#FB7185]/25 bg-[#FB7185]/10">
              <UIcon :name="p.icon" class="size-5 text-[#FB7185]" />
            </div>
            <h3 class="mt-5 text-lg font-semibold tracking-[-0.01em] text-white">{{ p.title }}</h3>
            <p class="mt-2.5 text-sm leading-relaxed text-white/58">{{ p.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ HOW IT WORKS / TWO COLUMNS ============ -->
    <section id="how-it-works" class="border-b border-white/10">
      <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div class="mx-auto max-w-2xl text-center">
          <p class="text-sm font-semibold uppercase tracking-[0.14em] text-[#818CF8]">Two sides of the same revenue</p>
          <h2 class="sv-section-heading mt-3">Catch them on the way in. And on the way out.</h2>
          <p class="sv-body-copy mt-4">
            Both sides run on data your team already has — CRM, activity, and touchpoints.
            No new tools, no new integrations.
          </p>
        </div>

        <div class="mt-12 grid gap-6 lg:grid-cols-2">
          <!-- Pre-sale -->
          <div id="pre-sale" class="surface-product flex flex-col rounded-[20px] p-7">
            <div class="flex items-center gap-3">
              <span class="flex h-10 w-10 items-center justify-center rounded-[12px] bg-gradient-to-br from-[#2DD4BF] to-[#14B8A6] text-[#06231f]">
                <UIcon name="i-lucide-target" class="size-5" />
              </span>
              <span class="chip">Pre-sale</span>
            </div>
            <h3 class="mt-5 text-2xl font-semibold tracking-[-0.03em] text-white">Know which leads to prioritize</h3>
            <p class="mt-3 text-base leading-relaxed text-white/60">
              Score your inbound leads so your team knows who to actually call first.
              Stop wasting SDR time on leads that will never close.
            </p>
            <ul class="mt-6 space-y-3">
              <li v-for="item in ['Rank every inbound lead by real likelihood to close', 'Surface buying signals hiding in CRM + activity data', 'Point reps at the 20% of leads driving 80% of revenue']" :key="item" class="flex items-start gap-3 text-sm text-white/70">
                <UIcon name="i-lucide-check" class="mt-0.5 size-4 shrink-0 text-[#2DD4BF]" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>

          <!-- Post-sale -->
          <div id="post-sale" class="surface-risk flex flex-col rounded-[20px] p-7">
            <div class="flex items-center gap-3">
              <span class="flex h-10 w-10 items-center justify-center rounded-[12px] bg-gradient-to-br from-[#FB7185] to-[#F43F5E] text-white">
                <UIcon name="i-lucide-heart-pulse" class="size-5" />
              </span>
              <span class="chip">Post-sale</span>
            </div>
            <h3 class="mt-5 text-2xl font-semibold tracking-[-0.03em] text-white">Catch churn before it happens</h3>
            <p class="mt-3 text-base leading-relaxed text-white/60">
              Flag customers who are quietly drifting toward churn before they're gone.
              Act early, not after the cancellation email.
            </p>
            <ul class="mt-6 space-y-3">
              <li v-for="item in ['Spot accounts going quiet weeks before they cancel', 'Combine usage, support, and engagement into one risk score', 'Give CS a ranked save-list instead of a surprise']" :key="item" class="flex items-start gap-3 text-sm text-white/70">
                <UIcon name="i-lucide-check" class="mt-0.5 size-4 shrink-0 text-[#FB7185]" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ VALUE ============ -->
    <section class="border-b border-white/10">
      <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div class="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div class="max-w-xl">
            <p class="text-sm font-semibold uppercase tracking-[0.14em] text-[#818CF8]">What you get</p>
            <h2 class="sv-section-heading mt-3">Stop guessing on both ends of the funnel</h2>
            <p class="sv-body-copy mt-4">
              The signal is already in your data — it just isn't reaching your team in time.
              Custrom turns it into a ranked list of who to call and who to save, every day.
            </p>
            <p class="mt-6 text-sm leading-relaxed text-white/50">
              We're early stage, so we don't make up outcome numbers. We'd rather sit down,
              look at your funnel, and figure out what this is actually worth to you.
            </p>
            <a
              :href="CALENDLY_URL"
              target="_blank"
              rel="noopener noreferrer"
              class="button-primary mt-7 inline-flex items-center justify-center gap-2 rounded-[14px] px-6 py-3.5 text-sm font-semibold"
            >
              Look at it with us
              <UIcon name="i-lucide-arrow-right" class="size-4" />
            </a>
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <div class="surface-depth rounded-[18px] p-6">
              <span class="flex h-10 w-10 items-center justify-center rounded-[12px] bg-gradient-to-br from-[#6366F1] to-[#A855F7] text-white">
                <UIcon name="i-lucide-list-ordered" class="size-5" />
              </span>
              <p class="mt-4 text-base font-semibold tracking-[-0.01em] text-white">Focus reps on the right leads</p>
              <p class="mt-1.5 text-sm leading-relaxed text-white/58">A daily, ranked call list — so SDR hours go to prospects that can actually close.</p>
            </div>
            <div class="surface-brand rounded-[18px] p-6">
              <span class="flex h-10 w-10 items-center justify-center rounded-[12px] bg-gradient-to-br from-[#818CF8] to-[#6366F1] text-white">
                <UIcon name="i-lucide-search" class="size-5" />
              </span>
              <p class="mt-4 text-base font-semibold tracking-[-0.01em] text-white">See the signal you already have</p>
              <p class="mt-1.5 text-sm leading-relaxed text-white/58">Buying intent and risk pulled out of CRM, activity, and touchpoints — read for you.</p>
            </div>
            <div class="surface-risk rounded-[18px] p-6">
              <span class="flex h-10 w-10 items-center justify-center rounded-[12px] bg-gradient-to-br from-[#FB7185] to-[#F43F5E] text-white">
                <UIcon name="i-lucide-bell-ring" class="size-5" />
              </span>
              <p class="mt-4 text-base font-semibold tracking-[-0.01em] text-white">Get warned before they leave</p>
              <p class="mt-1.5 text-sm leading-relaxed text-white/58">Early flags on accounts going quiet, while there's still time to act.</p>
            </div>
            <div class="surface-product rounded-[18px] p-6">
              <span class="flex h-10 w-10 items-center justify-center rounded-[12px] bg-gradient-to-br from-[#2DD4BF] to-[#14B8A6] text-[#06231f]">
                <UIcon name="i-lucide-plug" class="size-5" />
              </span>
              <p class="mt-4 text-base font-semibold tracking-[-0.01em] text-white">No new tools to adopt</p>
              <p class="mt-1.5 text-sm leading-relaxed text-white/58">Works on the systems you already run. Nothing new for your team to learn.</p>
            </div>
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

    <!-- ============ FINAL CTA ============ -->
    <section>
      <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div class="surface-frame relative overflow-hidden rounded-[28px] px-6 py-14 text-center sm:px-12">
          <div class="pointer-events-none absolute inset-0 hero-backdrop opacity-90" />
          <div class="grid-overlay" />
          <div class="relative">
            <div class="eyebrow mx-auto rounded-full">
              <span class="eyebrow-dot" />
              No pitch, just a real conversation
            </div>
            <h2 class="mx-auto mt-6 max-w-2xl text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-white">
              Let's keep the revenue you've
              <span class="headline-interaction">already earned.</span>
            </h2>
            <p class="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/60">
              We're early stage and looking for teams to build this with. Bring your funnel —
              we'll show you what your data already knows.
            </p>
            <div class="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                :href="CALENDLY_URL"
                target="_blank"
                rel="noopener noreferrer"
                class="button-primary inline-flex items-center justify-center gap-2 rounded-[14px] px-7 py-4 text-base font-semibold"
              >
                Book a 15-minute call
                <UIcon name="i-lucide-arrow-right" class="size-4" />
              </a>
              <span class="text-sm text-white/50">calendly.com/neeldandiwala/30min</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
