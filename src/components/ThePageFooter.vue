<template>
  <footer>
    <h3>{{ appName }}</h3>
    <p>
      <slot></slot>
    </p>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ThePageHeader",

  data(): unknown {
    return {
      appName: process.env.VUE_APP_NAME,
    };
  },
});
</script>

<style lang="scss">
@import "../assets/styles/globals";
footer {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  color: $heading-text-color;
  padding: 0.5rem 1rem;

  & *:first-child {
    margin-right: auto;
  }

  p {
    margin: 0;
    font-size: small;

    a {
      text-decoration: none;
      color: inherit;

      &:hover {
        text-decoration: underline;
        text-underline-offset: 2px;
      }
    }
  }
}
</style>
