<template>
  <header>
    <router-link :to="{ name: 'Home' }">
      <h1>{{ appName }}</h1>
    </router-link>
    <slot></slot>
  </header>
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
header {
  display: flex;
  flex-wrap: nowrap;
  padding: 0.5rem 1rem;
  color: $heading-text-color;
  align-items: center;

  & *:first-child {
    margin-right: auto;
  }

  a {
    text-decoration: none;
    color: #fafafa;

    &:hover {
      font-weight: bold;
    }
  }
}
</style>
