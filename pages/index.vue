<template>
  <div>
    <v-row>
      <v-col>
        <h1 class="text-center">Welcome</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="d-flex justify-center">
          <NuxtLink to="/dashboard">
            <v-btn color="primary mr-6" x-large> Dashboard </v-btn>
          </NuxtLink>
          <NuxtLink to="/weather">
            <v-btn color="primary mr-6" x-large> Weather </v-btn>
          </NuxtLink>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  export default {
    name: 'IndexPage',
  };
</script>
