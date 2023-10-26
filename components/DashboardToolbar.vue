<template>
  <div class="toolbar d-flex flex-wrap">
    <v-checkbox
      v-for="chartType in localChartTypes"
      :key="chartType.value"
      v-model="localSelectedChartTypes"
      :label="chartType.label"
      :value="chartType.value"
      class="mr-3"
      hide-details
    />
    <v-switch
      v-model="localCombine"
      label="Combine selected"
      hide-details
      class="mr-3"
      :disabled="localSelectedChartTypes.length < 2 && !localCombine"
    />
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template #activator="{ on, attrs }">
        <v-combobox
          v-model="localDates"
          multiple
          chips
          small-chips
          label="Filter by dates"
          prepend-icon="mdi-calendar"
          readonly
          hide-details
          v-bind="attrs"
          v-on="on"
        ></v-combobox>
      </template>
      <v-date-picker
        v-model="localDates"
        multiple
        no-title
        scrollable
        :min="minDate"
        :max="maxDate"
      >
      </v-date-picker>
    </v-menu>
  </div>
</template>

<script>
  import { ref, toRefs, watch } from 'vue';
  import { getMinDate, getMaxDate } from '~/utils';

  export default {
    name: 'DashboardToolbar',
    props: {
      chartTypes: {
        type: Array,
        default: () => [],
      },
      selectedChartTypes: {
        type: Array,
        default: () => [],
      },
      combine: {
        type: Boolean,
        default: false,
      },
      dates: {
        type: Array,
        default: () => [],
      },
      dataDates: {
        type: Array,
        default: () => [],
      },
    },
    emits: ['update:combine', 'update:dates', 'update:selectedChartTypes'],
    setup(props, { emit }) {
      const { chartTypes, selectedChartTypes, combine, dates, dataDates } =
        toRefs(props);

      const localChartTypes = [...chartTypes.value];

      const localSelectedChartTypes = ref(selectedChartTypes.value);

      watch(localSelectedChartTypes, (payload) => {
        if (localCombine.value && localSelectedChartTypes.value.length < 2) {
          localCombine.value = false;
        }
        emit('update:selectedChartTypes', payload);
      });

      const localCombine = ref(combine.value);

      watch(localCombine, (payload) => {
        emit('update:combine', payload);
      });

      const menu = ref(false);

      const localDates = ref([...dates.value]);

      watch(localDates, (payload) => {
        emit('update:dates', payload);
      });

      const minDate = ref(getMinDate(dataDates));
      const maxDate = ref(getMaxDate(dataDates));

      return {
        menu,
        minDate,
        maxDate,
        localChartTypes,
        localDates,
        localCombine,
        localSelectedChartTypes,
      };
    },
  };
</script>
