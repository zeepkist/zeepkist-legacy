<script setup lang="ts">
  import {
    defineOrganization,
    defineWebSite,
    useSchemaOrg
  } from '@vueuse/schema-org'
  import { ref } from 'vue'
  import { RouterView } from 'vue-router'

  import zeepkistIconUrl from '~/assets/zeepkist-icon.webp?url'
  import FooterNavigation from '~/components/navigation/FooterNavigation.vue'
  import HeaderNavigation from '~/components/navigation/HeaderNavigation.vue'

  const isMobile = ref(window.innerWidth < 900)

  const handleResize = () => {
    isMobile.value = window.innerWidth < 900
  }

  window.addEventListener('resize', handleResize)

  const title = 'Zeepkist Records'

  useSchemaOrg([
    defineOrganization({
      name: title,
      logo: zeepkistIconUrl,
      sameAs: ['https://github.com/zeepkist']
    }),
    defineWebSite({
      name: title,
      url: 'https://zeepki.st',
      description: `The ultimate platform for Zeepkist racing fans!

Track records, view player stats, create/join tournaments and view Super League event results!`,
      logo: zeepkistIconUrl,
      sameAs: ['']
    })
  ])
</script>

<template>
  <header-navigation :is-mobile="isMobile" />
  <main :class="$style.content">
    <suspense>
      <router-view />
    </suspense>
  </main>
  <footer-navigation />
</template>

