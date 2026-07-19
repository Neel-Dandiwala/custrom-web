<script setup>
/**
 * Static mock of the demo account detail view:
 * https://custrom-demo.onrender.com/#/accounts/acme-corp
 */
defineProps({
  compact: {
    type: Boolean,
    default: false
  }
})

const account = {
  name: 'Acme Corp',
  logo: 'AC',
  stage: 'Implementation',
  health: 52,
  tone: 'risk',
  arr: '$42,000',
  goLive: 'June 28',
  owner: 'Riya',
  riskLevel: 'High',
  scoreFrom: 73,
  scoreTo: 52,
  scoreWindow: 'this week',
  scoreDrivers: [
    {
      icon: 'i-lucide-message-square',
      head: 'SSO blocker repeated in Slack',
      sub: 'Same blocker surfaced 4 times across 6 days without resolution.'
    },
    {
      icon: 'i-lucide-ticket',
      head: 'P1 ticket unresolved for 8 days',
      sub: 'Ticket #4821 has breached the 24h resolution target.'
    },
    {
      icon: 'i-lucide-smile',
      head: 'Sentiment shifted neutral to frustrated',
      sub: 'Tone in the implementation channel declined over the last 3 days.'
    },
    {
      icon: 'i-lucide-clock',
      head: 'Go live date approaching',
      sub: 'Only 5 days to go live with an open critical blocker.'
    }
  ],
  timeline: [
    {
      source: 'Slack',
      icon: 'i-lucide-hash',
      text: '“We’re blocked on SSO and can’t test login flows.”',
      time: '2 hours ago'
    },
    {
      source: 'Zendesk',
      icon: 'i-lucide-ticket',
      text: 'Ticket #4821 still open, awaiting engineering',
      time: 'Yesterday'
    },
    {
      source: 'CRM',
      icon: 'i-lucide-building-2',
      text: 'Stage moved to Implementation',
      time: '6 days ago'
    },
    {
      source: 'Calendar',
      icon: 'i-lucide-calendar',
      text: 'Go live call scheduled for June 28',
      time: '8 days ago'
    }
  ],
  ticketSummary: {
    id: '#4821',
    title: 'SSO / SAML login fails for Okta tenant',
    priority: 'P1',
    opened: '8 days ago',
    status: 'Open, awaiting engineering',
    followUps: 2,
    note: 'Customer cannot complete SSO setup; blocking all user provisioning ahead of go live.'
  },
  sentiment: {
    from: 'Neutral',
    to: 'Frustrated',
    split: { positive: 12, neutral: 33, negative: 55 }
  },
  blockers: [
    {
      head: 'SSO / SAML configuration',
      sev: 'High',
      sub: 'Login flows cannot be tested until Okta SAML is resolved. Tied to ticket #4821.'
    },
    {
      head: 'User provisioning paused',
      sev: 'Medium',
      sub: 'Bulk user import is blocked behind SSO. 140 seats pending.'
    }
  ],
  nextActions: [
    {
      head: 'Escalate ticket #4821 to engineering',
      sub: 'Flag as go live blocker, request same day triage.',
      integration: '/integrations/zendesk.png'
    },
    {
      head: 'Book 15 minute unblocker call',
      sub: 'Riya + implementation lead + customer admin.',
      integration: '/integrations/calendly.png'
    },
    {
      head: 'Confirm go live readiness by June 26',
      sub: 'Re score account after SSO resolution.',
      integration: '/integrations/hubspot.svg'
    }
  ]
}

const stats = [
  { label: 'Stage', value: account.stage },
  { label: 'ARR', value: account.arr },
  { label: 'Owner', value: account.owner },
  { label: 'Go live', value: account.goLive },
  { label: 'Health', value: `${account.health}/100` }
]

const scoreDelta = account.scoreTo - account.scoreFrom
</script>

