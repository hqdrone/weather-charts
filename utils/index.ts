import { Ref } from 'vue';

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
