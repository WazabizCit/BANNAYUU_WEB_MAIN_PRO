


<template>
  <div>
    <v-container class="pt-0 pb-0 mt-10">
      <v-row align="center" justify="center">
        <v-card>
          <v-card-title>QRCODE</v-card-title>
          <div align="center" justify="center">
            <qrcode-vue :value="txt_qrcode" :size="size" level="L"></qrcode-vue>
            <div class="text-primary pl-2 pr-2 pt-2">กรุณานำ QR Code ไปแสดงให้กับเจ้าหน้าที่ทางเข้า</div>
          </div>
          <v-row>
            <v-col class="mt-5" cols="12"></v-col>
          </v-row>
        </v-card>
      </v-row>

      <v-row>
        <v-col class="mt-5" cols="12"></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";

export default {
  data: () => ({
    size: 120,
    txt_qrcode: ""
  }),
  components: {
    QrcodeVue
  },
  mounted() {
    this.txt_qrcode = this.$route.query.qrcode;
  }
};
</script>

<style lang="scss" scoped>
.v-icon-details-star {
  font-size: 80px;
  padding: 0 15px;
}
</style>