<template>
  <div
    class="adm"
    :class="{ 'adm--compact': compact }"
    aria-label="Acme Corp account detail mockup"
  >
    <div class="adm-back">
      <UIcon
        name="i-lucide-arrow-left"
        class="size-3.5"
      />
      Back to dashboard
    </div>

    <header class="adm-header">
      <div class="adm-header-top">
        <div class="adm-id">
          <span class="adm-logo">{{ account.logo }}</span>
          <div>
            <h3 class="adm-name">
              {{ account.name }}
            </h3>
            <div class="adm-id-sub">
              <span class="adm-badge adm-badge--risk">
                <span class="adm-badge-dot" />
                {{ account.riskLevel }} risk
              </span>
              <span class="adm-stage">{{ account.stage }}</span>
            </div>
          </div>
        </div>
        <div class="adm-actions">
          <span class="adm-btn">
            <UIcon
              name="i-lucide-calendar"
              class="size-3.5"
            />
            Book call
          </span>
          <span class="adm-btn adm-btn--primary">
            <UIcon
              name="i-lucide-zap"
              class="size-3.5"
            />
            Run suggested action
          </span>
        </div>
      </div>

      <div class="adm-stat-row">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="adm-stat"
        >
          <div class="adm-stat-label">
            {{ stat.label }}
          </div>
          <div class="adm-stat-value">
            {{ stat.value }}
          </div>
        </div>
      </div>
    </header>

    <div class="adm-grid">
      <div class="adm-col">
        <section class="adm-card">
          <h4 class="adm-card-title">
            <UIcon
              name="i-lucide-trending-down"
              class="size-3.5"
            />
            Why this score changed
          </h4>
          <div class="adm-score-track">
            <span class="adm-score-pill adm-score-pill--from">{{ account.scoreFrom }}</span>
            <UIcon
              name="i-lucide-arrow-right"
              class="size-4 text-white/30"
            />
            <span class="adm-score-pill adm-score-pill--to">{{ account.scoreTo }}</span>
            <span class="adm-badge adm-badge--risk adm-score-delta">
              <span class="adm-badge-dot" />
              ↓ {{ Math.abs(scoreDelta) }} pts {{ account.scoreWindow }}
            </span>
          </div>
          <div class="adm-divider" />
          <div
            v-for="driver in account.scoreDrivers"
            :key="driver.head"
            class="adm-summary-line"
          >
            <span class="adm-summary-ico">
              <UIcon
                :name="driver.icon"
                class="size-3.5"
              />
            </span>
            <div>
              <div class="adm-summary-head">
                {{ driver.head }}
              </div>
              <div class="adm-summary-sub">
                {{ driver.sub }}
              </div>
            </div>
          </div>
        </section>

        <section class="adm-card">
          <h4 class="adm-card-title">
            <UIcon
              name="i-lucide-clock"
              class="size-3.5"
            />
            Cross tool timeline
          </h4>
          <ul class="adm-timeline">
            <li
              v-for="item in account.timeline"
              :key="item.time + item.source"
              class="adm-tl-item"
            >
              <span class="adm-tl-node">
                <UIcon
                  :name="item.icon"
                  class="size-2.5"
                />
              </span>
              <div class="adm-tl-source">
                {{ item.source }}
              </div>
              <div class="adm-tl-text">
                {{ item.text }}
              </div>
              <div class="adm-tl-time">
                {{ item.time }}
              </div>
            </li>
          </ul>
        </section>

        <section class="adm-card">
          <h4 class="adm-card-title">
            <UIcon
              name="i-lucide-ticket"
              class="size-3.5"
            />
            Ticket summary
          </h4>
          <div class="adm-ticket-head">
            <div class="adm-ticket-title">
              {{ account.ticketSummary.id }}, {{ account.ticketSummary.title }}
            </div>
            <span class="adm-badge adm-badge--risk">
              <span class="adm-badge-dot" />
              {{ account.ticketSummary.priority }}
            </span>
          </div>
          <div class="adm-kv-grid">
            <div class="adm-kv">
              <div class="adm-kv-k">
                Opened
              </div>
              <div class="adm-kv-v">
                {{ account.ticketSummary.opened }}
              </div>
            </div>
            <div class="adm-kv">
              <div class="adm-kv-k">
                Status
              </div>
              <div class="adm-kv-v adm-kv-v--risk">
                {{ account.ticketSummary.status }}
              </div>
            </div>
            <div class="adm-kv">
              <div class="adm-kv-k">
                Customer follow ups
              </div>
              <div class="adm-kv-v">
                {{ account.ticketSummary.followUps }}
              </div>
            </div>
            <div class="adm-kv">
              <div class="adm-kv-k">
                SLO
              </div>
              <div class="adm-kv-v">
                <span class="adm-badge adm-badge--risk">
                  <span class="adm-badge-dot" />
                  Breached
                </span>
              </div>
            </div>
          </div>
          <p class="adm-note">
            {{ account.ticketSummary.note }}
          </p>
        </section>
      </div>

      <div class="adm-col">
        <section class="adm-card">
          <h4 class="adm-card-title">
            <UIcon
              name="i-lucide-smile"
              class="size-3.5"
            />
            Slack / Discord sentiment
          </h4>
          <div class="adm-sentiment-shift">
            <span class="adm-stage">{{ account.sentiment.from }}</span>
            <UIcon
              name="i-lucide-arrow-right"
              class="size-3.5 text-white/30"
            />
            <span class="adm-badge adm-badge--risk">
              <span class="adm-badge-dot" />
              {{ account.sentiment.to }}
            </span>
          </div>
          <div class="adm-sentiment-bar">
            <span
              class="adm-sentiment-bar__good"
              :style="{ width: account.sentiment.split.positive + '%' }"
            />
            <span
              class="adm-sentiment-bar__warn"
              :style="{ width: account.sentiment.split.neutral + '%' }"
            />
            <span
              class="adm-sentiment-bar__risk"
              :style="{ width: account.sentiment.split.negative + '%' }"
            />
          </div>
          <div class="adm-sentiment-legend">
            <span><i class="adm-sw adm-sw--good" />Positive {{ account.sentiment.split.positive }}%</span>
            <span><i class="adm-sw adm-sw--warn" />Neutral {{ account.sentiment.split.neutral }}%</span>
            <span><i class="adm-sw adm-sw--risk" />Negative {{ account.sentiment.split.negative }}%</span>
          </div>
        </section>

        <section class="adm-card">
          <h4 class="adm-card-title">
            <UIcon
              name="i-lucide-triangle-alert"
              class="size-3.5"
            />
            Open blockers
            <span class="adm-count">({{ account.blockers.length }})</span>
          </h4>
          <div
            v-for="blocker in account.blockers"
            :key="blocker.head"
            class="adm-blocker"
          >
            <div class="adm-blocker-head">
              {{ blocker.head }}
              <span
                class="adm-badge"
                :class="blocker.sev === 'High' ? 'adm-badge--risk' : 'adm-badge--warn'"
              >
                <span class="adm-badge-dot" />
                {{ blocker.sev }}
              </span>
            </div>
            <div class="adm-blocker-sub">
              {{ blocker.sub }}
            </div>
          </div>
        </section>

        <section class="adm-card">
          <h4 class="adm-card-title">
            <UIcon
              name="i-lucide-zap"
              class="size-3.5"
            />
            Suggested next actions
          </h4>
          <div
            v-for="action in account.nextActions"
            :key="action.head"
            class="adm-next"
          >
            <span class="adm-next-check">
              <UIcon
                name="i-lucide-check"
                class="size-3"
              />
            </span>
            <div>
              <div class="adm-next-head">
                <span class="adm-next-logo">
                  <img
                    :src="action.integration"
                    alt=""
                    width="14"
                    height="14"
                  >
                </span>
                {{ action.head }}
              </div>
              <div class="adm-next-sub">
                {{ action.sub }}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.adm {
  --adm-hairline: rgba(255, 255, 255, 0.08);
  --adm-hairline-soft: rgba(255, 255, 255, 0.05);
  --adm-surface: rgba(255, 255, 255, 0.02);
  --adm-surface-soft: rgba(255, 255, 255, 0.03);
  --adm-text: #ececee;
  --adm-muted: rgba(236, 236, 238, 0.52);
  --adm-faint: rgba(236, 236, 238, 0.38);
  --adm-good: #5eead4;
  --adm-warn: #fcd34d;
  --adm-risk: #fb7185;
  color: var(--adm-text);
  text-align: left;
}

