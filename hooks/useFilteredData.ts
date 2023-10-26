import { computed, Ref } from 'vue';
import { WeatherEntry, WeatherResponse } from '~/types';
import { formatDate } from '~/utils';

export const useFilteredData = (
  data: Ref<WeatherResponse>,
  dates: Ref<string[]>
) => {
  const filteredData = computed(() => {
    return dates.value.length !== 0
      ? data.value.list
          .map((el: WeatherEntry) => {
            const timestamp = el.dt * 1000;
            const dateObj = new Date(timestamp);
            const timezoneOffset = dateObj.getTimezoneOffset() * 60 * 1000;
            const localDateObj = new Date(timestamp + timezoneOffset);
            if (dates.value.includes(formatDate(localDateObj))) {
              return el;
            }
            return null;
          })
          .filter(Boolean)
      : data.value.list;
  });

  return { filteredData };
};
