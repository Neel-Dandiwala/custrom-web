<script setup>
/**
 * Mobile Acme account UI inside an iPhone frame for the hero.
 * Kept sparse so it reads clearly at mockup size.
 */
const account = {
  name: 'Acme Corp',
  logo: '/mockups/logo-acme.svg',
  stage: 'Implementation',
  health: 52,
  type: 'High Risk',
  arr: '$42k',
  scoreFrom: 73,
  scoreTo: 52,
  reason: 'SSO blocker mentioned 4× in Slack',
  action: 'Escalate blocker',
  blockers: [
    { head: 'SSO / SAML', sev: 'High' },
    { head: 'Provisioning', sev: 'Med' }
  ]
}
</script>

<template>
  <div
    class="apm"
    aria-label="Acme Corp mobile account preview"
  >
    <div class="apm-screen">
      <div class="apm-screen-inner">
        <header class="apm-brand">
          <img
            src="/custrom_white.png"
            alt=""
            class="apm-brand-icon"
            width="16"
            height="16"
          >
          <span class="apm-brand-name">Custrom</span>
          <span class="apm-brand-avatar">RD</span>
        </header>

        <div class="apm-account">
          <img
            :src="account.logo"
            :alt="account.name"
            class="apm-account-logo"
            width="28"
            height="28"
          >
          <div class="apm-account-meta">
            <div class="apm-account-name">
              {{ account.name }}
            </div>
            <div class="apm-account-tags">
              <span class="apm-chip apm-chip--risk">{{ account.type }}</span>
              <span class="apm-stage">{{ account.stage }}</span>
            </div>
          </div>
        </div>

        <div class="apm-stats">
          <div class="apm-stat">
            <span class="apm-stat-label">Health</span>
            <span class="apm-stat-value apm-stat-value--risk">{{ account.health }}</span>
            <div class="apm-health-bar">
              <div
                class="apm-health-fill"
                :style="{ width: account.health + '%' }"
              />
            </div>
          </div>
          <div class="apm-stat">
            <span class="apm-stat-label">ARR</span>
            <span class="apm-stat-value">{{ account.arr }}</span>
          </div>
          <div class="apm-stat">
            <span class="apm-stat-label">Score</span>
            <span class="apm-stat-value apm-stat-value--score">
              <span class="apm-score-from">{{ account.scoreFrom }}</span>
              <span class="apm-score-arrow">→</span>
              <span class="apm-score-to">{{ account.scoreTo }}</span>
            </span>
          </div>
        </div>

        <section class="apm-card">
          <div class="apm-card-label">
            Top reason
          </div>
          <p class="apm-reason">
            {{ account.reason }}
          </p>
        </section>

        <section class="apm-card">
          <div class="apm-card-label">
            Blockers
          </div>
          <ul class="apm-blockers">
            <li
              v-for="blocker in account.blockers"
              :key="blocker.head"
              class="apm-blocker"
            >
              <span class="apm-blocker-name">{{ blocker.head }}</span>
              <span
                class="apm-chip"
                :class="blocker.sev === 'High' ? 'apm-chip--risk' : 'apm-chip--warn'"
              >{{ blocker.sev }}</span>
            </li>
          </ul>
        </section>

        <div class="apm-cta">
          <UIcon
            name="i-lucide-zap"
            class="size-3.5"
          />
          {{ account.action }}
        </div>
      </div>
    </div>

    <img
      class="apm-frame"
      src="/mockups/iphone-frame.png"
      alt=""
      width="1570"
      height="2932"
      draggable="false"
    >
  </div>
</template>

<style scoped>
.apm {
  position: relative;
  width: 100%;
  aspect-ratio: 1570 / 2932;
  filter: drop-shadow(0 24px 48px rgba(109, 40, 217, 0.28))
    drop-shadow(0 18px 36px rgba(0, 0, 0, 0.5));
}

.apm-frame {
  position: relative;
  z-index: 2;
  display: block;
  width: 100%;
  height: auto;
  pointer-events: none;
  user-select: none;
  filter:
    hue-rotate(48deg)
    saturate(1.15)
    brightness(0.96);
}

