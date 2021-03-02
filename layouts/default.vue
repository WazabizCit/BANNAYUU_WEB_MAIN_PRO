<template>
  <div>
    <v-app>
     <!-- <Navbar v-if="this.$nuxt.$auth.loggedIn" /> -->
      <nuxt></nuxt>
    </v-app>
  </div>
</template>

<script>

export default {
  name: "App",
  components: {
    
  },
  computed: {}
};
</script>

<style lang="scss" >




.v-application {
    font-family: "Quicksand", sans-serif;
  }


  .v-toolbar__title {
    text-align: left;
    width: 100%;
    font-size: 15px;
    font-weight: bold;
    padding: 0 0 !important;
  }
  
</style>
