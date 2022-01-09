<template>
  <the-page-header></the-page-header>
  <fire-map />
  <the-page-footer></the-page-footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FireMap from "./components/FireMap.vue";
import ThePageFooter from "./components/ThePageFooter.vue";
import ThePageHeader from "./components/ThePageHeader.vue";

export default defineComponent({
  components: { ThePageHeader, ThePageFooter, FireMap },
  setup() {
    //
  },
});
</script>

<style lang="scss">
#app {
  display: flex;
  flex-flow: column;
  height: 100%;
}
</style>
