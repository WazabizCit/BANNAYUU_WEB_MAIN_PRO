<template>
  <div>
    <v-container class="pt-0 pb-0">
      <v-row>
        <v-col cols="12">
          <div class="mt-7 text-primary text-title text-center">ตรวจสอบสิทธ์</div>
        </v-col>
        <v-col cols="12" class="pt-0 pb-0">
          <div class="text-center">
            <img src="~/assets/img/icons8-file-100.png" alt width="155" />
          </div>
        </v-col>
        <v-col cols="12">
          <v-form ref="form" v-model="valid">
            <p class="text-center text-sub-title mb-0 text-primary">กรุณากรอกรายละเอียด</p>
            <div class="mt-8">
              <v-text-field
                class="mt-5"
                v-model="form.tokenuser"
                name="tokenuser"
                label="TOKEN"
                dense
                :rules="tokenRules"
              ></v-text-field>

              <v-text-field
                class="mt-2"
                name="phonenumber"
                v-model="form.phonenumber"
                label="เบอร์มือถือ"
                type="text"
                inputmode="tel"
                pattern="[0-9]*"
                :maxlength="10"
                :counter="10"
                id="phonenumber"
                dense
                :rules="phonenumberRules"
                onkeypress="return event.charCode >= 48 && event.charCode <= 57"
              ></v-text-field>
            </div>

            <v-btn
              rounded
              color="primary"
              dark
              class="w-100 mt-4 my-btn"
              @click="check_data"
            >ตรวจสอบ</v-btn>

            <div class="mt-5 w-100 text-orange text-center my-btn" @click="close_liff">ยกเลิกรายการ</div>
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
      form: {
        phonenumber: "",
        tokenuser: "",    
        uuiduser: "",
        firstname: "",
        lastname: "",
        address: ""
      },
      tokenRules: [v1 => !!v1 || "กรุณาใส่ TOKEN"],
      phonenumberRules: [
        v1 => !!v1 || "กรุณาใส่เบอร์มือถือ",
        v2 => v2.length >= 10 || "กรุณาใส่ตัวเลข 10 หลัก",
        v3 => !!/^[0]\d{9}$/.test(v3) || "กรุณาใส่เบอร์มือถือให้ถูกต้อง"
      ]
    };
  },
  methods: {
    close_liff() {
      liff.closeWindow();
    },
    ...mapActions({
      setRegisterMember: "register_member/setRegisterMember"
    }),
    async check_data() {
      if (this.$refs.form.validate()) {
        this.$nuxt.$loading.start();
        try {
          const response = await this.$axios.$post(
            "actionregistermember/checktoken/member",
            {
              m_phonenumber: this.form.phonenumber,
              m_tokenuser: this.form.tokenuser,
              m_uuiduser: this.form.uuiduser
            }
          );

          switch (response.message) {
            case "success":
              this.setdata_user(response.data);
              this.$nuxt.$loading.finish();
              this.$router.push("/register/member/step_detail_user");

              break;

            case "duplicate_uuiduser":
              this.dialog_status = true;
              this.txt_dialog_title = "แจ้งเตือน";
              this.txt_dialog_sub = "ลูกค้าได้ทำการลงทะเบียนแล้ว";
              this.$nuxt.$loading.finish();
              break;

            case "not_found":
              this.dialog_status = true;
              this.txt_dialog_title = "แจ้งเตือน";
              this.txt_dialog_sub = "ไม่พบข้อมูลลูกค้า";
              this.$nuxt.$loading.finish();
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
    setdata_user(obj) {
      this.form.phonenumber = obj.home_line_mobile_phone;
      this.form.tokenuser = obj.home_line_code;
      this.form.firstname = obj.home_line_first_name;
      this.form.lastname = obj.home_line_last_name;
      this.form.address = obj.home_address;
      this.setRegisterMember(this.form);
    }
  },
  components: {
    Dialog_popup
  },
  mounted() {
      liff
        .init({
          liffId: process.env.liffid_member
        })
        .then(() => {
          if (liff.isLoggedIn()) {
            liff.getProfile().then(profile => {
              //this.profileImg = profile.pictureUrl;
              this.form.uuiduser = profile.userId;
            });
          } else {
            liff.login();
          }
        });
  }
};
</script>

<style lang="scss" scoped>
.v-form {
  padding: 0 10px;
}
</style>

