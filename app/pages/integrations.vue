<script setup>
import { getVisibleIntegrationLogos } from '~/data/integrationLogos'
import { formatIntegrationLabel } from '~/utils/formatIntegrationLabel'

const CALENDLY_URL = 'https://calendly.com/neeldandiwala/30min'

const title = 'Integrations | Custrom'
const description = 'Connect Custrom to the CRM, support, product, and messaging tools your team already uses. 400+ integrations into one continuous retention pulse.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterCard: 'summary_large_image'
})

const CATEGORIES = ['All', 'CRM', 'Support', 'Messaging', 'Product', 'Ads', 'Other']

const CATEGORY_BY_ID = {
  salesforce: 'CRM',
  hubspot: 'CRM',
  pipedrive: 'CRM',
  closeio: 'CRM',
  'zendesk-sell': 'CRM',
  outreach: 'CRM',
  salesloft: 'CRM',
  freshsales: 'CRM',
  copper: 'CRM',
  sugarcrm: 'CRM',
  zohocrm: 'CRM',
  capsulecrm: 'CRM',
  attio: 'CRM',
  affinity: 'CRM',
  insightly: 'CRM',
  nimble: 'CRM',
  followupboss: 'CRM',
  highlevel: 'CRM',
  agencyzoom: 'CRM',
  dealcloud: 'CRM',
  keap: 'CRM',
  activecampaign: 'CRM',
  micosoftdynamicssales: 'CRM',
  microsoftdynamicscustomerengagement: 'CRM',
  microsoftdynamicsbusinesscentral: 'CRM',
  wealthbox: 'CRM',
  ukg: 'Other',
  bamboohr: 'Other',
  workday: 'Other',
  gusto: 'Other',
  rippling: 'Other',
  zendesk: 'Support',
  intercom: 'Support',
  freshdesk: 'Support',
  helpscout: 'Support',
  gladly: 'Support',
  kustomer: 'Support',
  talkdesk: 'Support',
  ujet: 'Support',
  gainsight: 'Support',
  guru: 'Support',
  assembled: 'Support',
  slack: 'Messaging',
  discord: 'Messaging',
  microsoftteams: 'Messaging',
  twilio: 'Messaging',
  telegram: 'Messaging',
  whatsapp: 'Messaging',
  zoom: 'Messaging',
  webex: 'Messaging',
  aircall: 'Messaging',
  dialpad: 'Messaging',
  justcall: 'Messaging',
  ringcentral: 'Messaging',
  '8x8': 'Messaging',
  avaya: 'Messaging',
  cloudtalk: 'Messaging',
  quo: 'Messaging',
  goto: 'Messaging',
  front: 'Messaging',
  gmail: 'Messaging',
  googlemail: 'Messaging',
  microsoftoutlook: 'Messaging',
  zohomail: 'Messaging',
  imap: 'Messaging',
  mixpanel: 'Product',
  amplitude: 'Product',
  posthog: 'Product',
  googleanalytics: 'Product',
  pendo: 'Product',
  heap: 'Product',
  fullstory: 'Product',
  segment: 'Product',
  jira: 'Product',
  linear: 'Product',
  github: 'Product',
  gitlab: 'Product',
  bitbucket: 'Product',
  notion: 'Product',
  asana: 'Product',
  clickup: 'Product',
  trello: 'Product',
  aha: 'Product',
  productboard: 'Product',
  figma: 'Product',
  confluence: 'Product',
  monday: 'Product',
  airtable: 'Product',
  coda: 'Product',
  typeform: 'Product',
  surveymonkey: 'Product',
  facebook: 'Ads',
  metaads: 'Ads',
  google: 'Ads',
  microsoft_ad: 'Ads',
  linkedin: 'Ads',
  twitter: 'Ads',
  tiktok: 'Ads',
  pinterest: 'Ads',
  snapchat: 'Ads',
  reddit: 'Ads',
  youtube: 'Ads',
  applovinadvertiser: 'Ads',
  applovinpublisher: 'Ads',
  tradedesk: 'Ads',
  search_ads_360_24dp: 'Ads',
  kevel: 'Ads',
  instagram: 'Ads'
}

const CATEGORY_PATTERNS = [
  { cat: 'CRM', re: /(crm|salesforce|hubspot|pipedrive|close|outreach|salesloft|freshsales|copper|zoho.?crm|attio|affinity|insightly|dealcloud|keap|dynamics.?sales|dynamics.?customer|wealthbox|capsule|follow.?up|highlevel|agencyzoom|activecampaign|apollo)/i },
  { cat: 'Support', re: /(zendesk|intercom|freshdesk|helpscout|gladly|kustomer|talkdesk|ujet|gainsight|assembled|support|servicedesk|service.?now)/i },
  { cat: 'Messaging', re: /(slack|discord|teams|twilio|telegram|whatsapp|zoom|webex|aircall|dialpad|justcall|ringcentral|avaya|cloudtalk|front|gmail|outlook|mail|imap|message|chat|sms|phone|call|meeting|calendly|calendar)/i },
  { cat: 'Product', re: /(mixpanel|amplitude|posthog|analytics|pendo|heap|fullstory|segment|jira|linear|github|gitlab|bitbucket|notion|asana|clickup|trello|aha|productboard|figma|confluence|airtable|coda|typeform|survey|product|roadmap)/i },
  { cat: 'Ads', re: /(ads?|advertis|facebook|meta.?ads|google.?ads|microsoft.?ad|linkedin|twitter|tiktok|pinterest|snapchat|reddit|youtube|applovin|tradedesk|search.?ads|kevel|instagram)/i }
]

