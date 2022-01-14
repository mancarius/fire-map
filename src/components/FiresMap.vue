<template>
  <div class="map-container">
    <l-map :zoom="zoom" :center="center" @ready="isMapReady = true">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-control-scale
        position="bottomleft"
        :imperial="false"
        :metric="true"
      ></l-control-scale>
      <l-control position="topright">
        <datepicker-range
          @dateChange="setDateRange($event)"
          :minDate="minDate"
          :maxDate="maxDate"
          :startDate="startDate"
        />
      </l-control>
      <l-circle
        :lat-lng="coords"
        :radius="circle.radius"
        :color="circle.color"
        :fillColor="circle.fillColor"
        :fillOpacity="circle.fillOpacity"
        v-for="coords in markersCoords"
        :key="coords"
      ></l-circle>
    </l-map>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref, watch } from "vue";
import {
  LMap,
  LTileLayer,
  LCircle,
  LControlScale,
  LControl,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import DatepickerRange from "./DatepickerRange.vue";
import FiresApiService from "@/services/FiresApiService";
import { useStore } from "vuex";

export default defineComponent({
  name: "FiresMap",
  components: {
    LMap,
    LTileLayer,
    LCircle,
    LControlScale,
    LControl,
    DatepickerRange,
  },

  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      center: [47.31322, -1.319482],
      zoom: 1.5,
      circle: {
        radius: 1500,
        color: "red",
        fillColor: "red",
        fillOpacity: 1,
      },
    };
  },

  setup() {
    const markersCoords: Ref<[number, number][]> = ref([]);
    const api = process.env.VUE_APP_API_URL;
    const apiService = new FiresApiService(api);
    const store = useStore();
    const isMapReady = ref(false);
    const isDataReady = ref(false);
    const minDate = process.env.VUE_APP_DATEPICKER_MIN_DATE
      ? new Date(process.env.VUE_APP_DATEPICKER_MIN_DATE)
      : null;
    const maxDate = process.env.VUE_APP_DATEPICKER_MAX_DATE
      ? new Date(process.env.VUE_APP_DATEPICKER_MAX_DATE)
      : null;
    const startDate: Date | null =
      maxDate instanceof Date ? new Date(maxDate.getTime()) : new Date();
    startDate instanceof Date && startDate.setDate(startDate.getDate() - 7);

    const loadCoordsByService =
      (service: FiresApiService) => (dateRange?: [Date, Date] | null) => {
        if (dateRange) {
          markersCoords.value = service
            .filterByDateRange(...dateRange)
            .map(({ latitude, longitude }) => [latitude, longitude]);
        } else {
          markersCoords.value = service.data.map(({ latitude, longitude }) => [
            latitude,
            longitude,
          ]);
        }
      };

    const checkCoordsLength = (coords: [number, number][]) => {
      if (coords.length === 0) {
        store.dispatch("showInfo", "No fires found in this period");
      }
    };

    const setDateRange = loadCoordsByService(apiService);

    watch(markersCoords, checkCoordsLength);

    watch([isMapReady, isDataReady], ([mapReady, dataReady]) => {
      if (mapReady && dataReady) {
        store.dispatch("loadingStop");
      } else {
        store.dispatch("loadingStart");
      }
    });

    onMounted(async () => {
      try {
        await apiService.load();
        loadCoordsByService(apiService)();
      } catch (error) {
        console.warn(error);
        store.dispatch("showError", "Impossible to load fires data");
      }

      isDataReady.value = true;
    });

    store.dispatch("loadingStop");

    return {
      markersCoords,
      apiService,
      store,
      isMapReady,
      minDate,
      maxDate,
      startDate,

      setDateRange,
    };
  },
});
</script>

<style lang="scss" scoped>
.map-container {
  height: 100%;

  & > * {
    height: 100%;
  }
}
</style>
