<template>
  <the-page-header>
    <Datepicker v-model="date" range></Datepicker>
  </the-page-header>
  <fire-map :markersCoords="markersCoords" />
  <the-page-footer></the-page-footer>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import FireMap from "./components/FireMap.vue";
import ThePageFooter from "./components/ThePageFooter.vue";
import ThePageHeader from "./components/ThePageHeader.vue";
import fetchService from "./services/FetchService";

interface FireData {
  latitude: number;
  longitude: number;
  date: string;
}

export default defineComponent({
  components: { ThePageHeader, ThePageFooter, FireMap },
  setup() {
    const date = ref(null);
    const markersCoords = ref([]);
    const api = process.env.VUE_APP_API_URL;

//: Promise<FireData>

    onMounted(() => {
      fetchService(api).then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.warn(error);
      });
    });

    watch(date, (next) => {
      console.log({ next });
    });

    return {
      date,
      markersCoords,
    };
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
