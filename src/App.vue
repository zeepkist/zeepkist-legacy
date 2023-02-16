<script setup lang="ts">
  import { RouterView } from 'vue-router'

  import FooterNavigation from '@/components/FooterNavigation.vue'
  import HeaderNavigation from '@/components/HeaderNavigation.vue'
</script>

<template>
  <header-navigation />
  <section class="app-content">
    <suspense>
      <router-view />
    </suspense>
  </section>
  <footer-navigation />
</template>

<style lang="less">
  :root {
    --zeepkist-papaya: #ffefd9;
    --zeepkist-yellow: #ffc531;
    --zeepkist-orange: #ff9200;
    --zeepkist-orange-2: hsl(34, 100%, 50%, 0.2);

    --white: #ffffff;
    --white-soft: #f8f8f8;
    --white-mute: #f2f2f2;

    --black: #181818;
    --black-soft: #222222;
    --black-mute: #282828;

    --indigo: #2c3e50;

    --divider-light-1: rgba(60, 60, 60, 0.29);
    --divider-light-2: rgba(60, 60, 60, 0.12);
    --divider-dark-1: rgba(84, 84, 84, 0.65);
    --divider-dark-2: rgba(84, 84, 84, 0.48);

    --text-light-1: var(--indigo);
    --text-light-2: rgba(60, 60, 60, 0.66);
    --text-dark-1: var(--white);
    --text-dark-2: rgba(235, 235, 235, 0.64);
  }

  /* semantic color variables for this project */
  :root {
    --color-background: var(--zeepkist-papaya);
    --color-background-mute: var(--white-mute);
    --color-background-page: var(--zeepkist-yellow);

    --color-navigation: var(--white);

    --color-border: var(--zeepkist-orange);
    --color-border-hover: var(--zeepkist-yellow);

    --color-heading: var(--black-soft);
    --color-text: var(--black);
    --color-text-inverted: var(--white);

    --color-disabled: var(--dark-mute);

    --color-link: var(--zeepkist-orange);
    --color-hover: var(--zeepkist-orange-2);

    --color-button-active: var(--zeepkist-orange);
    --color-button-hover: var(--zeepkist-yellow);

    --section-gap: 160px;
    --border-radius: 0.25rem;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --color-background: var(--black);
      --color-background-mute: var(--black-mute);
      --color-background-page: var(--black-mute);

      --color-navigation: var(--black);

      --color-heading: var(--white-soft);
      --color-text: var(--white);
      --color-text-inverted: var(--black);

      --color-disabled: var(--white-mute);
    }
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

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    position: relative;
    font-weight: normal;
  }

  body {
    min-height: 100vh;
    color: var(--color-text);
    background: var(--color-background-page);
    transition: color 0.5s, background-color 0.5s;
    line-height: 1.6;
    font-family: 'Shin Go Pr5', Inter, -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif;
    font-size: 14px;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #app {
    width: 100%;
    margin: 0 auto;
    font-weight: 400;
  }

  a {
    text-decoration: none;
    color: var(--color-link);
    transition: 0.4s;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--color-heading);
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 800;
  }

  h2 {
    font-size: 1.75rem;
    font-weight: 700;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  svg.inline-svg {
    height: 2ch;
    width: 2ch;
    margin-bottom: -1px;
  }

  .app-content {
    max-width: 1280px;
    margin: 1.5rem auto 3rem;
    padding: 1.5rem;
    background: var(--color-background);
    border-radius: var(--border-radius);

    grid-area: 1 / 2 / 2 / 3;
  }

  @media (hover: hover) {
    a:hover {
      color: var(--color-text);
    }
  }

  /*@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }
}*/
</style>
