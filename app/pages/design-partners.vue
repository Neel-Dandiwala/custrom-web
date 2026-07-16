<script setup>
const CALENDLY_URL = 'https://calendly.com/neeldandiwala/30min'

const title = 'Design Partner Program | Custrom'
const description = 'Join Custrom\'s Design Partner Program: lock in founding pricing, get direct founder support, and go live in under 7 days with zero technical setup.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterCard: 'summary_large_image'
})

const hero = {
  headline: 'Shape the future of customer retention',
  sub: 'Join our exclusive Design Partner Program. Get a locked founding price, direct founder support, and zero technical setup.'
}

const getItems = [
  {
    title: 'Zero overhead',
    body: 'No setup fees, read only integration, live in under 7 days'
  },
  {
    title: 'Direct access',
    body: 'Dedicated Slack/WhatsApp channel directly with the founding team'
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

const guaranteeRows = [
  {
    deliver: 'Live Account Health View in under 7 days',
    achieve: 'Identify 2+ hidden customer risks'
  },
  {
    deliver: '24 hr alerts for failed payments',
    achieve: 'Catch 1+ churn risk before cancellation'
  },
  {
    deliver: 'Early signal detection for quiet accounts',
    achieve: 'Recovered revenue that pays for the product'
  }
]

const stackOptions = ['Salesforce', 'Stripe', 'PostHog', 'Zendesk', 'Slack']

const form = reactive({
  email: '',
  company: '',
  stack: [],
  challenge: ''
})

const formErrors = reactive({
  email: '',
  company: '',
  challenge: ''
})

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

function handleSubmit() {
  formErrors.email = ''
  formErrors.company = ''
  formErrors.challenge = ''

  let valid = true

  if (!form.email.trim()) {
    formErrors.email = 'Work email is required.'
    valid = false
  } else if (!validateEmail(form.email)) {
    formErrors.email = 'Enter a valid work email.'
    valid = false
  }

  if (!form.company.trim()) {
    formErrors.company = 'Company name and customer base size are required.'
    valid = false
  }

  if (!form.challenge.trim()) {
    formErrors.challenge = 'Tell us your primary retention challenge.'
    valid = false
  }

  if (!valid) return

  window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer')
}

function toggleStack(option) {
  const idx = form.stack.indexOf(option)
  if (idx === -1) {
    form.stack.push(option)
  } else {
    form.stack.splice(idx, 1)
  }
}
</script>

<template>
  <div>
    <!-- HERO -->
    <section class="hero-backdrop relative overflow-hidden border-b border-white/10">
      <div class="grid-overlay" />
      <div class="relative mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <h1 class="mx-auto max-w-3xl text-[clamp(2.3rem,5vw,4rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-white">
          Shape the future of
          <span class="headline-interaction">customer retention</span>
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
    <section id="value" class="border-b border-white/10">
      <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="sv-section-heading">
            A founding partnership,
            <span class="headline-interaction">not a waitlist</span>
          </h2>
          <p class="sv-body-copy mt-4">
            Three to five teams get white glove onboarding and locked founding pricing, in exchange for a lightweight pilot commitment.
          </p>
        </div>

        <div class="mt-14 grid gap-6 lg:grid-cols-2">
          <div class="surface-product rounded-[16px] p-7 lg:p-8">
            <p class="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">What you get</p>
            <ul class="mt-5 space-y-4">
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
            <p class="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">What we need</p>
            <ul class="mt-5 space-y-4">
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

    <!-- GUARANTEE -->
    <section id="guarantee" class="border-b border-white/10">
      <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="sv-section-heading">
            Six weeks,
            <span class="headline-interaction">measured outcomes</span>
          </h2>
          <p class="sv-body-copy mt-4">
            We commit to specific deliverables. You commit to using the insights, and we score the pilot together at week six.
          </p>
        </div>

        <div class="mt-12 overflow-hidden rounded-[16px] border border-white/10">
          <div class="grid grid-cols-2 border-b border-white/10 bg-white/[0.03]">
            <p class="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45">We deliver</p>
            <p class="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45">You achieve</p>
          </div>
          <div
            v-for="(row, i) in guaranteeRows"
            :key="i"
            class="grid grid-cols-1 border-b border-white/10 last:border-b-0 sm:grid-cols-2"
          >
            <div class="flex items-start gap-2.5 px-5 py-4 text-sm text-white/80">
              <UIcon name="i-lucide-check" class="mt-0.5 size-4 shrink-0 text-[#5EEAD4]" />
              {{ row.deliver }}
            </div>
            <div class="flex items-start gap-2.5 border-t border-white/10 px-5 py-4 text-sm text-white/65 sm:border-t-0 sm:border-l">
              <UIcon name="i-lucide-arrow-right" class="mt-0.5 size-4 shrink-0 text-white/35" />
              {{ row.achieve }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- APPLY -->
    <section id="apply" class="border-b border-white/10">
      <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="sv-section-heading">
            Apply for the
            <span class="headline-interaction">Design Partner Cohort</span>
          </h2>
          <p class="sv-body-copy mt-4">
            Tell us about your team. If it's a fit, we'll book a 30 minute call and have you live within the first week.
          </p>
        </div>

        <form class="surface-frame mx-auto mt-12 max-w-2xl rounded-[16px] p-6 sm:p-8" novalidate @submit.prevent="handleSubmit">
          <div class="grid gap-5 sm:grid-cols-2">
            <div class="sm:col-span-1">
              <label for="dp-email" class="mb-2 block text-sm font-medium text-white/70">Work email</label>
              <input
                id="dp-email"
                v-model="form.email"
                type="email"
                name="email"
                autocomplete="email"
                placeholder="you@company.com"
                class="dp-input"
                :aria-invalid="!!formErrors.email"
              >
              <p v-if="formErrors.email" class="mt-1.5 text-sm text-[#FB7185]" role="alert">{{ formErrors.email }}</p>
            </div>

            <div class="sm:col-span-1">
              <label for="dp-company" class="mb-2 block text-sm font-medium text-white/70">Company name &amp; customer base size</label>
              <input
                id="dp-company"
                v-model="form.company"
                type="text"
                name="company"
                autocomplete="organization"
                placeholder="Acme Corp · ~200 customers"
                class="dp-input"
                :aria-invalid="!!formErrors.company"
              >
              <p v-if="formErrors.company" class="mt-1.5 text-sm text-[#FB7185]" role="alert">{{ formErrors.company }}</p>
            </div>
          </div>

          <fieldset class="mt-6">
            <legend class="mb-3 text-sm font-medium text-white/70">Tech stack used</legend>
            <div class="flex flex-wrap gap-2">
              <label
                v-for="option in stackOptions"
                :key="option"
                class="cursor-pointer rounded-full border px-3.5 py-1.5 text-sm font-medium transition"
                :class="form.stack.includes(option)
                  ? 'border-white/25 bg-white/10 text-white'
                  : 'border-white/10 text-white/55 hover:text-white'"
              >
                <input
                  type="checkbox"
                  class="sr-only"
                  :checked="form.stack.includes(option)"
                  @change="toggleStack(option)"
                >
                {{ option }}
              </label>
            </div>
          </fieldset>

          <div class="mt-6">
            <label for="dp-challenge" class="mb-2 block text-sm font-medium text-white/70">Primary retention challenge</label>
            <textarea
              id="dp-challenge"
              v-model="form.challenge"
              name="challenge"
              rows="3"
              placeholder="e.g. We find out customers are unhappy on the day they cancel..."
              class="dp-input min-h-[96px] resize-y"
              :aria-invalid="!!formErrors.challenge"
            />
            <p v-if="formErrors.challenge" class="mt-1.5 text-sm text-[#FB7185]" role="alert">{{ formErrors.challenge }}</p>
          </div>

          <button
            type="submit"
            class="button-primary mt-7 inline-flex w-full items-center justify-center gap-2 rounded-[10px] px-6 py-3.5 text-sm font-semibold sm:w-auto"
          >
            Apply for Design Partner Cohort
            <UIcon name="i-lucide-arrow-right" class="size-4" />
          </button>
          <p class="mt-3 text-sm text-white/45">
            After submitting, you'll be redirected to book a 30 minute call with the founders.
          </p>
        </form>
      </div>
    </section>
  </div>
</template>
