import { mount } from '@vue/test-utils';
import WeatherPage from './weather.vue';
import { useData } from '~/hooks/useData';

jest.mock('~/hooks/useData');

const mockedUseData = useData as jest.MockedFunction<typeof useData>;

interface WeatherData {
  name: string;
  sys: {
    country: string;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
}

describe('WeatherPage', () => {
  let mockData: WeatherData;

  beforeEach(() => {
    mockData = {
      name: 'London',
      sys: { country: 'UK' },
      weather: [{ description: 'Cloudy', icon: '03d' }],
      main: { temp: 273.15 + 22, feels_like: 273.15 + 20, humidity: 60 },
      wind: { speed: 5, deg: 180 },
    };

    mockedUseData.mockReturnValue({
      fetchData: jest.fn().mockResolvedValue(mockData),
    });
  });

  it('shows loading state initially', async () => {
    const wrapper = mount(WeatherPage);
    expect(wrapper.text()).toContain('Loading...');
  });

  it('displays weather information once loaded', async () => {
    const wrapper = mount(WeatherPage);

    // Wait for promise resolution and component updates.
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain('Weather in London, UK');
    expect(wrapper.text()).toContain('Condition:');
    expect(wrapper.text()).toContain('Cloudy');
    expect(wrapper.text()).toContain('22.00°C');
    expect(wrapper.text()).toContain('60%');
    expect(wrapper.text()).toContain('5 m/s');
    expect(wrapper.find('img').attributes('src')).toBe(
      'http://openweathermap.org/img/w/03d.png'
    );
  });

  it('calls fetchData with correct argument', async () => {
    const fetchData = jest.fn().mockResolvedValue(mockData);
    mockedUseData.mockReturnValue({
      fetchData,
    });

    mount(WeatherPage);
    expect(fetchData).toHaveBeenCalledWith('weather');
  });
});