<style module lang="less">
  .content {
    max-width: 1300px;
    width: calc(100% - 2rem);
    margin: 90px auto 0;
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>

<style lang="less">
  :root {
    // TODO: border-radius and color-border
    --zk-font-size-body-1: 0.75rem;
    --zk-font-size-body-2: 0.875rem;
    --zk-font-size-title-1: 2.5rem;
    --zk-font-size-title-2: 1.75rem;
    --zk-font-size-title-3: 1.5rem;
    --zk-font-size-title-4: 1.25rem;
    --zk-font-size-title-5: var(--font-size-title-4);
    --zk-font-size-title-6: 1rem;

    --zk-light-primary-4: #ffac2e;
    --zk-light-primary-5: #ff9200;
    --zk-light-primary-6: #d27000;

    --zk-light-secondary-4: #fcf26b;
    --zk-light-secondary-5: #fbe842;
    --zk-light-secondary-6: #fadc19;

    --zk-light-neutral-4: #c9cdd4;
    --zk-light-neutral-5: #a9aeb8;
    --zk-light-neutral-6: #86909c;

    --zk-text-1: #181818;

    --zk-background-1: #fff7ec;
    --zk-background-2: #fff;

    --zk-primary-4: var(--light-primary-4);
    --zk-primary-5: var(--light-primary-5);
    --zk-primary-6: var(--light-primary-6);

    --zk-secondary-4: var(--light-secondary-4);
    --zk-secondary-5: var(--light-secondary-5);
    --zk-secondary-6: var(--light-secondary-6);

    --zk-neutral-4: var(--light-neutral-4);
    --zk-neutral-5: var(--light-neutral-5);
    --zk-neutral-6: var(--light-neutral-6);

    // change root css variables when dark mode is enabled
    @media screen and (prefers-color-scheme: dark) {
      --zk-text-1: #fefefe;

      --zk-background-1: #222;
      --zk-background-2: #181818;

      --zk-primary-4: var(--zk-light-primary-6);
      --zk-primary-5: var(--zk-light-primary-5);
      --zk-primary-6: var(--zk-light-primary-4);

      --zk-secondary-4: var(--zk-light-secondary-6);
      --zk-secondary-5: var(--zk-light-secondary-5);
      --zk-secondary-6: var(--zk-light-secondary-4);

      --zk-neutral-4: var(--zk-light-neutral-6);
      --zk-neutral-5: var(--zk-light-neutral-5);
      --zk-neutral-6: var(--zk-light-neutral-4);
    }
  }
</style>

<style lang="less">
  body {
    overflow-x: clip;
    color: var(--zk-text-1);
    background: var(--zk-background-1);
    min-height: 100vh;
    transition: color 0.5s, background-color 0.5s;
    font-family: 'Shin Go Pr5', Inter, -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1 {
    font-size: var(--zk-font-size-title-1);
    font-weight: 800;
    margin-top: 0;
  }

  h2 {
    font-size: var(--zk-font-size-title-2);
    font-weight: 700;
  }

  h3 {
    font-size: var(--zk-font-size-title-3);
    font-weight: 600;
  }

  h4 {
    font-size: var(--zk-font-size-title-4);
  }

  h5 {
    font-size: var(--zk-font-size-title-5);
  }

  h6 {
    font-size: var(--zk-font-size-title-6);
  }

  svg.inline-svg {
    height: 2ch;
    width: 2ch;
    margin-bottom: -1px;
  }

  a,
  a:visited {
    text-decoration: none;
    color: var(--zk-primary-5);
  }

  @font-face {
    font-family: 'Shin Go Pr5';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url('/fonts/subsets/B-latin.woff2') format('woff2');
    unicode-range: U+0000-00FF;
  }

  @font-face {
    font-family: 'Shin Go Pr5';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url('/fonts/subsets/B-latin-ext.woff2') format('woff2');
    unicode-range: U+0100-017F, U+0180-024F, U+1E00-1EFF;
  }

  @font-face {
    font-family: 'Shin Go Pr5';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url('/fonts/subsets/B-rest.woff2') format('woff2');
    unicode-range: U+0250-1DFF, U+1F00-2C5F, U+D800-F8FF, U+FB00-FE2F;
  }

  @font-face {
    font-family: 'Shin Go Pr5';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url('/fonts/subsets/B-cjk-a.woff2') format('woff2');
    unicode-range: U+2E80-33FF, U+3400-4DFF, U+4E00-5FFF, U+F900-FAFF,
      U+FF00-FFEF, U+20000-2FA1F;
  }

  @font-face {
    font-family: 'Shin Go Pr5';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url('/fonts/subsets/B-cjk-b.woff2') format('woff2');
    unicode-range: U+6000-7FFF;
  }

  @font-face {
    font-family: 'Shin Go Pr5';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url('/fonts/subsets/B-cjk-c.woff2') format('woff2');
    unicode-range: U+8000-9FFF;
  }

  @font-face {
    font-family: 'Shin Go Pr5';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url('/fonts/subsets/DB-latin.woff2') format('woff2');
    unicode-range: U+0000-00FF;
  }

  @font-face {
    font-family: 'Shin Go Pr5';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url('/fonts/subsets/DB-latin-ext.woff2') format('woff2');
    unicode-range: U+0100-017F, U+0180-024F, U+1E00-1EFF;
  }

  @font-face {
    font-family: 'Shin Go Pr5';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url('/fonts/subsets/DB-rest.woff2') format('woff2');
    unicode-range: U+0250-1DFF, U+1F00-2C5F, U+D800-F8FF, U+FB00-FE2F;
  }

  @font-face {
    font-family: 'Shin Go Pr5';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url('/fonts/subsets/DB-cjk-a.woff2') format('woff2');
    unicode-range: U+2E80-33FF, U+3400-4DFF, U+4E00-5FFF, U+F900-FAFF,
      U+FF00-FFEF, U+20000-2FA1F;
  }

  @font-face {
    font-family: 'Shin Go Pr5';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url('/fonts/subsets/DB-cjk-b.woff2') format('woff2');
    unicode-range: U+6000-7FFF;
  }

  @font-face {
    font-family: 'Shin Go Pr5';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url('/fonts/subsets/DB-cjk-c.woff2') format('woff2');
    unicode-range: U+8000-9FFF;
  }

  @font-face {
    font-family: 'Shin Go Pr5';
    font-style: normal;
    font-weight: 800;
    font-display: swap;
    src: url('/fonts/subsets/H-latin.woff2') format('woff2');
    unicode-range: U+0000-00FF;
  }

  @font-face {
    font-family: 'Shin Go Pr5';
    font-style: normal;
    font-weight: 800;
    font-display: swap;
    src: url('/fonts/subsets/H-latin-ext.woff2') format('woff2');
    unicode-range: U+0100-017F, U+0180-024F, U+1E00-1EFF;
  }

  @font-face {
    font-family: 'Shin Go Pr5';
    font-style: normal;
    font-weight: 800;
    font-display: swap;
    src: url('/fonts/subsets/H-rest.woff2') format('woff2');
    unicode-range: U+0250-1DFF, U+1F00-2C5F, U+D800-F8FF, U+FB00-FE2F;
  }

  @font-face {
    font-family: 'Shin Go Pr5';
    font-style: normal;
    font-weight: 800;
    font-display: swap;
    src: url('/fonts/subsets/H-cjk-a.woff2') format('woff2');
    unicode-range: U+2E80-33FF, U+3400-4DFF, U+4E00-5FFF, U+F900-FAFF,
      U+FF00-FFEF, U+20000-2FA1F;
  }

  @font-face {
    font-family: 'Shin Go Pr5';
    font-style: normal;
    font-weight: 800;
    font-display: swap;
    src: url('/fonts/subsets/H-cjk-b.woff2') format('woff2');
    unicode-range: U+6000-7FFF;
  }

  @font-face {
    font-family: 'Shin Go Pr5';
    font-style: normal;
    font-weight: 800;
    font-display: swap;
    src: url('/fonts/subsets/H-cjk-c.woff2') format('woff2');
    unicode-range: U+8000-9FFF;
  }

  @font-face {
    font-family: 'Shin Go Pr5';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: url('/fonts/subsets/L-latin.woff2') format('woff2');
    unicode-range: U+0000-00FF;
  }

  @font-face {
    font-family: 'Shin Go Pr5';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: url('/fonts/subsets/L-latin-ext.woff2') format('woff2');
    unicode-range: U+0100-017F, U+0180-024F, U+1E00-1EFF;
  }

  @font-face {
    font-family: 'Shin Go Pr5';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: url('/fonts/subsets/L-rest.woff2') format('woff2');
    unicode-range: U+0250-1DFF, U+1F00-2C5F, U+D800-F8FF, U+FB00-FE2F;
  }

  @font-face {
    font-family: 'Shin Go Pr5';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: url('/fonts/subsets/L-cjk-a.woff2') format('woff2');
    unicode-range: U+2E80-33FF, U+3400-4DFF, U+4E00-5FFF, U+F900-FAFF,
      U+FF00-FFEF, U+20000-2FA1F;
  }

  @font-face {
    font-family: 'Shin Go Pr5';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: url('/fonts/subsets/L-cjk-b.woff2') format('woff2');
    unicode-range: U+6000-7FFF;
  }

  @font-face {
    font-family: 'Shin Go Pr5';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: url('/fonts/subsets/L-cjk-c.woff2') format('woff2');
    unicode-range: U+8000-9FFF;
  }

  @font-face {
    font-family: 'Shin Go Pr5';
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url('/fonts/subsets/M-latin.woff2') format('woff2');
    unicode-range: U+0000-00FF;
  }

  @font-face {
    font-family: 'Shin Go Pr5';
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url('/fonts/subsets/M-latin-ext.woff2') format('woff2');
    unicode-range: U+0100-017F, U+0180-024F, U+1E00-1EFF;
  }

  @font-face {
    font-family: 'Shin Go Pr5';
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url('/fonts/subsets/M-rest.woff2') format('woff2');
    unicode-range: U+0250-1DFF, U+1F00-2C5F, U+D800-F8FF, U+FB00-FE2F;
  }

  @font-face {
    font-family: 'Shin Go Pr5';
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url('/fonts/subsets/M-cjk-a.woff2') format('woff2');
    unicode-range: U+2E80-33FF, U+3400-4DFF, U+4E00-5FFF, U+F900-FAFF,
      U+FF00-FFEF, U+20000-2FA1F;
  }

  @font-face {
    font-family: 'Shin Go Pr5';
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url('/fonts/subsets/M-cjk-b.woff2') format('woff2');
    unicode-range: U+6000-7FFF;
  }

  @font-face {
    font-family: 'Shin Go Pr5';
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url('/fonts/subsets/M-cjk-c.woff2') format('woff2');
    unicode-range: U+8000-9FFF;
  }

  @font-face {
    font-family: 'Shin Go Pr5';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('/fonts/subsets/R-latin.woff2') format('woff2');
    unicode-range: U+0000-00FF;
  }

  @font-face {
    font-family: 'Shin Go Pr5';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('/fonts/subsets/R-latin-ext.woff2') format('woff2');
    unicode-range: U+0100-017F, U+0180-024F, U+1E00-1EFF;
  }

  @font-face {
    font-family: 'Shin Go Pr5';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('/fonts/subsets/R-rest.woff2') format('woff2');
    unicode-range: U+0250-1DFF, U+1F00-2C5F, U+D800-F8FF, U+FB00-FE2F;
  }

  @font-face {
    font-family: 'Shin Go Pr5';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('/fonts/subsets/R-cjk-a.woff2') format('woff2');
    unicode-range: U+2E80-33FF, U+3400-4DFF, U+4E00-5FFF, U+F900-FAFF,
      U+FF00-FFEF, U+20000-2FA1F;
  }

  @font-face {
    font-family: 'Shin Go Pr5';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('/fonts/subsets/R-cjk-b.woff2') format('woff2');
    unicode-range: U+6000-7FFF;
  }

  @font-face {
    font-family: 'Shin Go Pr5';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('/fonts/subsets/R-cjk-c.woff2') format('woff2');
    unicode-range: U+8000-9FFF;
  }
</style>