.apm-screen {
  position: absolute;
  z-index: 1;
  top: 5.35%;
  bottom: 5.05%;
  left: 9.2%;
  right: 9.25%;
  overflow: hidden;
  border-radius: 11% / 5.5%;
  background:
    radial-gradient(120% 70% at 50% 0%, rgba(139, 92, 246, 0.22) 0%, transparent 55%),
    #080612;
}

.apm-screen-inner {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  padding: 14% 11% 12%;
  color: #ececee;
}

.apm-brand {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 14px;
  flex-shrink: 0;
}

.apm-brand-icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
  mix-blend-mode: screen;
}

.apm-brand-name {
  font-size: 11px;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.01em;
  line-height: 1;
}

.apm-brand-avatar {
  margin-left: auto;
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  border-radius: 999px;
  font-size: 7px;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  background: linear-gradient(135deg, #6d28d9, #8b5cf6);
  border: 1px solid rgba(196, 181, 253, 0.35);
}

.apm-account {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
  flex-shrink: 0;
}

.apm-account-logo {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid rgba(196, 181, 253, 0.22);
  object-fit: cover;
}

.apm-account-meta {
  min-width: 0;
  flex: 1;
}

.apm-account-name {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.15;
  color: #fff;
}

.apm-account-tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px;
  margin-top: 5px;
}

.apm-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 3px 7px;
  border-radius: 999px;
  border: 1px solid transparent;
  font-size: 8px;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
}

.apm-chip--risk {
  color: #fecdd3;
  background: rgba(251, 113, 133, 0.18);
  border-color: rgba(251, 113, 133, 0.4);
}

.apm-chip--warn {
  color: #fde68a;
  background: rgba(251, 191, 36, 0.16);
  border-color: rgba(251, 191, 36, 0.38);
}

.apm-stage {
  display: inline-flex;
  align-items: center;
  padding: 3px 7px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  font-size: 8px;
  line-height: 1;
  color: rgba(255, 255, 255, 0.78);
}

.apm-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 7px;
  margin-bottom: 12px;
  flex-shrink: 0;
}

.apm-stat {
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 58px;
  padding: 9px 8px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.035);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.06),
    0 0 0 1px rgba(0, 0, 0, 0.18);
}

.apm-stat-label {
  display: block;
  font-size: 7px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
  line-height: 1;
}

.apm-stat-value {
  display: block;
  margin-top: auto;
  padding-top: 8px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1;
  color: #fff;
}

.apm-stat-value--risk {
  color: #fda4af;
}

.apm-stat-value--score {
  font-size: 12px;
  white-space: nowrap;
}

.apm-health-bar {
  margin-top: 8px;
  height: 3px;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
}

.apm-health-fill {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #9f3d5c, #d4728f);
}

.apm-score-from {
  color: rgba(255, 255, 255, 0.4);
}

.apm-score-arrow {
  margin: 0 1px;
  color: rgba(255, 255, 255, 0.3);
  font-weight: 500;
}

.apm-score-to {
  color: #fda4af;
}

.apm-card {
  margin-bottom: 10px;
  padding: 11px 12px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.035);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.06),
    0 0 0 1px rgba(0, 0, 0, 0.18);
  flex-shrink: 0;
}

.apm-card-label {
  margin-bottom: 7px;
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  line-height: 1;
  color: rgba(255, 255, 255, 0.5);
}

.apm-reason {
  margin: 0;
  font-size: 11px;
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.85);
}

.apm-blockers {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.apm-blocker {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  min-height: 18px;
}

.apm-blocker-name {
  min-width: 0;
  font-size: 11px;
  font-weight: 500;
  line-height: 1.2;
  color: rgba(255, 255, 255, 0.9);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.apm-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: auto;
  flex-shrink: 0;
  min-height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid rgba(196, 181, 253, 0.28);
  background: linear-gradient(135deg, rgba(109, 40, 217, 0.55), rgba(139, 92, 246, 0.45));
  box-shadow:
    0 0 14px rgba(139, 92, 246, 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 0.14);
  color: #ddd6fe;
  font-size: 11px;
  font-weight: 600;
  line-height: 1;
}
</style>
