<template>
  <div class="about">
    <div class="container">
      <h2>About</h2>
      <p>
        Every day somewhere in the world a fire takes place. It can be caused by
        various causes both natural and by man. Thus, for some years now, thanks
        to its satellites and to help local authorities, NASA has been
        monitoring the global situation, and in a fully automatic way identifies
        and reports fires on the entire planet.
      </p>

      <p>
        The application allows you to view the fires that occurred between 21
        and 28 August 2020 on the map. It is possible to select one or more days
        within this period.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch("loadingStop");
    });
  },
});
</script>

<style lang="scss" scoped>
.about {
  background-color: #fafafa;
  min-height: 100%;
  padding: 1rem;

  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 1px;
  }

  h2 {
    margin: 2rem 0 3rem;
  }
}
</style>
