<script setup lang="ts">
  import ContentSheet from '~/components/sheets/ContentSheet.vue'
</script>

<template>
  <content-sheet>
    <div :class="$style.grid">
      <div>
        <h2>Get Zeepkist GTR</h2>
        <p>Automatic record uploading for Zeepkist</p>
        <div :class="$style.links">
          <a-link
            :hoverable="false"
            :class="$style.button"
            href="https://discord.com/channels/972933002516647986/1087706648069541988">
            Open Instructions on Discord
          </a-link>
          <a-link :hoverable="false" href="https://discord.gg/vG3mhxFTBa"
            >Join the Modding Discord</a-link
          >
        </div>
      </div>
      <div>
        <h2>Join the Official Discord Server</h2>
        <p>Level contests, in-game tournaments and more!</p>
        <div :class="$style.links">
          <a-link
            :hoverable="false"
            :class="[$style.button, $style.buttonOutline]"
            href="https://discord.gg/zeepkist">
            Join the Zeepkist Discord
          </a-link>
        </div>
      </div>
    </div>
  </content-sheet>
</template>

<style module lang="less">
  @import '@arco-design/web-vue/es/style/theme/global.less';

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    text-align: center;

    @media screen and (max-width: 900px) {
      grid-template-columns: 1fr;
    }

    h2 {
      margin: 2rem 0 0;
    }

    .links a {
      display: block;
      width: 50%;
      border: 1px solid transparent;

      &:hover {
        color: var(--color-text-1);
      }

      &:first-child:hover {
        border: 1px solid rgb(var(--primary-6));
      }

      &:nth-child(2) {
        margin: 0.5rem auto 1rem;
        font-size: 0.75rem;
      }
    }

    .button {
      display: block;
      min-width: 50%;
      margin: 2rem auto 0;
      color: rgb(var(--color-text-1));
      background: rgb(var(--primary-4));
      border-radius: var(--border-radius-large);
      padding: 0.5rem 0 0.675rem;

      &.buttonOutline {
        background: none;
        border: 1px solid rgb(var(--primary-6));

        &:hover {
          background: rgb(var(--primary-4));
          border: 1px solid rgb(var(--primary-4));
        }
      }
    }
  }
</style>
