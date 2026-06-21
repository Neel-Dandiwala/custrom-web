<script setup>
const CALENDLY_URL = 'https://calendly.com/neeldandiwala/30min'

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;450;500;600;700&display=swap' }
  ],
  htmlAttrs: {
    lang: 'en',
    class: 'dark'
  }
})

const title = 'Custrom — Don\'t lose the leads you already have'
const description = 'Custrom helps B2B teams spot which prospects are worth pursuing and which customers are about to leave — before it\'s too late. Built on the CRM and activity data you already have.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterCard: 'summary_large_image'
})

const nav = [
  { label: 'How it works', to: '#how-it-works' },
  { label: 'Pre-sale', to: '#pre-sale' },
  { label: 'Post-sale', to: '#post-sale' },
  { label: 'Backed by', to: '#backed-by' }
]
</script>

<template>
  <UApp>
    <div class="page-haze min-h-svh text-white antialiased">
      <header class="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <NuxtLink to="/" class="flex items-center gap-2.5">
            <span class="flex h-7 w-7 items-center justify-center rounded-[9px] bg-gradient-to-br from-[#2DD4BF] to-[#6366F1] text-sm font-bold text-white">C</span>
            <span class="text-lg font-bold tracking-[-0.04em] text-white">Custrom</span>
          </NuxtLink>

          <nav class="hidden items-center gap-8 md:flex">
            <a
              v-for="item in nav"
              :key="item.to"
              :href="item.to"
              class="text-sm font-medium text-white/56 transition-colors hover:text-white"
            >{{ item.label }}</a>
          </nav>

          <a
            :href="CALENDLY_URL"
            target="_blank"
            rel="noopener noreferrer"
            class="button-primary hidden items-center justify-center rounded-[12px] px-4 py-2.5 text-sm font-semibold sm:inline-flex"
          >
            Book a 15-min call
          </a>
        </div>
      </header>

      <main>
        <NuxtPage />
      </main>

      <footer class="border-t border-white/10">
        <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div class="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div class="flex items-center gap-2.5">
              <span class="flex h-7 w-7 items-center justify-center rounded-[9px] bg-gradient-to-br from-[#2DD4BF] to-[#6366F1] text-sm font-bold text-white">C</span>
              <span class="text-base font-bold tracking-[-0.04em] text-white">Custrom</span>
            </div>
            <p class="max-w-md text-sm leading-relaxed text-white/55">
              Early stage. Looking for teams to build this with. No pitch, just a real conversation.
            </p>
          </div>
          <div class="section-divider my-7" />
          <div class="flex flex-col items-start justify-between gap-3 text-sm text-white/45 sm:flex-row sm:items-center">
            <p>© {{ new Date().getFullYear() }} Custrom · custrom.com</p>
            <a
              :href="CALENDLY_URL"
              target="_blank"
              rel="noopener noreferrer"
              class="font-medium text-white/60 transition-colors hover:text-white"
            >calendly.com/neeldandiwala/30min</a>
          </div>
        </div>
      </footer>
    </div>
  </UApp>
</template>
