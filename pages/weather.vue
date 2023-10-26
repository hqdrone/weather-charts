<template>
  <div>
    <div v-if="!isLoaded">Loading...</div>
    <div v-else>
      <v-row>
        <v-col>
          <div class="weather-info">
            <h1 class="mb-6">
              Weather in {{ weatherData.name }}, {{ weatherData.sys.country }}
            </h1>
            <p>
              <strong>Condition:</strong>
              {{ weatherData.weather[0].description }}
            </p>
            <p>
              <strong>Temperature:</strong>
              {{ convertToCelsius(weatherData.main.temp) }}°C
            </p>
            <p>
              <strong>Feels Like:</strong>
              {{ convertToCelsius(weatherData.main.feels_like) }}°C
            </p>
            <p><strong>Humidity:</strong> {{ weatherData.main.humidity }}%</p>
            <p>
              <strong>Wind:</strong> {{ weatherData.wind.speed }} m/s,
              direction: {{ weatherData.wind.deg }}°
            </p>
            <p>
              <img
                :src="`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`"
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
  import { convertToCelsius } from '~/utils';

  export default {
    name: 'WeatherPage',
    setup() {
      const { isDataLoading, fetchData } = useData();
      const weatherData = ref({});
      const isLoaded = ref(false);

      const fetchWeatherData = async () => {
        weatherData.value = await fetchData('weather');
        isLoaded.value = true;
      };

      onMounted(fetchWeatherData);

      return {
        isDataLoading,
        weatherData,
        convertToCelsius,
        isLoaded,
      };
    },
  };
</script>
