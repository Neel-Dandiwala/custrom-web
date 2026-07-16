/**
 * Turn integration file ids into readable directory labels.
 * IDs are usually lowercase concatenations (amazonsellercentral) or snake/kebab.
 *
 * Strategy: curated overrides for brands & compounds, then conservative humanize.
 */

const LABEL_OVERRIDES: Record<string, string> = {
  '15five': '15Five',
  '1passwordevents': '1Password Events',
  '8x8': '8x8',
  abacus: 'Abacus',
  ableteams: 'Able Teams',
  acerta: 'Acerta',
  activecampaign: 'ActiveCampaign',
  acton: 'Act-On',
  acuityscheduling: 'Acuity Scheduling',
  adobe: 'Adobe',
  adobesign: 'Adobe Sign',
  adp: 'ADP',
  adyen: 'Adyen',
  afas: 'AFAS',
  affinity: 'Affinity',
  agencyzoom: 'AgencyZoom',
  aha: 'Aha',
  aircall: 'Aircall',
  airtable: 'Airtable',
  airwallex: 'Airwallex',
  akeneo: 'Akeneo',
  alexishr: 'AlexisHR',
  alibabacloud: 'Alibaba Cloud',
  amazon: 'Amazon',
  amazonsellercentral: 'Amazon Seller Central',
  amazonsellercloud: 'Amazon Seller Cloud',
  ameego: 'Ameego',
  anthropic: 'Anthropic',
  anyscale: 'Anyscale',
  apollo: 'Apollo',
  apple: 'Apple',
  appleicloud: 'Apple iCloud',
  applicantstack: 'ApplicantStack',
  apploi: 'Apploi',
  applovinadvertiser: 'AppLovin Advertiser',
  applovinpublisher: 'AppLovin Publisher',
  aptem: 'Aptem',
  asana: 'Asana',
  ashby: 'Ashby',
  assembled: 'Assembled',
  atlassian: 'Atlassian',
  atsanywhere: 'ATS Anywhere',
  attio: 'Attio',
  autodesk: 'Autodesk',
  autopilothq: 'Autopilot HQ',
  avaya: 'Avaya',
  avionte: 'Avionté',
  aweber: 'AWeber',
  awss3: 'AWS S3',
  azure: 'Azure',
  azuredevops: 'Azure DevOps',
  azureopenai: 'Azure OpenAI',
  bamboohr: 'BambooHR',
  bigcommerce: 'BigCommerce',
  bigquery: 'BigQuery',
  bill: 'Bill.com',
  bitbucket: 'Bitbucket',
  bluesky: 'Bluesky',
  boldcommerce: 'Bold Commerce',
  boondmanager: 'BoondManager',
  box: 'Box',
  breathehr: 'Breathe HR',
  breezyhr: 'Breezy HR',
  brex: 'Brex',
  bullhorn: 'Bullhorn',
  bunny: 'Bunny.net',
  cal: 'Cal.com',
  calendarhero: 'CalendarHero',
  calendly: 'Calendly',
  callrail: 'CallRail',
  callswitchone: 'Callswitch One',
  canadapost: 'Canada Post',
  canva: 'Canva',
  canvas: 'Canvas',
  capsulecrm: 'Capsule CRM',
  careerplug: 'CareerPlug',
  carerix: 'Carerix',
  cascade: 'Cascade',
  cats: 'CATS',
  cegid: 'Cegid',
  ceipal: 'Ceipal',
  certn: 'Certn',
  cezannehr: 'Cezanne HR',
  chargebee: 'Chargebee',
  chargify: 'Chargify',
  charliehr: 'Charlie HR',
  checkr: 'Checkr',
  circle: 'Circle',
  clayhr: 'ClayHR',
  clearbit: 'Clearbit',
  clearcompany: 'ClearCompany',
  cleon1: 'Cleon',
  clickup: 'ClickUp',
  clockworkrecruiting: 'Clockwork Recruiting',
  closeio: 'Close',
  cloudtalk: 'CloudTalk',
  clover: 'Clover',
  coda: 'Coda',
  cohere: 'Cohere',
  collage: 'Collage',
  comeet: 'Comeet',
  concur: 'Concur',
  condens: 'Condens',
  confluence: 'Confluence',
  constantcontact: 'Constant Contact',
  contactout: 'ContactOut',
  copper: 'Copper',
  cornerstone: 'Cornerstone',
  coursera: 'Coursera',
  crelate: 'Crelate',
  crezco: 'Crezco',
  crunchbase: 'Crunchbase',
  crustdata: 'Crustdata',
  crystalknows: 'Crystal Knows',
  cultureamp: 'Culture Amp',
  customerio: 'Customer.io',
  d2l: 'D2L',
  dashlane: 'Dashlane',
  datadog: 'Datadog',
  datagma: 'Datagma',
  dayforce: 'Dayforce',
  dealcloud: 'DealCloud',
  deel: 'Deel',
  deepseek: 'DeepSeek',
  deputy: 'Deputy',
  dhl: 'DHL',
  dialpad: 'Dialpad',
  digitalocean: 'DigitalOcean',
  discord: 'Discord',
  docusign: 'DocuSign',
  dovetail: 'Dovetail',
  drip: 'Drip',
  dropbox: 'Dropbox',
  dropcontact: 'Dropcontact',
  dvinci: 'd.vinci',
  easycruit: 'EasyCruit',
  easypost: 'EasyPost',
  eightfold: 'Eightfold',
  elmo: 'ELMO',
  employmenthero: 'Employment Hero',
  enboarder: 'Enboarder',
  engagedly: 'Engagedly',
  eploy: 'Eploy',
  etsy: 'Etsy',
  exactbuyer: 'ExactBuyer',
  exelare: 'Exelare',
  expensify: 'Expensify',
  facebook: 'Facebook',
  factorialhr: 'Factorial HR',
  fadv: 'First Advantage',
  fathom: 'Fathom',
  fedex: 'FedEx',
  fieldglass: 'Fieldglass',
  firefish: 'Firefish',
  fireflies: 'Fireflies.ai',
  firstadvantage: 'First Advantage',
  flatchr: 'FlatHR',
  followupboss: 'Follow Up Boss',
  foundu: 'FoundU',
  fountain: 'Fountain',
  fourthhr: 'Fourth HR',
  freshbooks: 'FreshBooks',
  freshdesk: 'Freshdesk',
  freshsales: 'Freshsales',
  freshteam: 'Freshteam',
  fullcontact: 'FullContact',
  gainsight: 'Gainsight',
  gem: 'Gem',
  getprospect: 'GetProspect',
  getresponse: 'GetResponse',
  gladly: 'Gladly',
  go1: 'Go1',
  gocardless: 'GoCardless',
  goco: 'GoCo',
  gong: 'Gong',
  google: 'Google',
  googleanalytics: 'Google Analytics',
  googleads: 'Google Ads',
  googlecalendar: 'Google Calendar',
  googlecampaignmanager360: 'Google Campaign Manager 360',
  googleclassroom: 'Google Classroom',
  googledocs: 'Google Docs',
  googledrive: 'Google Drive',
  googledv360: 'Google DV360',
  googleforms: 'Google Forms',
  googlegemini: 'Google Gemini',
  googlemail: 'Gmail',
  googlemerchant: 'Google Merchant',
  googlesheets: 'Google Sheets',
  googleslides: 'Google Slides',
  googletasks: 'Google Tasks',
  gorgias: 'Gorgias',
  goto: 'GoTo',
  granola: 'Granola',
  greenhouse: 'Greenhouse',
  grok: 'Grok',
  groq: 'Groq',
  guru: 'Guru',
  gusto: 'Gusto',
  haileyhr: 'Hailey HR',
  harri: 'Harri',
  heavenhr: 'Heaven HR',
  helpscout: 'Help Scout',
  heroku: 'Heroku',
  hexnode: 'Hexnode',
  hibob: 'HiBob',
  highlevel: 'HighLevel',
  hireology: 'Hireology',
  holded: 'Holded',
  homerun: 'Homerun',
  hrcloud1: 'HR Cloud',
  hubspot: 'HubSpot',
  huggingface: 'Hugging Face',
  humaans: 'Humaans',
  humanforce: 'Humanforce',
  humantic: 'Humantic AI',
  humi: 'Humi',
  hunter: 'Hunter',
  icims: 'iCIMS',
  imanage: 'iManage',
  imap: 'IMAP',
  indeed: 'Indeed',
  intercom: 'Intercom',
  jira: 'Jira',
  lattice: 'Lattice',
  lever: 'Lever',
  lightspeedkseries: 'Lightspeed K-Series',
  linear: 'Linear',
  linkedin: 'LinkedIn',
  linkedin_learning: 'LinkedIn Learning',
  mailchimp: 'Mailchimp',
  marketo: 'Marketo',
  micosoftdynamicssales: 'Microsoft Dynamics Sales',
  microsoftdynamicsbusinesscentral: 'Microsoft Dynamics Business Central',
  microsoftdynamicscustomerengagement: 'Microsoft Dynamics Customer Engagement',
  microsoftads: 'Microsoft Ads',
  microsoftintune: 'Microsoft Intune',
  microsoftoutlook: 'Microsoft Outlook',
  microsoftplanner: 'Microsoft Planner',
  microsoftsharepoint: 'Microsoft SharePoint',
  mixpanel: 'Mixpanel',
  notion: 'Notion',
  noun_octopus_68543: 'Unified',
  noun_octopus_68543_1eye: 'Unified',
  noun_octopus_68543_1eye2: 'Unified',
  noun_octopus_68543_1eye3: 'Unified',
  okta: 'Okta',
  outreach: 'Outreach',
  peopledatalabs: 'People Data Labs',
  pipedrive: 'Pipedrive',
  quickbooks: 'QuickBooks',
  recruiterflow: 'Recruiterflow',
  recruitwizard: 'RecruitWizard',
  recruitwithatlas: 'Recruit with Atlas',
  ringcentrallogo: 'RingCentral',
  rippling: 'Rippling',
  salesforce: 'Salesforce',
  salesloft: 'Salesloft',
  search_ads_360_24dp: 'Search Ads 360',
  shopify: 'Shopify',
  slack: 'Slack',
  smartrecruiters: 'SmartRecruiters',
  stripe: 'Stripe',
  successfactors: 'SuccessFactors',
  twilio: 'Twilio',
  unified_octopus: 'Unified',
  unified_octopus2: 'Unified',
  woocommerce: 'WooCommerce',
  workday: 'Workday',
  xero: 'Xero',
  youtube: 'YouTube',
  zendesk: 'Zendesk',
  'zendesk-sell': 'Zendesk Sell',
  zoom: 'Zoom',
}

