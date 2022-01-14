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
    minDate: {
      type: Date,
      default: null,
    },
    maxDate: {
      type: Date,
      default: null,
    },
    startDate: {
      type: Date,
      default: new Date(),
    },
  },

  emits: ["dateChange"],

  setup(props, { emit }) {
    const date = ref<[Date, Date]>([
      props.startDate,
      props.maxDate || new Date(),
    ]);

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
        emit("dateChange", [start, end]);
      }
    });

    return {
      date,
      format,
    };
  },
});
</script>

<style lang="scss" scoped></style>
