<template>
  <v-container class="mt-10 pt-0 pb-0">  

    <v-row>
        <v-col cols="12">
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
        </v-col>
      </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  methods: {},
  created() {
    // liff
    //   .init({
    //     liffId: process.env.liffid_payment
    //   })
    //   .then(() => {
    //     if (liff.isLoggedIn()) {
    //       liff.getProfile().then(profile => {
    //         this.uuiduser = profile.userId;
    //       });
    //     } else {
    //       liff.login();
    //     }
    //   });
  }
};
</script>
