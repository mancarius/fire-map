<template>
  <footer>
    <h3>{{ appName }}</h3>
    <slot></slot>
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

<style scoped lang="scss">
@import "../assets/styles/globals";
footer {
  display: flex;
  flex-wrap: nowrap;
  color: $heading-text-color;
  padding: 0.5rem;

  &*:first-child {
    margin-left: 0;
    margin-right: auto;
  }
}
</style>
