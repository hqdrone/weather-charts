<template>
  <div>
    <div v-if="!isLoaded">Loading...</div>
    <div v-else>
      <v-row>
        <v-col>
          <div class="weather-info">
            <h1 class="mb-6">
              Weather in {{ currentWeatherData.name }},
              {{ currentWeatherData.country }}
            </h1>
            <p>
              <strong>Condition:</strong>
              {{ currentWeatherData.description }}
            </p>
            <p>
              <strong>Temperature:</strong>
              {{ currentWeatherData.temp_celsius }}°C
            </p>
            <p>
              <strong>Feels Like:</strong>
              {{ currentWeatherData.feels_like_celsius }}°C
            </p>
            <p><strong>Humidity:</strong> {{ currentWeatherData.humidity }}%</p>
            <p>
              <strong>Wind:</strong> {{ currentWeatherData.wind_speed }} m/s,
              direction: {{ currentWeatherData.wind_deg }}°
            </p>
            <p>
              <img
                :src="`http://openweathermap.org/img/w/${currentWeatherData.icon}.png`"
                alt="Weather Icon"
              />
            </p>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
  import { ref, onMounted } from 'vue';
  import { useData } from '~/hooks/useData';
  import { toCurrentWeatherModel } from '~/utils';
  import CurrentWeather from '~/models/CurrentWeatherModel';

  export default {
    name: 'WeatherPage',
    setup() {
      const { fetchData } = useData();
      const currentWeatherData = ref({});
      const isLoaded = ref(false);

      const fetchCurrentWeatherData = async () => {
        const response = await fetchData('weather');
        await CurrentWeather.insertOrUpdate({
          data: toCurrentWeatherModel(response),
        });
        currentWeatherData.value = CurrentWeather.query().first();
        isLoaded.value = true;
      };

      onMounted(fetchCurrentWeatherData);

      return {
        currentWeatherData,
        isLoaded,
      };
    },
  };
</script>