.adm-back {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 14px;
  font-size: 13px;
  color: var(--adm-faint);
}

.adm-header {
  margin-bottom: 16px;
  padding: 22px 24px;
  border: 1px solid var(--adm-hairline);
  border-radius: 16px;
  background:
    radial-gradient(700px circle at 88% -40%, rgba(129, 140, 248, 0.08) 0%, transparent 55%),
    var(--adm-surface);
}

.adm-header-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.adm-id {
  display: flex;
  align-items: center;
  gap: 14px;
}

.adm-logo {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  border: 1px solid var(--adm-hairline);
  background: var(--adm-surface-soft);
  font-size: 18px;
  font-weight: 700;
  color: #fff;
}

.adm-name {
  margin: 0;
  font-size: 22px;
  font-weight: 600;
  letter-spacing: -0.03em;
  color: #fff;
}

.adm-id-sub {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 5px;
}

.adm-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.adm-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-height: 36px;
  padding: 8px 14px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: transparent;
  color: rgba(255, 255, 255, 0.85);
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
}

.adm-btn--primary {
  background: #fff;
  color: #08080a;
  border-color: #fff;
  font-weight: 600;
}

.adm-stat-row {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 16px 20px;
  margin-top: 22px;
  padding-top: 20px;
  border-top: 1px solid var(--adm-hairline-soft);
}

