import { Ref } from 'vue';
import { CurrentWeatherResponse } from '../types';

export const getMinDate = (dates: Ref<string[]>) => {
  return dates.value.reduce((min, currentDate) =>
    currentDate < min ? currentDate : min
  );
};

export const getMaxDate = (dates: Ref<string[]>) => {
  return dates.value.reduce((max, currentDate) =>
    currentDate > max ? currentDate : max
  );
};

export const formatDate = (dateObj: Date) => {
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const date = String(dateObj.getDate()).padStart(2, '0');

  return `${year}-${month}-${date}`;
};

export const convertToCelsius = (kelvin: number) => {
  return (kelvin - 273.15).toFixed(2);
};

export const fakeAPIClient = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};

export const toCurrentWeatherModel = (response: CurrentWeatherResponse) => ({
  id: response.id,
  name: response.name,
  country: response.sys.country,
  description: response.weather[0].description,
  temp: response.main.temp,
  feels_like: response.main.feels_like,
  humidity: response.main.humidity,
  wind_speed: response.wind.speed,
  wind_deg: response.wind.deg,
  icon: response.weather[0].icon,
});
