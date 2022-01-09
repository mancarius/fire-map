<template>
  <header>
    <h1>{{ appName }}</h1>
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

<style scoped lang="scss">
@import "../assets/styles/globals";
header {
  display: flex;
  flex-wrap: nowrap;
  padding: 0.5rem;
  color: $heading-text-color;

  &*:first-child {
    margin-left: 0;
    margin-right: auto;
  }
}
</style>
