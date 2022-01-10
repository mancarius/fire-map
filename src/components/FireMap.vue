<template>
  <div class="map-container">
    <l-map :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker
        :lat-lng="markerLatLng"
        v-for="markerLatLng in markersCoords"
        :key="markerLatLng"
      ></l-marker>
    </l-map>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

export default defineComponent({
  name: "FireMap",
  components: { LMap, LTileLayer, LMarker },
  props: {
    markersCoords: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      center: [47.31322, -1.319482],
      zoom: 1.5,
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
