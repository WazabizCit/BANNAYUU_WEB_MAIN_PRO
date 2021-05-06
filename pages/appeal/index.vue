<template>
  <div>
    <v-container class="pt-0 pb-0">
      <v-row>
        <v-col cols="12">
          <div class="mt-7 text-primary text-title text-center">ระบบร้องเรียน</div>
        </v-col>

        <v-row class="ml-5 mr-5 mt-5" align="center" justify="space-around">
          <v-btn block color="success" @click="btn_add_appeal">
            <v-icon left>mdi-pencil</v-icon>เพิ่มเรื่อง
          </v-btn>
        </v-row>
      </v-row>

      <v-row align="center" justify="center">
        <div class="text-primary text-title mt-10 mb-2">ประวัติร้องเรียน</div>
        <v-col v-for="item in items_list" :key="item.hci_id" cols="12">
          <v-card class="mx-auto mt-2" max-width="364" raised>
            <v-list-item class="mb-3" three-line>
              <v-list-item-content>
                <v-list-item-subtitle class="mt-1">รูปภาพ</v-list-item-subtitle>
                <v-img
                  class="mt-1"
                  v-if="item.img_complaint != null"
                  height="250"
                  :src="getPhoto(item.img_complaint)"
                ></v-img>
                <v-img v-else height="250" :src="getPhotonull()"></v-img>
                <v-list-item-subtitle class="mt-2">Code</v-list-item-subtitle>
                <div class="text-blue">{{ item.hci_code }}</div>
                <v-list-item-subtitle class="mt-1">เวลาที่แจ้ง</v-list-item-subtitle>
                <div class="text-blue">{{ item.hci_datetime }}</div>
                <v-list-item-subtitle class="mt-1">หัวเรื่อง</v-list-item-subtitle>
                <div class="text-blue">{{ item.hci_header_text}}</div>
                <v-list-item-subtitle class="mt-1">รายละเอียด</v-list-item-subtitle>
                <div class="text-blue">{{ item.hci_detail_text}}</div>

                <v-list-item-content>
                  <v-list-item-title class="h4">ข้อความจากเจ้าหน้าที่</v-list-item-title>
                  <v-list-item-subtitle class="mt-1">สถานะรับเรื่อง</v-list-item-subtitle>
                  <div v-if="item.hci_status != 'N'" class="text-success">ได้รับการตรวจสอบแล้ว</div>
                  <div v-else class="text-orange">ยังไม่ได้รับการตรวจสอบ</div>
                  <v-list-item-subtitle class="mt-1">ข้อความ</v-list-item-subtitle>
                  <div v-if="item.hci_status != 'N'" class="text-success">{{item.hci_remark}}</div>
                  <div v-else class="text-success">-</div>
                </v-list-item-content>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="mt-5" cols="12"></v-col>
      </v-row>

      <v-dialog v-model="dialog_write_appeal" width="350px" persistent>
        <v-card>
          <v-card-title>รายละเอียด</v-card-title>
          <v-form ref="form" lazy-validation>
            <v-text-field label="หัวข้อ" v-model="hci_header_text" :rules="textRules"></v-text-field>
            <v-textarea
              name="input-5-1"
              v-model="hci_detail_text"
              label="เนื้อหา"
              :rules="textRules"
            ></v-textarea>
            <v-file-input
              v-model="image_appeal"
              type="file"
              accept="image/*"
              label="แนบไฟล์ภาพ"
              prepend-icon="mdi-paperclip"
            ></v-file-input>

            <v-card-actions class="mt-5">
              <v-spacer></v-spacer>
              <v-btn color="success" class="mr-4" @click="confirm_data">ยืนยัน</v-btn>
              <v-btn color="error" class="mr-4" @click="btn_write_appeal">ยกเลิก</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>

      <Dialog_popup
        :dialog_status="dialog_status"
        :txt_dialog_sub="txt_dialog_sub"
        :txt_dialog_title="txt_dialog_title"
        @closeDialog="closeDialog"
      />

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

      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>

      <div v-if="status_show">
        <v-row class="mt-10">
          <v-col class="text-center" cols="12">
            <v-icon class="v-icon-size">mdi-note-text-outline</v-icon>
          </v-col>
          <v-col class="text-center text-primary" cols="12">ไม่มีข้อมูล</v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Dialog_popup from "@/components/dialog_popup.vue";

export default {
  data() {
    return {
      status_show: false,
      overlay: false,
      dialog_status_success: false,
      dialog_status: false,
      txt_dialog_title: "",
      txt_dialog_sub: "",
      image_appeal: null,
      uuiduser: "",
      hci_header_text: "",
      hci_detail_text: "",
      dialog_write_appeal: false,
      items_list: [],
      textRules: [v1 => !!v1 || "กรุณาใส่ข้อความ"]
    };
  },
  methods: {
    getPhoto(item) {
      return `${this.$axios.defaults.baseURL}api/getimage/${item}`;
    },
    getPhotonull() {
      return `${this.$axios.defaults.baseURL}api/getimage/noimage.png`;
    },
    btn_write_appeal() {
      this.dialog_write_appeal = false;
      this.image_appeal = null;
      this.hci_header_text = "";
      this.hci_detail_text = "";
    },
    btn_add_appeal() {
      this.dialog_write_appeal = true;
    },
    async confirm_data() {
      if (this.$refs.form.validate()) {
        try {
          this.overlay = true;
          this.dialog_write_appeal = false;
          let formData = new FormData();
          formData.append("keyfile", this.image_appeal);
          formData.append("m_uuiduser", this.uuiduser);
          formData.append("m_hci_header_text", this.hci_header_text);
          formData.append("m_hci_detail_text", this.hci_detail_text);
          formData.append("m_company_id", process.env.company_id);

          let res_data = await this.$axios.$post(
            "actionappeal/upload_appeal",
            formData
          );
          this.overlay = false;
          this.image_appeal = null;
          this.hci_header_text = "";
          this.hci_detail_text = "";
          this.hci_remark = "";
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

    async requestData() {
      this.overlay = true;
      this.items_list = [];
      this.$axios
        .$post("actionappeal/get_listappeal", {
          m_uuiduser: this.uuiduser,
          m_company_id: process.env.company_id
        })
        .then(res => {
          this.overlay = false;

          if (res.data == null) return (this.status_show = true);
          if (res.data.length == 0) {
            this.status_show = true;
          } else {
            this.status_show = false;
            this.items_list = res.data;
          }
        })
        .catch(error => {
          this.overlay = false;
          this.status_show = false;
        })
        .finally();
    },
    closeDialog(obj) {
      this.dialog_status = obj.status_dialog;
    }
  },
  mounted() {
    liff
      .init({
        liffId: process.env.liffid_appeal
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


