<template>
  <v-card>
    <v-card-actions>
      <v-row>
        <v-col lg="4">
          <v-select
            v-model="chartType"
            :items="chartTypes"
            label="Chart Type"
            solo
            hide-details
            @change="updateChart"
          ></v-select>
        </v-col>
        <v-col lg="4">
          <v-select
            v-model="chartColor"
            :items="chartColors"
            label="Chart Color"
            solo
            hide-details
            @change="updateChart"
          ></v-select>
        </v-col>
      </v-row>
    </v-card-actions>
    <highcharts :options="chartOptions"></highcharts>
  </v-card>
</template>

<script>
  import { ref, toRefs, watch } from 'vue';
  import { Chart } from 'highcharts-vue';

  export default {
    name: 'HighChart',
    components: {
      highcharts: Chart,
    },
    props: {
      label: {
        type: String,
        default: '',
      },
      data: {
        type: Array,
        default: () => [],
      },
    },
    setup(props) {
      const { data } = toRefs(props);
      const localData = ref(data.value);
      const chartTypes = ref(['line', 'bar']);
      const chartColors = ref([
        'black',
        'red',
        'orange',
        'yellow',
        'green',
        'cyan',
        'blue',
        'purple',
      ]);
      const chartType = ref('line');
      const chartColor = ref('black');

      const createSeries = (data) => {
        return data.map((item) => ({
          name: item.seriesName,
          data: item.series,
          type: chartType.value,
          color: chartColor.value,
        }));
      };

      const chartOptions = ref({
        title: {
          text: props.label,
        },
        series: createSeries(localData.value),
        xAxis: {
          categories: localData.value[0].xAxis,
          labels: {
            style: {
              fontSize: '.6em',
            },
          },
        },
      });

      const updateChart = () => {
        chartOptions.value.series.forEach((item) => {
          item.type = chartType.value;
          item.color = chartColor.value;
        });
      };

      watch(
        () => data.value,
        (newData) => {
          localData.value = newData;
        },
        { deep: true }
      );

      watch(
        () => localData.value,
        (newData) => {
          chartOptions.value.series = createSeries(newData);
          chartOptions.value.xAxis.categories = newData[0].xAxis;
        },
        { deep: true }
      );

      return {
        chartOptions,
        chartType,
        chartTypes,
        chartColor,
        chartColors,
        updateChart,
      };
    },
  };
</script>
