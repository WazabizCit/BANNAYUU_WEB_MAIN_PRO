<template>
  <div>
    <v-container class="pt-0 pb-0">
      <v-dialog v-model="dialog_estamp" width="350px" persistent>
        <v-card>
          <v-card-title>แจ้งเตือน</v-card-title>
          <div align="center" justify="center">
            <div class="text-primary pl-2 pr-2 pt-2">คุณต้องการที่จะ Estmp ใช่หรือไม่ ?</div>
          </div>

          <v-card-actions class="mt-7">
            <v-spacer></v-spacer>
            <v-btn color="success" @click="send_data_estamp">ยืนยัน</v-btn>
            <v-btn color="error" @click="closeDialogestamp">ปิด</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>

    <v-dialog v-model="dialog_status_estamp" persistent width="300">
      <v-card max-width="344" class="mx-auto" raised>
        <v-list-item-content class="justify-center">
          <v-img
            class="mt-2"
            :src="require('~/assets/img/icons8-checked-80.png')"
            contain
            max-width="60"
          ></v-img>
          <div class="text-success headline text-center mt-3">ทำรายการสำเร็จ</div>
          <v-list-item-subtitle class="text-center mt-2">ลูกค้าทำรายการสำเร็จ</v-list-item-subtitle>
          <v-list-item-subtitle class="text-center">กรุณากดปุ่มตกลงเพื่อทำรายการต่อ</v-list-item-subtitle>
        </v-list-item-content>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="text-center" color="primary" @click="dialog_status_estamp = false">ตกลง</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <Dialog_popup
      :dialog_status="dialog_status"
      :txt_dialog_sub="txt_dialog_sub"
      :txt_dialog_title="txt_dialog_title"
      @closeDialog="closeDialog"
    />

    <v-dialog v-model="overlay" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          กรุณารอสักครู่..
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
import Dialog_popup from "@/components/dialog_popup.vue";

export default {
  props: {
    dialog_estamp: false,
    obj_select: {},
    uuiduser: ""
  },
  data: () => ({
    overlay: false,
    txt_dialog_title: "",
    txt_dialog_sub: "",
    dialog_status_estamp: false,
    dialog_status: false
  }),
  methods: {
    closeDialog(obj) {
      this.dialog_status = obj.status_dialog;
    },
    closeDialogestamp() {
      let status_dialog_estamp = this.dialog_estamp;
      this.$emit("closeDialogestamp", {
        status_dialog_estamp: (this.status_dialog_estamp = false)
      });
    },
    async send_data_estamp() {
      this.overlay = true;
      try {
        const response = await this.$axios.$post("actionestamp/setestamp", {
          m_uuiduser: this.uuiduser,
          m_visitor_record_id: this.obj_select.visitor_record_id
        });

        switch (response.message) {
          case "success":
            this.closeDialogestamp();
            this.dialog_status_estamp = true;
            this.overlay = false;

            break;
          case "notsuccess":
            this.dialog_status = true;
            this.overlay = false;
            this.txt_dialog_title = "แจ้งเตือน";
            this.txt_dialog_sub = "Estamp ไม่สำเร็จ";

            break;

          case "notfound_uuiduser":
            this.dialog_status = true;
            this.txt_dialog_title = "แจ้งเตือน";
            this.txt_dialog_sub = "กรุณาติดต่อเจ้าหน้าที่";
            break;

          default:
            this.dialog_status = true;
            this.overlay = false;
            this.txt_dialog_title = "แจ้งเตือน";
            this.txt_dialog_sub = "ระบบผิดพลาด";

            break;
        }
      } catch (e) {
        this.dialog_status = true;
        this.overlay = false;
        this.txt_dialog_title = "แจ้งเตือน";
        this.txt_dialog_sub = "ระบบผิดพลาด";
      }
    }
  },
  components: {
    Dialog_popup
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
