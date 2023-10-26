import { ref } from 'vue';
import {
  getMinDate,
  getMaxDate,
  formatDate,
  convertToCelsius,
  fakeAPIClient,
} from './index';

describe('Date utility functions', () => {
  it('should return the minimum date from the list', () => {
    const dates = ref(['2023-10-25', '2023-01-10', '2023-12-01']);
    expect(getMinDate(dates)).toBe('2023-01-10');
  });

  it('should return the maximum date from the list', () => {
    const dates = ref(['2023-10-25', '2023-01-10', '2023-12-01']);
    expect(getMaxDate(dates)).toBe('2023-12-01');
  });

  it('should format a date object correctly', () => {
    const dateObj = new Date('2023-10-26');
    expect(formatDate(dateObj)).toBe('2023-10-26');
  });
});

describe('Temperature conversion function', () => {
  it('should correctly convert Kelvin to Celsius', () => {
    expect(convertToCelsius(300)).toBe('26.85');
  });

  it('should return -273.15 Celsius for 0 Kelvin', () => {
    expect(convertToCelsius(0)).toBe('-273.15');
  });
});

describe('fakeAPIClient', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should resolve after 1 second', async () => {
    const promise = fakeAPIClient();

    jest.advanceTimersByTime(1000);

    console.log('expect(promise).resolves: ', expect(promise).resolves);

    await expect(promise).resolves.toBeUndefined();
  });
});
