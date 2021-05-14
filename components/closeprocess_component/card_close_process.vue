<template>
  <div v-if="status_close_process">
    <v-card max-width="344" class="mx-auto" raised>
      <v-list-item-content class="justify-center">
        <v-img
          class="mt-2"
          :src="require('~/assets/img/img_close_process.png')"
          contain
          max-width="344"
        ></v-img>
      </v-list-item-content>
    </v-card>
  </div>
</template>



<script>
export default {
  mounted() {},
  props: {
    status_close_process: false
  },
  methods: {},
  data: () => ({})
};
</script>

<style>
</style>