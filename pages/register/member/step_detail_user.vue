<template>
  <div>
    <v-container class="pt-0 pb-0">
      <v-row>
        <v-col cols="12">
          <div class="mt-7 text-primary text-title text-center">สมัครสมาชิก</div>
        </v-col>
        <v-col cols="12" class="pt-0 pb-0">
          <div class="text-center">
            <img src="~/assets/img/icons8-user-male-100.png" alt width="155" />
          </div>
        </v-col>
        <v-col cols="12">
          <v-form ref="form">
            <div class="mt-8">

              
              <v-text-field
                class="mt-2"
                v-model="uuiduser"
                name="uuiduser"
                label="UUID"
                dense
                disabled
              ></v-text-field>

              <v-text-field
                class="mt-2"
                v-model="tokenuser"
                name="tokenuser"
                label="TOKEN"
                dense
                readonly
              ></v-text-field>


              <v-text-field
                class="mt-2"
                v-model="address"
                name="firstname"
                label="บ้านเลขที่"
                id="address"
                :rules="addressRules"
                dense
                readonly
              ></v-text-field>


              <v-text-field
                class="mt-2"
                v-model="firstname"
                name="firstname"
                label="ชื่อจริง"
                id="firstname"
                :rules="firstnameRules"
                dense
                readonly
              ></v-text-field>

              <v-text-field
                class="mt-2"
                v-model="lastname"
                name="lastname"
                label="นามสกุล"
                id="lastname"
                dense
                readonly
              ></v-text-field>

              <v-text-field
                class="mt-2"
                name="phonenumber"
                v-model="phonenumber"
                label="เบอร์มือถือ"
                type="text"
                inputmode="tel"
                pattern="[0-9]*"
                :maxlength="10"
                :counter="10"
                id="phonenumber"
                dense
                onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                readonly
              ></v-text-field>
            </div>

            <v-btn rounded color="primary" dark class="w-100 mt-4 my-btn" @click="send_data">ยืนยัน</v-btn>

            <div class="mt-5 w-100 text-orange text-center my-btn" @click="back">ย้อนกลับ</div>
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
      dialog_status: false,
      txt_dialog_title: "",
      txt_dialog_sub: "",
      phonenumber: this.getRegisterMember().phonenumber,
      uuiduser: this.getRegisterMember().uuiduser,
      tokenuser: this.getRegisterMember().tokenuser,
      firstname: this.getRegisterMember().firstname,
      lastname: this.getRegisterMember().lastname,
      address: this.getRegisterMember().address,
      profileImg: "",
      addressRules: [v1 => !!v1 || "กรุณาใส่บ้านเลขที่"],
      firstnameRules: [
        v1 => !!v1 || "กรุณาใส่ชื่อจริง",
        v2 => v2.length >= 2 || "กรุณาตัวอักษรมากกว่า 2 ตัว"
      ],
      lastnameRules: [
        v1 => !!v1 || "กรุณาใส่นามสกุล",
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
    ...mapActions({
      setRegisterMember: "register_member/setRegisterMember"
    }),
    ...mapGetters({
      getRegisterMember: "register_member/getRegisterMember"
    }),

    next() {
      this.setRegisterMember(this.form);
      this.$router.push("/register/member/step_confirm_data");
    },
    back() {
      this.$router.push("/register/member/step_check_user");
    },
    async send_data() {
      try {
        this.$nuxt.$loading.start();
        const response = await this.$axios.$post(
          "actionregistermember/regisert/member",
          {
            m_phonenumber: this.phonenumber,
            m_uuiduser: this.uuiduser,
            m_tokenuser: this.tokenuser
          }
        );


        switch (response.message) {
          case "success":
            this.$nuxt.$loading.finish();
           this.$router.push("/register/member/step_reg_success");
            break;

          case "update_false":
            this.dialog_status = true;
            this.txt_dialog_title = "แจ้งเตือน";
            this.txt_dialog_sub = "อัพเดทข้อมูลไม่สำเร็จ";
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
        console.log(e);
      }
    },
    closeDialog(obj) {
      this.dialog_status = obj.status_dialog;
    }
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
