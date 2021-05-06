<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <div class="mt-7 text-primary text-title text-center">ข้อมูลส่วนตัว</div>
        </v-col>
      </v-row>

      <v-card class="mx-auto mt-5" max-width="434" tile>
        <v-card-title primary-title class="justify-center">
          <div slot="activator" @click="openDialogUpload">
            <v-avatar
              size="180px"
              v-ripple
              v-if="img_user_profile == null"
              class="card_gray mb-3 mt-5"
            >
              <span>click to add avatar</span>
            </v-avatar>
            <v-avatar size="150px" v-ripple v-else class="mb-3">
              <img :src="getPhoto(img_user_profile)" alt="avatar" />
            </v-avatar>
          </div>
        </v-card-title>

        <v-list-item color="rgba(0, 0, 0, .4)">
          <v-list-item-content>
            <v-list-item-subtitle>QRcode</v-list-item-subtitle>
            <v-list-item-title class="title mt-1">
              <v-btn color="primary" @click="openDialogQr">QrCode ของฉัน</v-btn>
            </v-list-item-title>
            <v-list-item-subtitle class="mt-2">Name</v-list-item-subtitle>
            <v-list-item-title class="title">{{home_line_first_name}} {{home_line_last_name}}</v-list-item-title>
            <v-list-item-subtitle class="mt-2">Home Address</v-list-item-subtitle>
            <v-list-item-title class="title">{{home_address}}</v-list-item-title>
            <div class="mt-5"></div>
          </v-list-item-content>
        </v-list-item>
      </v-card>

      <v-dialog v-model="dialog_qrcode" width="350px" persistent>
        <v-card>
          <v-card-title>QrCode ของฉัน</v-card-title>
          <div align="center" justify="center">
            <qrcode-vue :value="home_line_code" :size="size" level="L"></qrcode-vue>
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" text @click="closeDialogQr">ปิด</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialog_upload_img" width="350px" persistent>
        <v-card>
          <v-card-title>แก้ไขรูปภาพ</v-card-title>
          <v-form ref="form" lazy-validation>
            <div align="center" justify="center">
              <v-file-input
                v-model="image_user"
                type="file"
                accept="image/*"
                label="แนบไฟล์ภาพ"
                prepend-icon="mdi-paperclip"
                :rules="uploadimgRules"
              ></v-file-input>
            </div>
          </v-form>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" text @click="upload_img_user">ยืนยัน</v-btn>
            <v-btn color="error" text @click="closeDialogUpload">ยกเลิก</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialog_status_success" persistent width="300">
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
            <v-btn class="text-center" color="primary" @click="dialog_status_success = false">ตกลง</v-btn>
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

      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </v-container>
  </div>
</template>
     

<script>
import QrcodeVue from "qrcode.vue";
import Dialog_popup from "@/components/dialog_popup.vue";
export default {
  data() {
    return {
      avatar: "",
      uuiduser: "",
      overlay: false,
      dialog_status_success: false,
      dialog_status: false,
      txt_dialog_title: "",
      txt_dialog_sub: "",
      dialog_upload_img: false,
      dialog_qrcode: false,
      size: 120,
      image_user: null,
      img_user_profile: null,
      home_line_code: "",
      home_line_first_name: "null",
      home_line_last_name: "",
      home_line_mobile_phone: "null",
      home_address: "null",
      uploadimgRules: [v1 => !!v1 || "กรุณาเลือกรูปภาพ"]
    };
  },
  methods: {
    getPhoto(item) {
      return `${this.$axios.defaults.baseURL}api/getimage/user/${item}`;
    },
    openDialogUpload() {
      this.dialog_upload_img = true;
    },
    closeDialogUpload() {
      this.dialog_upload_img = false;
    },
    openDialogQr() {
      this.dialog_qrcode = true;
    },
    closeDialogQr() {
      this.dialog_qrcode = false;
    },
    async requestData() {
      this.overlay = true;

      this.$axios
        .$post("actionprofile/get_profile", {
          m_uuiduser: this.uuiduser,
          m_company_id: process.env.company_id
        })
        .then(res => {
          this.overlay = false;
          this.img_user_profile = res.data.img_user;
          this.home_line_code = res.data.home_line_code;
          this.home_line_first_name = res.data.home_line_first_name;
          this.home_line_last_name = res.data.home_line_last_name;
          this.home_line_mobile_phone = res.data.home_line_mobile_phone;
          this.home_address = res.data.home_address;
        })
        .catch(error => {
          this.overlay = false;
        })
        .finally();
    },
    async upload_img_user() {
      if (this.$refs.form.validate()) {
        try {
          this.overlay = true;
          this.dialog_upload_img = false;
          let formData = new FormData();
          formData.append("keyfile", this.image_user);
          formData.append("m_uuiduser", this.uuiduser);
          formData.append("m_company_id", process.env.company_id);

          let res_data = await this.$axios.$post(
            "actionprofile/upload_image_user",
            formData
          );
          this.overlay = false;
          this.image_user = null;
          this.requestData();
          switch (res_data.message) {
            case "success":
              this.dialog_status_success = true;
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
        } catch (error) {
          this.dialog_status = true;
          this.txt_dialog_title = "แจ้งเตือน";
          this.txt_dialog_sub = "ระบบผิดพลาด";
        }
      }
    },
    closeDialog(obj) {
      this.dialog_status = obj.status_dialog;
    }
  },
  mounted() {

    liff
      .init({
        liffId: process.env.liffid_profile
      })
      .then(() => {
        if (liff.isLoggedIn()) {
          liff.getProfile().then(profile => {
            this.uuiduser = profile.userId;
            this.requestData();
            //this.profileImg = profile.pictureUrl;
          });
        } else {
          liff.login();
        }
      });
  },
  components: {
    QrcodeVue,
    Dialog_popup
  }
};
</script>

<style lang="scss" scoped>
.v-form {
  padding: 0 10px;
}
.v-icon-size {
  font-size: 80px;
  padding: 0 15px;
}
</style>
