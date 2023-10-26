import axios from 'axios';

export const useData = () => {
  const fetchData = async (type: 'forecast' | 'weather') => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/${type}?lat=62.60&lon=29.76&appid=d420d941ee9a0be92b66fb897290011c`
      );
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  return { fetchData };
};
