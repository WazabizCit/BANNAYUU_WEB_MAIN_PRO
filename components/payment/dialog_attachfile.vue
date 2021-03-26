<template>
  <div>
    <v-dialog v-model="dialog_attachfile" width="350px" persistent>
      <v-form ref="form" lazy-validation>
        <v-card>
          <v-card-title>รายละเอียดแจ้งการโอน</v-card-title>
          <v-form ref="form" lazy-validation>
            <v-card-text>
              <v-file-input
                v-model="image_attachfile"
                type="file"
                accept="image/*"
                label="แนบไฟล์ภาพแจ้งโอน"
                prepend-icon="mdi-paperclip"
              ></v-file-input>
              <v-text-field label="หมายเหตุ" v-model="txt_remark"></v-text-field>
              <v-card-actions class="mt-5">
                <v-spacer></v-spacer>
                <v-btn color="success" class="mr-4">ยืนยัน</v-btn>
                <v-btn color="error" class="mr-4" @click="closeDialogAttachfile">ยกเลิก</v-btn>
              </v-card-actions>
            </v-card-text>
          </v-form>
        </v-card>
      </v-form>
    </v-dialog>

    <v-dialog v-model="overlay" persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          กรุณารอสักครู่..
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog_status_payment_success" persistent width="300">
      <v-card max-width="344" class="mx-auto" raised>
        <v-list-item-content class="justify-center">
          <v-img
            class="mt-2"
            :src="require('~/assets/img/icons8-checked-80.png')"
            contain
            max-width="60"
          ></v-img>
          <div class="text-success headline text-center mt-3">ทำรายการสำเร็จ</div>
          <v-list-item-subtitle class="text-center mt-2">ลูกค้าทำรายการชำระเงินสำเร็จ</v-list-item-subtitle>
          <v-list-item-subtitle class="text-center">กรุณากดปุ่มตกลงเพื่อทำรายการต่อ</v-list-item-subtitle>
        </v-list-item-content>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="text-center"
            color="primary"
            @click="dialog_status_payment_success = false"
          >ตกลง</v-btn>
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
  </div>
</template>



<script>
import Dialog_popup from "@/components/dialog_popup.vue";

export default {
  props: {
    obj_select: {},
    dialog_attachfile: false
  },
  data: () => ({
    image_attachfile: null,
    overlay: false,
    dialog_status_payment_success: false,
    dialog_status: false,
    txt_dialog_title: "",
    txt_dialog_sub: "",
    txt_remark:""
  }),
  methods: {
    set_default_value() {
      this.txt_remark = "",
      this.image_attachfile = null
    },
    closeDialog(obj) {
      this.dialog_status = obj.status_dialog;
    },
    closeDialogAttachfile() {
      this.set_default_value()
      let status_dialog_attachfile = this.dialog_attachfile;
      this.$emit(
        "closeDialogAttachfile",
        (this.status_dialog_attachfile = false)
      );
    },
    async btn_payment() {
      
    }
  },
  components: {
    Dialog_popup
  },
  mounted() {}
};
</script>