.adm-stat {
  min-width: 0;
}

.adm-stat-label {
  font-size: 11px;
  color: var(--adm-faint);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.adm-stat-value {
  margin-top: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
  line-height: 1.25;
  overflow-wrap: anywhere;
}

.adm-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 16px;
  align-items: start;
}

.adm-col {
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-width: 0;
}

.adm-card {
  border: 1px solid var(--adm-hairline);
  border-radius: 14px;
  background: var(--adm-surface);
  padding: 18px 20px;
}

.adm-card-title {
  display: flex;
  align-items: center;
  gap: 9px;
  margin: 0 0 14px;
  font-size: 13px;
  font-weight: 600;
  color: #fff;
}

.adm-count {
  color: rgba(236, 236, 238, 0.32);
  font-weight: 500;
}

.adm-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 9px;
  border-radius: 999px;
  border: 1px solid transparent;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
}

.adm-badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: currentColor;
}

.adm-badge--risk {
  color: #e8a0b4;
  background: rgba(251, 113, 133, 0.12);
  border-color: rgba(251, 113, 133, 0.28);
}

.adm-badge--warn {
  color: #d4bc6a;
  background: rgba(252, 211, 77, 0.1);
  border-color: rgba(252, 211, 77, 0.24);
}

.adm-stage {
  display: inline-flex;
  align-items: center;
  padding: 3px 8px;
  border-radius: 6px;
  border: 1px solid var(--adm-hairline);
  background: rgba(255, 255, 255, 0.04);
  font-size: 11px;
  color: rgba(236, 236, 238, 0.65);
}

.adm-score-track {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 4px 0 13px;
}

.adm-score-pill {
  width: 56px;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.adm-score-pill--from {
  color: var(--adm-faint);
}

.adm-score-pill--to {
  color: var(--adm-risk);
}

.adm-score-delta {
  margin-left: auto;
}

.adm-divider {
  height: 1px;
  margin: 0 0 4px;
  background: var(--adm-hairline-soft);
}

.adm-summary-line {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--adm-hairline-soft);
}

.adm-summary-line:last-child {
  border-bottom: none;
}

.adm-summary-ico {
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  border-radius: 7px;
  border: 1px solid var(--adm-hairline-soft);
  background: var(--adm-surface-soft);
  color: var(--adm-faint);
}

.adm-summary-head {
  font-size: 13px;
  font-weight: 600;
  color: var(--adm-text);
}

.adm-summary-sub {
  margin-top: 2px;
  font-size: 12px;
  line-height: 1.45;
  color: var(--adm-faint);
}

.adm-timeline {
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;
}

.adm-timeline::before {
  content: '';
  position: absolute;
  left: 11px;
  top: 8px;
  bottom: 8px;
  width: 1px;
  background: var(--adm-hairline-soft);
}

.adm-tl-item {
  position: relative;
  padding: 0 0 16px 36px;
}

.adm-tl-item:last-child {
  padding-bottom: 0;
}

.adm-tl-node {
  position: absolute;
  left: 0;
  top: 0;
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border-radius: 999px;
  border: 1px solid var(--adm-hairline);
  background: #0a0a0c;
  color: rgba(236, 236, 238, 0.65);
}

.adm-tl-source {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--adm-faint);
}

.adm-tl-text {
  margin-top: 3px;
  font-size: 13px;
  line-height: 1.45;
  color: var(--adm-text);
}

.adm-tl-time {
  margin-top: 3px;
  font-size: 11px;
  color: rgba(236, 236, 238, 0.32);
}

.adm-ticket-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;
}

.adm-ticket-title {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
}

.adm-kv-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px;
  overflow: hidden;
  border: 1px solid var(--adm-hairline-soft);
  border-radius: 10px;
  background: var(--adm-hairline-soft);
}

.adm-kv {
  background: #0a0a0c;
  padding: 12px 14px;
}

.adm-kv-k {
  font-size: 11px;
  color: var(--adm-faint);
}

.adm-kv-v {
  margin-top: 5px;
  font-size: 13px;
  font-weight: 500;
  color: var(--adm-text);
}

