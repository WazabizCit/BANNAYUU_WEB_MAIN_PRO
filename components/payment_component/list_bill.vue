<template>
  <div>
    <v-container class="mb-15">
      <v-row>
        <v-col v-for="item in list_items" :key="item.scfi_id" cols="12">
          <v-card class="mx-auto" max-width="444" raised elevation="15">
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1 pt-0">
                  {{
                  item.payment_event_name
                  }}
                </v-list-item-title>
                <v-divider></v-divider>
                <v-list-item-subtitle class="mt-3">Code</v-list-item-subtitle>
                <div class="text-blue">{{ item.scfi_code}}</div>
                <v-list-item-subtitle class="mt-1">วันออกบิล</v-list-item-subtitle>
                <div class="text-blue">{{ item.date_from}}</div>
                <v-list-item-subtitle class="mt-1">ชำระก่อน</v-list-item-subtitle>
                <div class="text-blue">{{ item.date_to}}</div>
                <v-list-item-subtitle class="mt-1">สถานะการชำระ</v-list-item-subtitle>
                <div class="text-orange" v-if="item.workflow_id == null">รอชำระบิล</div>
                <div class="text-blue" v-else>{{item.workflow_name}}</div>
                <v-divider class="mt-2"></v-divider>
                <v-list-item-subtitle class="mt-3">จำนวนเงิน</v-list-item-subtitle>
                <v-list-item-title class="headline mb-1 text-blue">{{item.payment_amount}}</v-list-item-title>
                <v-divider class="mt-2"></v-divider>
                <v-btn
                  class="mt-3 mb-3"
                  color="success"
                  :disabled="item.workflow_id != null"
                  @click="open_dialog_select_pay(item)"
                >ชำระเงิน</v-btn>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>

      <div v-if="status_show">
        <v-row class="mt-10 mb-15">
          <v-col class="text-center" cols="12">
            <v-icon>mdi-note-text-outline</v-icon>
          </v-col>
          <v-col class="text-center" cols="12">ไม่มีข้อมูล</v-col>
        </v-row>
      </div>

      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>

      <v-dialog v-model="dialog_select_pay" width="350px" persistent>
        <v-card>
          <v-card-title>
            <v-icon large left>mdi-view-list-outline</v-icon>
            <span class="title font-weight-light">เลือกวิธีการชำระเงิน</span>
          </v-card-title>

          <v-card-text>
            <v-btn color="info" block @click="open_dialog_attachfile">แนบไฟล์การโอน</v-btn>
            <p></p>
            <v-btn color="info" block @click="open_dialog_payment">ชำระผ่านบัตรเครดิต</v-btn>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" class="mr-4" @click="close_dialog_select_pay">ปิด</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <DialogPayment
        :uuiduser="uuiduser"
        :dialog_payment="dialog_payment"
        :obj_select="obj_select"
        @closeDialogPayment="closeDialogPayment"
      />
      <DialogAttachfile
        :obj_select="obj_select"
        :uuiduser="uuiduser"
        :dialog_attachfile="dialog_attachfile"
        @closeDialogAttachfile="closeDialogAttachfile"
      />

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
    </v-container>
  </div>
</template>

<script>
import DialogPayment from "@/components/payment_component/dialog_payment";
import DialogAttachfile from "@/components/payment_component/dialog_attachfile";
import Dialog_popup from "@/components/dialog_popup.vue";

export default {
  props: {
    uuiduser: ""
  },
  data: () => ({
    dialog_status: false,
    txt_dialog_title: "",
    txt_dialog_sub: "",
    dialog_status_payment_success: false,
    obj_select: null,
    dialog_attachfile: false,
    dialog_payment: false,
    dialog_select_pay: false,
    overlay: false,
    status_show: false,
    list_items: []
  }),
  methods: {
    closeDialog(obj) {
      this.dialog_status = obj.status_dialog;
    },
    async requestData() {
      this.overlay = true;
      this.$axios
        .$post("actionpayment/getlistbill", {
          m_uuiduser: this.uuiduser,
          m_company_id: process.env.company_id
        })
        .then(res => {
          this.overlay = false;
          if (res.data.length == 0) {
            this.list_items = res.data;
            this.status_show = true;
          } else {
            this.list_items = res.data;
            this.status_show = false;
          }
        })
        .catch(error => {
          this.overlay = false;
          this.status_show = true;
        })
        .finally();
    },
    open_dialog_select_pay(obj) {
      this.dialog_select_pay = true;
      this.obj_select = obj;
    },
    open_dialog_payment() {
      this.dialog_select_pay = false;
      this.dialog_payment = true;
    },
    close_dialog_select_pay() {
      this.dialog_select_pay = false;
    },
    closeDialogPayment(obj, status) {
      this.dialog_payment = obj;
      switch (status) {
        case "success":
          this.requestData();
          this.dialog_status_payment_success = true;
          break;

        case "notfound_uuiduser":
          this.dialog_status = true;
          this.txt_dialog_title = "แจ้งเตือน";
          this.txt_dialog_sub = "กรุณาติดต่อเจ้าหน้าที่";
          break;

        default:
          this.dialog_status = true;
          this.txt_dialog_title = "แจ้งเตือน";
          this.txt_dialog_sub = "ระบบผิดพลาด";
          break;
      }
    },
    open_dialog_attachfile() {
      this.dialog_select_pay = false;
      this.dialog_attachfile = true;
    },
    closeDialogAttachfile(obj, status) {
      this.dialog_attachfile = obj;

      switch (status) {
        case "success":
          this.requestData();
          this.dialog_status_payment_success = true;
          break;

        default:
          this.dialog_status = true;
          this.txt_dialog_title = "แจ้งเตือน";
          this.txt_dialog_sub = "ระบบผิดพลาด";
          break;
      }
    }
  },
  mounted() {
    this.requestData();
  },

  components: {
    DialogPayment,
    DialogAttachfile,
    Dialog_popup
  }
};
</script>

<style lang="scss" scoped>
.v-icon {
  font-size: 60px;
  padding: 0 15px;
}
.text-title {
  font-size: 20px;
  font-weight: bold;
}
</style>
