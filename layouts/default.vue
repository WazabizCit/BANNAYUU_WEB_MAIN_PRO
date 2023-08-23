<template>
  <div>
    <v-app  style="background-color:#e0e0e0; color:white">
     <!-- <Navbar v-if="this.$nuxt.$auth.loggedIn" /> -->
     <div class="d-flex flex-row-reverse ">
        <v-sheet class="ma-2 pa-2">V.1.0.0</v-sheet>
      </div>
      
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
