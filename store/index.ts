import Vuex from 'vuex';
import { Database, install } from '@vuex-orm/core';
import CurrentWeather from '../models/CurrentWeatherModel';

const database = new Database();

database.register(CurrentWeather);

const createStore = () => {
  return new Vuex.Store({
    plugins: [install(database)],
  });
};

export default createStore;