const ACRONYMS = new Set([
  'aws', 's3', 'adp', 'hr', 'crm', 'api', 'ai', 'sso', 'imap', 'dhl', 'dv', 'hq', 'io', 'ats', 'ukg', 'sap',
])

/** Safe compound prefixes for ids not in LABEL_OVERRIDES (longest first). */
const COMPOUND_PREFIXES: Array<[string, string]> = [
  ['microsoft', 'Microsoft'],
  ['google', 'Google'],
  ['amazon', 'Amazon'],
  ['adobe', 'Adobe'],
  ['apple', 'Apple'],
  ['azure', 'Azure'],
  ['linkedin', 'LinkedIn'],
]

function titleWord(word: string): string {
  const lower = word.toLowerCase()
  if (ACRONYMS.has(lower)) return lower.toUpperCase()
  if (/^\d/.test(word)) return word
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}

/** Title-case a single concatenated token without inventing bad splits. */
function titleCaseSolid(id: string): string {
  // fooBar / already mixed
  if (/[a-z][A-Z]/.test(id)) {
    return id.replace(/([a-z])([A-Z])/g, '$1 $2').split(' ').map(titleWord).join(' ')
  }
  return titleWord(id)
}

function humanizeSeparated(id: string): string {
  return id
    .split(/[-_]+/)
    .filter(Boolean)
    .filter((part) => !/^\d+dp$/i.test(part))
    .map(titleWord)
    .join(' ')
}

