<template>
  <the-page-header>
    <datepicker-range v-model:selectedRange="date" />
  </the-page-header>
  <main class="main-container">
    <fire-map :markersCoords="markersCoords" />
    <base-loader-frame v-if="loading" />
  </main>
  <the-page-footer />
</template>

<script lang="ts">
import { defineComponent, Ref, ref, watch } from "vue";
import BaseLoaderFrame from "./components/BaseLoaderFrame.vue";
import DatepickerRange from "./components/DatepickerRange.vue";
import FireMap from "./components/FireMap.vue";
import ThePageFooter from "./components/ThePageFooter.vue";
import ThePageHeader from "./components/ThePageHeader.vue";
import FiresApiService from "./services/FiresApiService";

export default defineComponent({
  components: {
    ThePageHeader,
    ThePageFooter,
    FireMap,
    DatepickerRange,
    BaseLoaderFrame,
  },
  setup() {
    const date: Ref<[Date, Date] | null> = ref(null);
    const markersCoords: Ref<[number, number][]> = ref([]);
    const api = process.env.VUE_APP_API_URL;
    const apiService = new FiresApiService(api);

    watch(date, (next) => {
      if (next) {
        markersCoords.value = apiService
          .filterByDateRange(...next)
          .map(({ latitude, longitude }) => [latitude, longitude]);
      }
    });

    return {
      date,
      markersCoords,
      loading: ref(true),
      apiService,
    };
  },

  mounted() {
    this.apiService
      .load()
      .then(() => {
        this.markersCoords = this.apiService.data.map(
          ({ latitude, longitude }) => [latitude, longitude]
        );
      })
      .catch((error) => {
        console.warn(error);
        this.openToast("Impossible to load fires data", "error");
      })
      .finally(() => {
        this.loading = false;
      });
  },

  methods: {
    openToast(message: string, type = "info") {
      this.$toast.open({
        message,
        type,
        position: "top",
      });
    },
  },

  watch: {
    markersCoords(next) {
      if (next.length === 0) {
        this.openToast("No fires found in this periods");
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
