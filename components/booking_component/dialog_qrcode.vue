<template>
  <div>
    <v-container class="pt-0 pb-0">
      <v-dialog v-model="dialog_qrcode" width="350px" persistent>
        <v-card>
          <v-card-title>QRCODE</v-card-title>
          <div align="center" justify="center">
            <qrcode-vue :value="obj_select.tbv_code" :size="size" level="L"></qrcode-vue>
            <div class="text-primary pl-2 pr-2 pt-2">กรุณานำ QR Code ไปแสดงให้กับเจ้าหน้าที่ทางเข้า</div>
          </div>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error"  text @click="closeDialogQr">ปิด</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";
export default {
  props: {
    obj_select: {},
    dialog_qrcode: false
  },
  data: () => ({
    size: 120,
    status_dialog: false
  }),
  methods: {
    closeDialogQr() {
      let status_dialog_qrcode = this.dialog_qrcode;
      this.$emit("closeDialog", (this.status_dialog_qrcode = false));
    }
  },
  components: {
    QrcodeVue
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.v-icon {
  font-size: 60px;
  padding: 0 15px;
}
</style>
