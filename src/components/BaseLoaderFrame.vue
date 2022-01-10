<template>
  <div class="loader-container">
    <base-spinner />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseSpinner from "./BaseSpinner.vue";

export default defineComponent({
  components: { BaseSpinner },
  name: "BaseLoaderFrame",
});
</script>

<style lang="scss" scoped>
.loader-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000000db;
}
</style>
