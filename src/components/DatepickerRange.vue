<template>
  <Datepicker
    v-model="date"
    :startDate="startDate"
    :minDate="minDate"
    :maxDate="maxDate"
    :format="format"
    range
  ></Datepicker>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "DatepickerRange",

  props: {
    selectedRange: Array,
  },

  emits: ["update:selectedRange"],

  setup(props, { emit }) {
    const minDate = process.env.VUE_APP_DATEPICKER_MIN_DATE
      ? new Date(process.env.VUE_APP_DATEPICKER_MIN_DATE)
      : null;
    const maxDate = process.env.VUE_APP_DATEPICKER_MAX_DATE
      ? new Date(process.env.VUE_APP_DATEPICKER_MAX_DATE)
      : null;
    const startDate: Date | null =
      maxDate instanceof Date ? new Date(maxDate.getTime()) : new Date();
    startDate instanceof Date && startDate.setDate(startDate.getDate() - 7);
    const date = ref<[Date, Date]>([startDate, maxDate || new Date()]);

    const dateToReverseArray = (_date: Date): number[] => {
      if (_date) {
        return [
          _date.getDate(),
          _date.getMonth() + 1,
          _date.getFullYear(),
        ].reverse();
      } else {
        return [];
      }
    };

    const format = ([start, end]: Date[]) => {
      const startDate = dateToReverseArray(start);
      const endDate = end ? dateToReverseArray(end) : startDate;

      return `${startDate.join("/")} - ${endDate.join("/")}`;
    };

    watch(date, (next) => {
      if (next) {
        let [start, end] = next;
        if (!end) {
          end = new Date(start.valueOf());
        }
        emit("update:selectedRange", [start, end]);
      }
    });

    return {
      date,
      startDate,
      minDate,
      maxDate,
      format,
    };
  },
});
</script>

<style lang="scss" scoped></style>
