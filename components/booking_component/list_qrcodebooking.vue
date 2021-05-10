<template>
  <div>
    <v-container class="pt-0 pb-0">
      <v-row>
        <v-col v-for="item in items_qr" :key="item.tbv_id" cols="12">
          <v-card class="mx-auto mt-2" max-width="364" raised>
            <v-list-item class="mb-3" three-line>
              <v-list-item-content>
                <v-list-item-subtitle>ชื่อผู้มาติดต่อ</v-list-item-subtitle>
                <div class="text-blue">{{item.tbv_contact_person}}</div>
                <v-list-item-subtitle class="mt-1">ทะเบียนรถ</v-list-item-subtitle>
                <div class="text-blue">{{item.tbv_license_plate}}</div>
                <v-list-item-subtitle class="mt-1">เบอร์ติดต่อ</v-list-item-subtitle>
                <div class="text-blue">{{item.tbv_mobile_contact_person}}</div>
                <v-list-item-subtitle class="mt-1">กรุณาเข้าก่อนเวลา</v-list-item-subtitle>
                <div class="text-blue">{{item.tbv_end_datetime}}</div>
              </v-list-item-content>
              <v-list-item-avatar tile size="80" color>
                <v-img
                  class="mt-2"
                  :src="require('~/assets/img/qr-code.png')"
                  contain
                  max-width="60"
                ></v-img>
              </v-list-item-avatar>
            </v-list-item>
            <v-card-actions class>
              <v-btn color="success" @click="dialogqrcode(item)">เรียกดู QRCode</v-btn>
              <v-btn color="info" @click="shareViaWebShare(item.tbv_code)">
                <v-icon left>mdi-share</v-icon>แชร์
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <div v-if="status_show">
        <v-row class="mt-10">
          <v-col class="text-center" cols="12">
            <v-icon class="v-icon-size">mdi-note-text-outline</v-icon>
          </v-col>
          <v-col class="text-center text-primary" cols="12">ไม่มีข้อมูล</v-col>
        </v-row>
      </div>

      <DialogQrcode
        :obj_select="obj_select"
        :dialog_qrcode="dialog_qrcode"
        @closeDialog="closeDialog"
      />

      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </v-container>
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";
import DialogQrcode from "@/components/booking_component/dialog_qrcode";
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    overlay: false,
    uuiduser: "",
    status_show: false,
    size: 120,
    obj_select: {},
    dialog_qrcode: false,
    dialog_map: false,
    items_qr: []
  }),
  methods: {
    shareViaWebShare(textqrcode) {
      window.open(
        `line://msg/text/https://citbanayuu.web.app/genqrcode?qrcode=${textqrcode}`,
        "_blank"
      );
    },
    ...mapGetters({
      getInfoBooking: "booking/getInfoBooking"
    }),
    async requestData() {
      this.overlay = true;
      this.$axios
        .$post("booking/history", {
          m_uuiduser: this.getInfoBooking().uuiduser
        })
        .then(res => {
          if (res.data.length == 0) {
            this.status_show = true;
            this.overlay = false;
          } else {
            this.items_qr = res.data;
            this.status_show = false;
            this.overlay = false;
          }
        })
        .catch(error => {
          this.status_show = true;
          this.overlay = false;
        })
        .finally();
    },
    closeDialog(obj) {
      this.dialog_qrcode = obj;
    },
    dialogqrcode(item) {
      this.obj_select = item;
      this.dialog_qrcode = true;
    }
  },
  mounted() {
    this.requestData();
  },
  components: {
    QrcodeVue,
    DialogQrcode
  }
};
</script>



<style lang="scss" scoped>
.v-icon-size {
  font-size: 80px;
  padding: 0 15px;
}
</style>