function humanizeCompound(id: string): string | null {
  const lower = id.toLowerCase()
  for (const [prefix, label] of COMPOUND_PREFIXES) {
    if (lower.startsWith(prefix) && lower.length > prefix.length) {
      const rest = lower.slice(prefix.length)
      // Insert spaces before digits in remainder
      const restLabel = rest
        .replace(/([a-z])(\d)/g, '$1 $2')
        .split(/\s+/)
        .map(titleWord)
        .join(' ')
      return `${label} ${restLabel}`
    }
  }
  return null
}

/**
 * Prefer curated override; else humanize snake/kebab / known compounds;
 * fall back to solid title-case (never mid-word ellipsis bait from bad splits).
 */
export function formatIntegrationLabel(id: string, existingName?: string): string {
  if (LABEL_OVERRIDES[id]) return LABEL_OVERRIDES[id]

  if (/[-_]/.test(id)) {
    return humanizeSeparated(id)
  }

  const compound = humanizeCompound(id)
  if (compound) return compound

  // Keep already-spaced / branded names from the data file
  if (existingName && /\s/.test(existingName)) return existingName

  // Digits: 15five already overridden; generic foo360
  if (/\d/.test(id)) {
    return id
      .replace(/([a-z])(\d)/gi, '$1 $2')
      .replace(/(\d)([a-z])/gi, '$1 $2')
      .split(/\s+/)
      .map(titleWord)
      .join(' ')
  }

  return titleCaseSolid(id)
}
