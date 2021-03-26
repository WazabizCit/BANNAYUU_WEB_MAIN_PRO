<template>
  <v-container>
    <v-card max-width="400" class="mx-auto">
      <v-row dense>
        <v-col cols="12">
          <v-card color="#385F73" dark>
            <v-card-title class="headline">Unlimited music now</v-card-title>

            <v-card-subtitle>Listen to your favorite artists and albums whenever and wherever, online and offline.</v-card-subtitle>

            <v-card-actions>
              <v-btn text @click="open_dialog_select_pay">Listen Now</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-card>

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

    <DialogPayment :dialog_payment="dialog_payment" @closeDialogPayment="closeDialogPayment" />
    <DialogAttachfile :dialog_attachfile="dialog_attachfile" @closeDialogAttachfile="closeDialogAttachfile" />
  </v-container>
</template>


<script>
import DialogPayment from "@/components/payment/dialog_payment";
import DialogAttachfile from "@/components/payment/dialog_attachfile";

export default {
  data() {
    return {
      dialog_attachfile:false,
      dialog_payment: false,
      dialog_select_pay: false
    };
  },
  components: {
    DialogPayment,
    DialogAttachfile
  },
  methods: {
    open_dialog_select_pay() {
      this.dialog_select_pay = true;
    },
    open_dialog_payment() {
      this.dialog_select_pay = false;
      this.dialog_payment = true;
    },
    close_dialog_select_pay() {
      this.dialog_select_pay = false;
    },
    closeDialogPayment(obj) {
      this.dialog_payment = obj;
    },
    open_dialog_attachfile() {
      this.dialog_select_pay = false;
      this.dialog_attachfile = true;
    },
    closeDialogAttachfile(obj) {
      this.dialog_attachfile = obj;
    }
    

  }
};
</script>
