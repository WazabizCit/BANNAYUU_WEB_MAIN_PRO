<template>
  <v-container>
    <div class="mb-5">
      <v-row align="center" justify="center">
        <div class="text-primary text-title mt-10 mb-2">QRCode ผู้มาติดต่อ</div>
      </v-row>
      <Qrcodeready />
      <v-row>
        <v-col class="mt-5" cols="12"></v-col>
      </v-row>
      <v-btn class dark large color="orange" fixed right bottom @click="back">ย้อนกลับ</v-btn>
    </div>
  </v-container>
</template>


<script>
import Qrcodeready from "@/components/booking_component/list_qrcodebooking";
export default {
  data() {
    return {};
  },
  components: {
    Qrcodeready
  },
  methods: {
    back() {
      this.$router.push("/booking");
    }
  }
};
</script>

<style lang="scss" scoped>
.v-icon {
  font-size: 50px;
}

.v-tabs {
  margin-bottom: 15px;
  margin-top: 15px;
}
.container {
  padding: 0px;
}
</style>
