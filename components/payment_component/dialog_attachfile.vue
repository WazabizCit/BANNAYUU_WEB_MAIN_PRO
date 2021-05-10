<template>
  <div>
    <v-dialog v-model="dialog_attachfile" width="350px" persistent>
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
              :rules="uploadimgRules"
            ></v-file-input>

            <v-select
              v-model="select_bank"
              :item-text="'name'"
              :items="items_bank"
              label="เลือกธนาคาร"
              prepend-icon="mdi-bank"
              :rules="selectbankRules"
            >
              <template slot="item" slot-scope="data">
                <v-img width="30" height="30" :src="data.item.src" contain max-width="60"></v-img>
                {{data.item.name}}
              </template>
            </v-select>

            <v-dialog
              ref="dialogdate"
              v-model="modaldate"
              :return-value.sync="pickerdate"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="pickerdate"
                  label="เลือกวันที่"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="pickerdate" scrollable locale="th">
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modaldate = false">ยกเลิก</v-btn>
                <v-btn text color="primary" @click="setdatepick(pickerdate)">ตกลง</v-btn>
              </v-date-picker>
            </v-dialog>

            <v-dialog
              ref="dialogtime"
              v-model="modaltime"
              :return-value.sync="pickertime"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="pickertime"
                  label="เลือกช่วงเวลา"
                  prepend-icon="mdi-clock-time-four-outline"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker v-if="modaltime" v-model="pickertime" full-width format="24hr">
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modaltime = false">ยกเลิก</v-btn>
                <v-btn text color="primary" @click="settimepick(pickertime)">ตกลง</v-btn>
              </v-time-picker>
            </v-dialog>

            <v-text-field label="หมายเหตุ" v-model="txt_remark"></v-text-field>
            <v-card-actions class="mt-5">
              <v-spacer></v-spacer>
              <v-btn color="success" class="mr-4" @click="confirm_data">ยืนยัน</v-btn>
              <v-btn color="error" class="mr-4" @click="closeDialogAttachfile('close')">ยกเลิก</v-btn>
            </v-card-actions>
          </v-card-text>
        </v-form>
      </v-card>
    </v-dialog>

    <v-dialog v-model="overlay" persistent width="300">
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
export default {
  props: {
    dialog_attachfile: false,
    uuiduser: "",
    obj_select: null
  },
  data: () => ({
    select_bank: null,
    items_bank: [
      { name: "ธนาคารกรุงเทพ", src: require("@/assets/img_bank/BBL.png") },
      { name: "ธนาคารกสิกรไทย", src: require("@/assets/img_bank/KBANK.png") },
      { name: "ธนาคารกรุงไทย", src: require("@/assets/img_bank/KTB.png") },
      { name: "ธนาคารทหารไทย", src: require("@/assets/img_bank/TMB.png") },
      { name: "ธนาคารไทยพาณิชย์", src: require("@/assets/img_bank/SCB.png") },
      {
        name: "ธนาคารกรุงศรีอยุธยา",
        src: require("@/assets/img_bank/BAY.png")
      },
      {
        name: "ธนาคารเกียรตินาคินภัทร",
        src: require("@/assets/img_bank/KKP.png")
      },
      {
        name: "ธนาคารซีไอเอ็มบีไทย",
        src: require("@/assets/img_bank/CIMBT.png")
      },
      { name: "ธนาคารทิสโก้", src: require("@/assets/img_bank/TISCO.png") },
      { name: "ธนาคารธนชาต", src: require("@/assets/img_bank/TBANK.png") },
      { name: "ธนาคารยูโอบี", src: require("@/assets/img_bank/UOBT.png") },
      {
        name: "ธนาคารแลนด์แอนด์ เฮ้าส์",
        src: require("@/assets/img_bank/LHFG.png")
      },
      { name: "ธนาคารออมสิน", src: require("@/assets/img_bank/GSB.png") },
      {
        name: "ธนาคารอาคารสงเคราะห์",
        src: require("@/assets/img_bank/GHB.png")
      },
      { name: "อื่นๆ", src: require("@/assets/img_bank/bank_other.png") }
    ],
    image_attachfile: null,
    overlay: false,
    txt_remark: "",
    nowDate: new Date().toISOString().slice(0, 10),
    pickertime: "00:00",
    pickerdate: new Date().toISOString().substr(0, 10),
    modaldate: false,
    modaltime: false,
    uploadimgRules: [v1 => !!v1 || "กรุณาเลือกรูปภาพ"],
    selectbankRules: [v1 => !!v1 || "กรุณาเลือกธนาคาร"],
    status_senddata: false
  }),
  methods: {
    set_default_value() {
      (this.txt_remark = ""), (this.image_attachfile = null);
    },
    closeDialogAttachfile(status) {
      this.set_default_value();
      let status_dialog_attachfile = this.dialog_attachfile;
      this.$emit(
        "closeDialogAttachfile",
        (this.status_dialog_attachfile = false),
        status
      );
    },

    settimepick(timepick) {
      this.modaltime = false;
      this.$refs.dialogtime.save(timepick);
      this.pickertime = timepick;
    },
    setdatepick(datepick) {
      this.modaldate = false;
      this.$refs.dialogdate.save(datepick);
      this.pickerdate = datepick;
    },
    async confirm_data() {
      if (this.$refs.form.validate()) {
        try {
          this.overlay = true;
          this.dialog_write_appeal = false;
          let formData = new FormData();
          formData.append("keyfile", this.image_attachfile);
          formData.append("m_uuiduser", this.uuiduser);
          formData.append(
            "m_payment_event_id",
            this.obj_select.payment_event_id
          );
          formData.append("m_scfi_code", this.obj_select.scfi_code);
          formData.append("m_company_id", process.env.company_id);
          formData.append("m_tpcfi_remark", this.txt_remark);
          formData.append("m_pickerdate", this.pickerdate);
          formData.append("m_pickertime", this.pickertime);
          formData.append("m_bank", this.select_bank);

          let res_data = await this.$axios.$post(
            "actionpayment/attachfilebill",
            formData
          );
          this.overlay = false;
          this.image_attachfile = null;
          this.txt_remark = "";

          switch (res_data.message) {
            case "success":
              this.closeDialogAttachfile("success");
              break;

            default:
              this.closeDialogAttachfile("fail");
              break;
          }
        } catch (error) {
          this.closeDialogAttachfile("fail");
        }
      }
    }
  },
  components: {},
  mounted() {}
};
</script>