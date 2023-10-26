<template>
  <v-app light>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
  import { ref } from 'vue';

  export default {
    name: 'DefaultLayout',
    setup() {
      const drawer = ref(false);
      const items = [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-line',
          title: 'Dashboard',
          to: '/dashboard',
        },
        {
          icon: 'mdi-weather-partly-snowy-rainy',
          title: 'Weather',
          to: '/weather',
        },
      ];
      const right = ref(true);
      const title = 'Charts';

      const currentYear = ref(new Date().getFullYear());

      return {
        drawer,
        items,
        right,
        title,
        currentYear,
      };
    },
  };
</script>
