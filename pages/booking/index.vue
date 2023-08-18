<template>
  <div>
    <v-container class="pt-0 pb-0">
      <v-row>
        <v-col cols="12">
          <div class="mt-7 text-primary text-title text-center">ลงทะเบียนผู้มาติดต่อ</div>
        </v-col>
        <v-col cols="12" class="pt-0 pb-0">
          <div class="text-center">
            <img src="~/assets/img/img_contact.svg" alt width="125" />
          </div>
        </v-col>
        <v-col cols="12">
          <v-form ref="form" v-model="valid">
            <p class="text-center text-sub-title mb-0 text-primary">กรุณากรอกรายละเอียดผู้มาติดต่อ</p>
            <div class="mt-8">
              <!-- <v-text-field class="mt-2" v-model="uuiduser" name="uuiduser" label="UUID" dense disabled></v-text-field> -->
              <v-text-field
                class="mt-2"
                v-model="visitor_name"
                name="firstname"
                label="ชื่อผู้ติดต่อ"
                id="firstname"
                :rules="firstnameRules"
                dense
              ></v-text-field>

              <v-text-field
                class="mt-2"
                name="phonenumber"
                v-model="phonenumber"
                label="เบอร์มือถือผู้มาติดต่อ"
                type="text"
                inputmode="tel"
                pattern="[0-9]*"
                :maxlength="10"
                :counter="10"
                id="phonenumber"
                dense
                onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                :rules="phonenumberRules"
              ></v-text-field>

              <v-text-field
                class="mt-2"
                v-model="license_plate"
                name="license_plate"
                label="ทะเบียนรถ"
                id="license_plate"
                dense
              ></v-text-field>

              <v-text-field
                class="mt-2"
                v-model="remark"
                name="remark"
                label="หมายเหตุ"
                id="remark"
                dense
              ></v-text-field>
            </div>

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
              <v-date-picker v-model="pickerdate" scrollable :min="nowDate" locale="th">
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

            <v-btn
              rounded
              color="primary"
              dark
              class="w-100 mt-4 my-btn"
              @click="next"
            >ยืนยันลงทะเบียน</v-btn>

            <div class="mt-5 mb-5 w-100 text-orange text-center my-btn" @click="back">ย้อนกลับ</div>
          </v-form>
        </v-col>
      </v-row>

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
import Dialog_popup from "@/components/dialog_popup.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      valid: false,
      dialog_status: false,
      txt_dialog_title: "",
      txt_dialog_sub: "",
      uuiduser: "",
      pickerdate: new Date().toISOString().substr(0, 10),
      nowDate: new Date().toISOString().slice(0, 10),
      menu: false,
      modaldate: false,
      pickertime: "00:00",
      modaltime: false,
      visitor_name: "",
      phonenumber: "",
      remark: "",
      license_plate: "",
      addressRules: [v1 => !!v1 || "กรุณาใส่บ้านเลขที่"],
      firstnameRules: [
        v1 => !!v1 || "กรุณาใส่ชื่อจริง",
        v2 => v2.length >= 2 || "กรุณาตัวอักษรมากกว่า 2 ตัว"
      ],
      phonenumberRules: [
        v1 => !!v1 || "กรุณาใส่เบอร์มือถือ",
        v2 => v2.length >= 10 || "กรุณาใส่ตัวเลข 10 หลัก",
        v3 => !!/^[0]\d{9}$/.test(v3) || "กรุณาใส่เบอร์มือถือให้ถูกต้อง"
      ]
    };
  },
  methods: {
    back() {
       liff.closeWindow();
    },
    async next() {
      if (this.$refs.form.validate()) {
        this.$nuxt.$loading.start();
        try {
          const response = await this.$axios.$post("booking/visitor", {
            m_uuiduser: this.uuiduser,
            m_tbv_license_plate: this.license_plate,
            m_tbv_contact_person: this.visitor_name,
            m_tbv_mobile_contact_person: this.phonenumber,
            m_tbv_detail: this.remark,
            m_tbv_start_datetime: `${this.pickerdate} ${this.pickertime}`,
            m_company_id: process.env.company_id,
            m_promotion: process.env.promotion_code
          });

          switch (response.message) {
            case "success":
              this.$nuxt.$loading.finish();
              this.$router.push("/booking/reg_success");
              break;

            case "notfound_uuiduser":
              this.$nuxt.$loading.finish();
              this.dialog_status = true;
              this.txt_dialog_title = "แจ้งเตือน";
              this.txt_dialog_sub = "กรุณาติดต่อเจ้าหน้าที่";
              break;

            case "expire_date_fail":
              this.$nuxt.$loading.finish();
              this.dialog_status = true;
              this.txt_dialog_title = "แจ้งเตือนหมดอายุ";
              this.txt_dialog_sub = "กรุณาติดต่อเจ้าหน้าที่";
              break;

            case "promotion_fail":
              this.$nuxt.$loading.finish();
              this.dialog_status = true;
              this.txt_dialog_title = "แจ้งเตือนโปรโมชั่นไม่ถูกต้อง";
              this.txt_dialog_sub = "กรุณาติดต่อเจ้าหน้าที่";
              break;

            default:
              this.dialog_status = true;
              this.txt_dialog_sub = "ระบบผิดพลาด";
              this.txt_dialog_title = "ระบบผิดพลาด";
              this.$nuxt.$loading.finish();
              break;
          }
        } catch (e) {
          this.dialog_status = true;
          this.txt_dialog_sub = "ระบบผิดพลาด";
          this.txt_dialog_title = "ระบบผิดพลาด";
          this.$nuxt.$loading.finish();
        }
      }
    },
    closeDialog(obj) {
      this.dialog_status = obj.status_dialog;
    },
    setdatepick(datepick) {
      this.modaldate = false;
      this.$refs.dialogdate.save(datepick);
      this.pickerdate = datepick;
    },
    settimepick(timepick) {
      this.modaltime = false;
      this.$refs.dialogtime.save(timepick);
      this.pickertime = timepick;
    }
  },
  mounted() {
    liff
      .init({
        liffId: process.env.liffid_booking
      })
      .then(() => {
        if (liff.isLoggedIn()) {
          liff.getProfile().then(profile => {
            //this.profileImg = profile.pictureUrl;
            this.uuiduser = profile.userId;         
          });
        } else {
          liff.login();
        }
      });
  },

  components: {
    Dialog_popup
  }
};
</script>

<style lang="scss" scoped>
.v-form {
  padding: 0 10px;
}
</style>