.adm-kv-v--risk {
  color: var(--adm-risk);
}

.adm-note {
  margin: 12px 0 0;
  font-size: 13px;
  line-height: 1.55;
  color: var(--adm-muted);
}

.adm-sentiment-shift {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.adm-sentiment-bar {
  display: flex;
  height: 8px;
  margin: 4px 0 14px;
  overflow: hidden;
  border-radius: 999px;
  border: 1px solid var(--adm-hairline-soft);
}

.adm-sentiment-bar span {
  display: block;
}

.adm-sentiment-bar__good {
  background: var(--adm-good);
}

.adm-sentiment-bar__warn {
  background: var(--adm-warn);
}

.adm-sentiment-bar__risk {
  background: var(--adm-risk);
}

.adm-sentiment-legend {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  font-size: 12px;
  color: var(--adm-faint);
}

.adm-sentiment-legend span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.adm-sw {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 3px;
}

.adm-sw--good {
  background: var(--adm-good);
}

.adm-sw--warn {
  background: var(--adm-warn);
}

.adm-sw--risk {
  background: var(--adm-risk);
}

.adm-blocker {
  padding: 13px 0;
  border-bottom: 1px solid var(--adm-hairline-soft);
}

.adm-blocker:last-child {
  border-bottom: none;
}

.adm-blocker-head {
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--adm-text);
}

.adm-blocker-sub {
  margin-top: 4px;
  font-size: 12px;
  line-height: 1.5;
  color: var(--adm-faint);
}

.adm-next {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 13px 0;
  border-bottom: 1px solid var(--adm-hairline-soft);
}

.adm-next:last-child {
  border-bottom: none;
}

.adm-next-check {
  display: grid;
  place-items: center;
  width: 18px;
  height: 18px;
  margin-top: 1px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: #a5b4fc;
}

.adm-next-head {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
  font-weight: 500;
  color: var(--adm-text);
}

.adm-next-logo {
  display: grid;
  place-items: center;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid var(--adm-hairline);
  background: rgba(255, 255, 255, 0.04);
  padding: 2px;
}

.adm-next-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.adm-next-sub {
  margin-top: 3px;
  font-size: 12px;
  color: var(--adm-faint);
}

.adm--compact .adm-back {
  margin-bottom: 10px;
  font-size: 12px;
}

.adm--compact .adm-header {
  margin-bottom: 10px;
  padding: 14px 16px;
}

.adm--compact .adm-logo {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  font-size: 14px;
}

.adm--compact .adm-name {
  font-size: 18px;
}

.adm--compact .adm-btn {
  min-height: 32px;
  padding: 6px 12px;
  font-size: 12px;
}

.adm--compact .adm-stat-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px 28px;
  margin-top: 16px;
  padding-top: 16px;
}

.adm--compact .adm-stat {
  flex: 1 1 96px;
  min-width: 96px;
  max-width: 140px;
}

.adm--compact .adm-stat-label {
  display: block;
  font-size: 10px;
  letter-spacing: 0.06em;
  margin-bottom: 0;
}

.adm--compact .adm-stat-value {
  display: block;
  margin-top: 7px;
  font-size: 13px;
  line-height: 1.3;
  white-space: normal;
}

.adm--compact .adm-grid {
  gap: 10px;
}

.adm--compact .adm-col {
  gap: 10px;
}

.adm--compact .adm-card {
  padding: 12px 14px;
}

.adm--compact .adm-card-title {
  margin-bottom: 10px;
  font-size: 12px;
}

.adm--compact .adm-score-pill {
  width: 44px;
  font-size: 16px;
}

.adm--compact .adm-summary-line,
.adm--compact .adm-blocker,
.adm--compact .adm-next {
  padding: 8px 0;
}

.adm--compact .adm-tl-item {
  padding-bottom: 10px;
}

.adm--compact .adm-note {
  margin-top: 8px;
  font-size: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.adm--compact .adm-kv {
  padding: 9px 11px;
}

@media (max-width: 900px) {
  .adm-grid {
    grid-template-columns: 1fr;
  }

  .adm-stat-row {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    row-gap: 18px;
  }
}

@media (max-width: 560px) {
  .adm-header {
    padding: 18px 16px;
  }

  .adm-stat-row {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .adm-score-delta {
    margin-left: 0;
  }

  .adm-score-track {
    flex-wrap: wrap;
  }
}
</style>
