<template>
  <div>
    <div v-if="!isLoaded">Loading...</div>
    <div v-else>
      <v-row>
        <v-col>
          <dashboard-toolbar
            :chart-types="chartTypes"
            :combine="combine"
            :dates="dates"
            :data-dates="dataDates"
            :selected-chart-types="selectedChartTypes"
            @update:dates="updateDates"
            @update:combine="updateCombine"
            @update:selectedChartTypes="updateSelectedChartTypes"
          ></dashboard-toolbar>
        </v-col>
      </v-row>
      <v-row v-if="selectedChartTypes.length">
        <v-col
          v-for="type in combine ? ['combined'] : selectedChartTypes"
          :key="type"
          cols="12"
          lg="6"
        >
          <high-chart
            :label="combine ? 'Combine selected' : getLabelForType(type)"
            :data="combine ? combinedChartData : chartsData[type]"
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
  import { ref, computed, onMounted, watch } from 'vue';
  import { useData } from '~/hooks/useData';
  import HighChart from '~/components/HighChart';
  import DashboardToolbar from '~/components/DashboardToolbar';
  import { useFilteredData } from '~/hooks/useFilteredData';
  import { formatDate } from '~/utils';

  export default {
    name: 'DashboardPage',
    components: { HighChart, DashboardToolbar },
    setup() {
      const { fetchData } = useData();
      const combine = ref(false);
      const weatherData = ref({});
      const dates = ref([]);
      const dataDates = ref([]);
      const initialData = ref({});
      const isLoaded = ref(false);

      const { filteredData } = useFilteredData(weatherData, dates);

      const chartTypes = computed(() => [
        { label: 'Humidity', value: 'humidity' },
        { label: 'Temperature', value: 'temperature' },
        { label: 'Pressure', value: 'pressure' },
        { label: 'Wind', value: 'wind' },
      ]);

      const selectedChartTypes = ref(
        chartTypes.value.map((item) => item.value)
      );

      const createInitialChartData = () => {
        chartTypes.value.forEach((type) => {
          initialData.value[type.value] = [
            {
              series: [],
              seriesName: type.label,
              xAxis: [],
            },
          ];
        });
        return initialData;
      };

      const chartsData = createInitialChartData();

      const fetchWeatherData = async () => {
        weatherData.value = await fetchData('forecast');
        isLoaded.value = true;
        processWeatherData();
        dataDates.value = extractDatesFromWeatherData();
      };

      const processWeatherData = () => {
        filteredData.value.forEach(({ main, wind, dt_txt }) => {
          updateChartData('humidity', main.humidity, dt_txt);
          updateChartData('temperature', main.temp, dt_txt);
          updateChartData('pressure', main.pressure, dt_txt);
          updateChartData('wind', wind.speed, dt_txt);
        });
      };

      const updateChartData = (type, value, date) => {
        chartsData.value[type][0].series.push(value);
        chartsData.value[type][0].xAxis.push(date);
      };

      const resetChartsData = () => {
        for (const type in chartsData.value) {
          chartsData.value[type][0].series = [];
          chartsData.value[type][0].xAxis = [];
        }
      };

      const extractDatesFromWeatherData = () => {
        return weatherData.value.list.map((el) => {
          const dateObj = new Date(el.dt * 1000);
          return formatDate(dateObj);
        });
      };

      const getLabelForType = (type) => {
        return (
          chartTypes.value.find((item) => item.value === type)?.label || ''
        );
      };

      const updateDates = (payload) => {
        dates.value = payload;
      };

      const updateSelectedChartTypes = (payload) => {
        selectedChartTypes.value = payload;
      };

      const updateCombine = (payload) => {
        combine.value = payload;
      };

      onMounted(fetchWeatherData);

      watch(dates, () => {
        resetChartsData();
        processWeatherData();
      });

      return {
        chartsData,
        chartTypes,
        selectedChartTypes,
        getLabelForType,
        combine,
        combinedChartData: computed(() =>
          selectedChartTypes.value.map((type) => chartsData.value[type][0])
        ),
        dates,
        dataDates,
        filteredData,
        updateDates,
        updateCombine,
        updateSelectedChartTypes,
        isLoaded,
      };
    },
  };
</script>
