import { Model } from '@vuex-orm/core';
import { convertToCelsius } from '../utils';

export default class CurrentWeather extends Model {
  static entity = 'currentWeathers';

  static fields() {
    return {
      id: this.uid(),
      name: this.string(''),
      country: this.string(''),
      description: this.string(''),
      temp: this.number(0),
      feels_like: this.number(0),
      humidity: this.number(0),
      wind_speed: this.number(0),
      wind_deg: this.number(0),
      icon: this.string(''),
    };
  }

  temp!: number;
  feels_like!: number;

  get temp_celsius() {
    return convertToCelsius(this.temp);
  }

  get feels_like_celsius() {
    return convertToCelsius(this.feels_like);
  }
}
