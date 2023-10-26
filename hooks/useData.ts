import axios from 'axios';
import { useContext } from '@nuxtjs/composition-api';

export const useData = () => {
  const fetchData = async (type: 'forecast' | 'weather') => {
    const {
      $config: { apiKey },
    } = useContext();
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/${type}?lat=62.60&lon=29.76&appid=${apiKey}`
      );
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  return { fetchData };
};
