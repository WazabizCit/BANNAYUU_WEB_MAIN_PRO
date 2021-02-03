<template>
  <div>
    <v-container>
      <v-row class="justify-center mt-12">
        <v-card color="#2d2f3c" dark style="width:300px; ">       
          <v-card-title class="">Login</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="submit" v-model="valid">
              <!-- Username -->
              <v-text-field
                prepend-inner-icon="mdi-email"
                name="email"
                label="Email"
                id="email"           
              ></v-text-field>

              <!-- Password -->
              <v-text-field
                name="password"
                label="Password"
                id="password"
                prepend-inner-icon="mdi-lock"
                :append-icon="isShowPassword ? 'visibility' : 'visibility_off'"
                @click:append="isShowPassword = !isShowPassword"
                :type="isShowPassword ? 'text' : 'password'"           
                required
              ></v-text-field>
              <!-- <span>{{ account }}</span> -->

              <v-row class="justify-space-between px-3 pt-5">
                <v-btn text @click="rigister">Register</v-btn>
                <v-btn class="" type="submit" color="success" light>Login</v-btn>
              </v-row>
              <v-row class="justify-center px-3 pt-4 pb-4">
                <v-btn text color="success" dark >Forgot Password</v-btn>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-row>

    

   
    </v-container>
  </div>
</template>

<script>

export default {
  data() {
  },
  components: {
 
  },
  methods: {},
  mounted() {

  }
};
</script>

<style>
</style>
