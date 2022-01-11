<template>
  <the-page-header>
    <nav>
      <router-link :to="{ name: 'About' }">About</router-link>
    </nav>
  </the-page-header>
  <main class="main-container">
    <router-view></router-view>
    <base-loader-frame v-if="loading" />
  </main>
  <the-page-footer>
    2022 -
    <a
      href="https://www.mattiamancarella.com"
      title="Mattia Mancarella's web page"
    >
      Mattia Mancarella
    </a>
    -
    <a href="https://github.com/mancarius/fire-map" title="Git repository">
      Git repo
    </a>
  </the-page-footer>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import BaseLoaderFrame from "./components/BaseLoaderFrame.vue";
import ThePageFooter from "./components/ThePageFooter.vue";
import ThePageHeader from "./components/ThePageHeader.vue";

export default defineComponent({
  components: {
    ThePageHeader,
    ThePageFooter,
    BaseLoaderFrame,
  },
  setup() {
    const { state } = useStore();
    const loading = computed(() => state.loading);
    const toast = computed(() => state.toast);

    return {
      loading,
      toast,
    };
  },

  methods: {
    openToast(message: string, type: string) {
      this.$toast.open({
        message,
        type,
        position: "top",
      });
    },
  },

  watch: {
    toast(next) {
      if (next) {
        const { message, type = "info" }: { message: string; type: string } =
          next;
        this.openToast(message, type);
      }
    },
  },
});
</script>

<style lang="scss">
#app {
  display: flex;
  flex-flow: column;
  height: 100%;
}

.main-container {
  position: relative;
  flex: 2;
  overflow: hidden;
}
</style>