function categoryFor(item) {
  const id = item.id.toLowerCase()
  if (CATEGORY_BY_ID[id]) return CATEGORY_BY_ID[id]
  const hay = `${id} ${item.name}`
  for (const { cat, re } of CATEGORY_PATTERNS) {
    if (re.test(hay)) return cat
  }
  return 'Other'
}

const searchQuery = ref('')
const activeCategory = ref('All')

const enrichedLogos = computed(() =>
  getVisibleIntegrationLogos()
    .map((item) => ({
      ...item,
      label: formatIntegrationLabel(item.id, item.name),
      category: categoryFor(item)
    }))
    .sort((a, b) => a.label.localeCompare(b.label, undefined, { sensitivity: 'base' }))
)

const filteredLogos = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  return enrichedLogos.value.filter((item) => {
    const catOk = activeCategory.value === 'All' || item.category === activeCategory.value
    if (!catOk) return false
    if (!q) return true
    return (
      item.label.toLowerCase().includes(q)
      || item.name.toLowerCase().includes(q)
      || item.id.toLowerCase().includes(q)
      || item.category.toLowerCase().includes(q)
    )
  })
})

const resultCount = computed(() => filteredLogos.value.length)
const totalCount = getVisibleIntegrationLogos().length

function hideBrokenLogo(event) {
  const el = event.target
  if (el) el.style.visibility = 'hidden'
}
</script>

<template>
  <div>
    <section class="border-b border-white/10">
      <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <p class="text-sm font-semibold uppercase tracking-[0.14em] text-white/45">Integrations</p>
        <h1 class="sv-section-heading mt-3 max-w-3xl">
          Connected
          <span class="headline-interaction">out of the box</span>
        </h1>
        <p class="sv-body-copy mt-4 max-w-2xl">
          Connect Custrom to the CRM, support, product, and messaging tools your team already uses. One continuous retention pulse.
        </p>

        <div class="mt-10 flex flex-col gap-4">
          <div class="relative max-w-xl">
            <UIcon name="i-lucide-search" class="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-white/35" />
            <input
              v-model="searchQuery"
              type="search"
              class="int-search w-full rounded-[12px] border border-white/10 bg-white/[0.03] py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-white/25"
              placeholder="Search integrations"
              autocomplete="off"
              spellcheck="false"
            >
          </div>

          <div class="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
            <button
              v-for="cat in CATEGORIES"
              :key="cat"
              type="button"
              role="tab"
              class="rounded-full border px-3.5 py-1.5 text-sm font-medium transition"
              :class="activeCategory === cat
                ? 'border-white/25 bg-white/10 text-white'
                : 'border-white/10 bg-transparent text-white/55 hover:text-white'"
              :aria-selected="activeCategory === cat"
              @click="activeCategory = cat"
            >
              {{ cat }}
            </button>
          </div>

          <p class="text-sm text-white/45" aria-live="polite">
            {{ resultCount === totalCount
              ? `${totalCount} integrations`
              : `${resultCount} of ${totalCount}` }}
          </p>
        </div>
      </div>
    </section>

    <section class="border-b border-white/10">
      <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <p v-if="resultCount === 0" class="text-sm text-white/55">
          No integrations match your filters. Try another keyword or category.
        </p>

        <ul v-else class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          <li
            v-for="item in filteredLogos"
            :key="item.id"
            class="surface-soft flex items-center gap-3 rounded-[14px] p-3.5"
          >
            <span class="int-logo-tile">
              <img
                :src="item.logo"
                alt=""
                width="32"
                height="32"
                loading="lazy"
                decoding="async"
                @error="hideBrokenLogo"
              >
            </span>
            <div class="min-w-0">
              <p class="truncate text-sm font-semibold text-white">{{ item.label }}</p>
              <p class="truncate text-[11px] text-white/42">{{ item.category }}</p>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <section>
      <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div class="surface-frame rounded-[20px] px-6 py-12 text-center sm:px-10">
          <h2 class="text-2xl font-semibold tracking-[-0.03em] text-white">Don't see your tool?</h2>
          <p class="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-white/58">
            Tell us what you use. We prioritize connectors for design partners.
          </p>
          <div class="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              :href="CALENDLY_URL"
              target="_blank"
              rel="noopener noreferrer"
              class="button-primary inline-flex items-center justify-center gap-2 rounded-[10px] px-6 py-3.5 text-sm font-semibold"
            >
              Book a 15 min call
              <UIcon name="i-lucide-arrow-right" class="size-4" />
            </a>
            <NuxtLink
              to="/design-partners"
              class="button-secondary inline-flex items-center justify-center rounded-[10px] px-6 py-3.5 text-sm font-semibold"
            >
              Design Partner Program
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
