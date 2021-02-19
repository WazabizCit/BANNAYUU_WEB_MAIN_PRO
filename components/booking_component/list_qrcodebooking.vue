<template>
  <div>
    <v-container class="pt-0 pb-0">
      <v-row>
        <v-col v-for="item in items_qr" :key="item.tbv_id" cols="12">
          <v-card class="mx-auto mt-2" max-width="364" raised>
            <v-list-item class="mb-3" three-line>
              <v-list-item-content>
                <v-list-item-subtitle>ชื่อผู้มาติดต่อ</v-list-item-subtitle>
                <div class="text-orange">{{item.tbv_contact_person}}</div>
                <v-list-item-subtitle class="mt-1">ทะเบียนรถ</v-list-item-subtitle>
                <div class="text-orange">{{item.tbv_license_plate}}</div>
                <v-list-item-subtitle class="mt-1">เบอร์ติดต่อ</v-list-item-subtitle>
                <div class="text-orange">{{item.tbv_mobile_contact_person}}</div>
                <v-list-item-subtitle class="mt-1">กรุณาเข้าก่อนเวลา</v-list-item-subtitle>
                <div class="text-orange">{{item.tbv_end_datetime}}</div>
              </v-list-item-content>
              <v-icon class="v-icon-qr">mdi-qrcode-scan</v-icon>
            </v-list-item>
            <v-card-actions class>
              <v-btn color="success" @click="dialogqrcode(item)">เรียกดู QRCode</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <div v-if="status_show">
        <v-row class="mt-10">
          <v-col class="text-center" cols="12">
            <v-icon>mdi-note-text-outline</v-icon>
          </v-col>
          <v-col class="text-center" cols="12">ไม่มีข้อมูล</v-col>
        </v-row>
      </div>

      <DialogQrcode
        :obj_select="obj_select"
        :dialog_qrcode="dialog_qrcode"
        @closeDialog="closeDialog"
      />
    </v-container>
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";
import DialogQrcode from "@/components/booking_component/dialog_qrcode";
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    uuiduser: "",
    status_show: false,
    size: 120,
    obj_select: {},
    dialog_qrcode: false,
    dialog_map: false,
    items_qr: []
  }),
  methods: {
    ...mapGetters({
      getInfoBooking: "booking/getInfoBooking"
    }),
    async requestData() {
      this.$axios
        .$post("booking/history", {
          m_uuiduser: this.getInfoBooking().uuiduser
        })
        .then(res => {       
          if (res.data.length == 0) {
            this.status_show = true;
          } else {
            this.items_qr = res.data;
            this.status_show = false;
          }
        })
        .catch((this.status_show = true))
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
.v-icon-qr {
  font-size: 80px;
  padding: 0 15px;
}
</style>
