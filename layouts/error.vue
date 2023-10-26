<template>
  <v-app light>
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <NuxtLink to="/"> Home page </NuxtLink>
  </v-app>
</template>

<script>
  import { computed } from 'vue';

  export default {
    name: 'EmptyLayout',
    layout: 'empty',
    props: {
      error: {
        type: Object,
        default: null,
      },
    },
    setup(props) {
      const { error } = props;

      const pageNotFound = '404 Not Found';
      const otherError = 'An error occurred';

      const title = computed(() => {
        return error.value.statusCode === 404
          ? pageNotFound.value
          : otherError.value;
      });

      const head = () => {
        return {
          title: title.value,
        };
      };

      return {
        pageNotFound,
        otherError,
        head,
        error,
      };
    },
  };
</script>

<style scoped>
  h1 {
    font-size: 20px;
  }
</style>
